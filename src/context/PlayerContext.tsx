import { createContext, ReactNode, useContext } from "react";
import { useState } from "react";

type Episode = {
    id: string,
    title: string,
    thumbnail: string,
    members: string,
    duration: number,
    durationAsString: string,
    url: string,
}

type PLayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    playPause: (episode: Episode, pause: boolean) => void;
    playList: (list: Episode[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    playLooping: () => void;
    playShuffle: () => void;
    setIsPlayingState: (stae: boolean) => void;
    hasNext: boolean;
    hasPrevious: boolean;
};

type PlayerContextProvaiderProps = {
    children: ReactNode;
}

export const PLayerContext = createContext({} as PLayerContextData);

export function PLayerContextProvaider({ children }: PlayerContextProvaiderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setShuffling] = useState(false);

    function playPause(episode: Episode, pause: boolean) {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setIsPlaying(!pause)
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function setIsPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    const hasPrevious = (currentEpisodeIndex - 1) < 0;
    const hasNext = (currentEpisodeIndex + 1) >= episodeList.length;

    function playNext() {

        if (isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);

            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        } else if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);   
        }
    }

    function playPrevious() {
        if (hasPrevious) {
            return
        }

        setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }

    function playLooping() {
        setIsLooping(!isLooping);
    }

    function playShuffle() {
        setShuffling(!isShuffling);
    }

    return (
        <PLayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                isPlaying,
                isLooping,
                isShuffling,
                playPause,
                playList,
                playNext,
                playPrevious,
                setIsPlayingState,
                hasNext,
                hasPrevious,
                playLooping,
                playShuffle
            }}>
            {children}
        </PLayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PLayerContext);
}