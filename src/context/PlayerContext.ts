import { createContext } from "react";

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
    isPlaying:boolean;
    playPause: (episode: Episode, pause:boolean) => void;
    setIsPlayingState: (stae: boolean) => void;
};

export const PLayerContext = createContext({} as PLayerContextData);