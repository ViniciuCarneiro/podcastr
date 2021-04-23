import { Header } from "../components/Header";
import "../styles/global.scss";
import styles from '../styles/app.module.scss';
import { Player } from "../components/Player";
import { PLayerContext } from "../context/PlayerContext";
import { useState } from "react";

function MyApp({ Component, pageProps }) {

  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function playPause(episode, pause:boolean) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(!pause)
  }

  function setIsPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    <PLayerContext.Provider value={{ episodeList, currentEpisodeIndex, isPlaying, playPause, setIsPlayingState }}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PLayerContext.Provider>
  );
}

export default MyApp
