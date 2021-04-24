import { useEffect, useRef, useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import styles from './styles.module.scss';
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

export function Player() {

  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    playPause,
    setIsPlayingState,
    playNext,
    playPrevious,
    playLooping,
    playShuffle,
    hasNext,
    hasPrevious } = usePlayer();

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying])

  function setProgressListener() {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  function handleSeek(duration:number) {
    audioRef.current.currentTime = duration;
    setProgress(duration);
  }

  function handleEnd() {
    playNext();
  }

  const episode = episodeList[currentEpisodeIndex];

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      { episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={250}
            height={250}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ""}>
        <div className={styles.progress}>
          <span>{convertDurationToTimeString(progress)}</span>
          <div className={styles.slider}>
            {
              episode ?
                (
                  <Slider
                    max={episode.duration}
                    value={progress}
                    onChange={handleSeek}
                    trackStyle={{ backgroundColor: '#04d361' }}
                    railStyle={{ backgroundColor: '#9f75ff' }}
                    handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                  />
                )
                :
                (
                  <div className={styles.emptySlider} />
                )
            }
          </div>
          <span> {episode ? episode.durationAsString : '0:00:00'}</span>
        </div>

        {
          episode && (
            <audio
              src={episode.url}
              ref={audioRef}
              autoPlay
              loop={isLooping}
              onPlay={() => setIsPlayingState(true)}
              onPause={() => setIsPlayingState(false)}
              onLoadedMetadata={() => setProgressListener()}
              onEnded={() => handleEnd()}
            />
          )
        }

        <div className={styles.buttons}>
          <button
            type="button"
            disabled={!episode || episodeList.length === 1}
            onClick={() => playShuffle()}
            className={isShuffling ? styles.active : ''}
          >
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button
            type="button"
            disabled={!episode || hasPrevious}
            onClick={() => playPrevious()}
          >
            <img src="/play-previous.svg" alt="Anterior" />
          </button>
          <button type="button" className={styles.playButton} disabled={!episode} onClick={() => playPause(episode, isPlaying)}>
            {
              isPlaying ?
                (
                  <img src="/pause.svg" alt="Tocar" />
                )
                :
                (
                  <img src="/play.svg" alt="Tocar" />
                )
            }
          </button>
          <button type="button" disabled={!episode || isShuffling ? false : hasNext} onClick={() => playNext()}>
            <img src="/play-next.svg" alt="Próximo" />
          </button>
          <button type="button"
            disabled={!episode}
            onClick={() => playLooping()}
            className={isLooping ? styles.active : ''}
          >
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}