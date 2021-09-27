import ReactPlayer from "react-player";
import { useReactiveVar, useMutation } from "@apollo/client";
import {
  episodeUrlVar,
  playVar,
  episodeIdVar,
  coverImgUrlVar,
} from "../apollo";
import gql from "graphql-tag";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { episodeTitleVar, playingVar } from "../apollo";
import { Logo } from "./logo";
import {
  markEpisodeAsPlayed,
  markEpisodeAsPlayedVariables,
} from "../__generated__/markEpisodeAsPlayed";
import btnSpinner from "../images/btn-spinner-blue.svg";

const MARKED_EPISODE = gql`
  mutation markEpisodeAsPlayed($input: MarkEpisodeAsPlayedInput!) {
    markEpisodeAsPlayed(input: $input) {
      ok
      error
    }
  }
`;

interface IProgressState {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

export const EpisodePlayer = () => {
  const episodeTitle = useReactiveVar(episodeTitleVar);
  const episodeUrl = useReactiveVar(episodeUrlVar);
  const coverImgUrl = useReactiveVar(coverImgUrlVar);
  const play = useReactiveVar(playVar);
  const episodeId = useReactiveVar(episodeIdVar);
  const playing = useReactiveVar(playingVar);

  const player = useRef<ReactPlayer>(null);

  const [volume, setVolume] = useState(0.7);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [progress, setProgress] = useState<IProgressState>();

  const [markEpisodeMutation] = useMutation<
    markEpisodeAsPlayed,
    markEpisodeAsPlayedVariables
  >(MARKED_EPISODE);

  const onMarked = () => {
    markEpisodeMutation({
      variables: {
        input: {
          id: episodeId,
        },
      },
    });
  };

  const handlePlaying = () => {
    playing ? playingVar(false) : playingVar(true);
    console.log(playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.currentTarget.value));
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.currentTarget.value));
  };

  const handleSeekMouseDown = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    setSeeking(true);
  };
  const handleSeekMouseUp = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    setSeeking(false);
    if (player.current) {
      player.current.seekTo(parseFloat(e.currentTarget.value));
    }
  };

  const onProgress = (progress: IProgressState) => {
    if (!seeking) {
      setProgress(progress);
      console.log(progress.loaded);
    }
  };

  const onClose = () => {
    playVar(false);
    playingVar(false);
    episodeIdVar(0);
  };

  return (
    <div
      className={`px-5 w-full h-24 flex-col justify-center items-center bg-white border-t border-gray-300 fixed bottom-0 shadow-inner ${
        play ? "" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex">
          <img
            src={coverImgUrl}
            alt={episodeTitle}
            className="w-20 h-20 rounded-lg"
          />
          <div className="hidden lg:text-base text-gray-700 font-light opacity-80 lg:mx-3 lg:w-full lg:flex lg:justify-start lg:items-center">
            {episodeTitle}
          </div>
        </div>
        <div
          className="text-3xl hidden lg:mx-3 lg:block"
          onClick={handlePlaying}
        >
          {playing ? (
            <FontAwesomeIcon icon={["far", "pause-circle"]} />
          ) : (
            <FontAwesomeIcon icon={["far", "play-circle"]} />
          )}
        </div>
        <div className="flex-col w-40 lg:w-96 h-full mx-5">
          <div className="lg:hidden flex h-16 justify-center items-center">
            <div className="text-sm text-gray-700 font-light opacity-80">
              {episodeTitle}
            </div>
          </div>
          <div className="opacity-0 fixed flex items-center h-3 lg:h-24">
            <input
              type="range"
              min={0}
              max={0.999999}
              step="any"
              value={played}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
              className=" w-40 lg:w-96 appearance-none cursor-pointer"
            />
          </div>
          <div className=" flex items-center h-3 lg:h-24">
            <input
              type="range"
              min={0}
              max={0.999999}
              step="any"
              value={progress?.played}
              className=" w-40 lg:w-96 cursor-pointer"
            />
          </div>
          <div>{progress?.playedSeconds}</div>
        </div>
        <div className="text-3xl lg:hidden block" onClick={handlePlaying}>
          {progress?.loaded && progress.loaded >= 0 && progress.loaded < 0.1 ? (
            <div>
              <Logo logoFile={btnSpinner} option={"w-5"} />
            </div>
          ) : playing ? (
            <FontAwesomeIcon icon={["far", "pause-circle"]} />
          ) : (
            <FontAwesomeIcon icon={["far", "play-circle"]} />
          )}
        </div>

        <div className="hidden lg:block">
          <FontAwesomeIcon
            icon={["fas", "volume-up"]}
            className="text-xl mr-3"
          />
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>

        <div
          onClick={onClose}
          className="fixed bottom-16 right-3 justify-center items-center text-gray-600 hover:text-sky-500 cursor-pointer"
        >
          <FontAwesomeIcon icon={["far", "times-circle"]} className="text-sm" />
        </div>
      </div>
      <ReactPlayer
        url={episodeUrl}
        width="100%"
        height="100%"
        playing={playing}
        controls={false}
        onEnded={onMarked}
        onProgress={onProgress}
        volume={volume}
        ref={player}
      />
    </div>
  );
};
