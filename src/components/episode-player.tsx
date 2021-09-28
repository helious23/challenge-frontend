import ReactPlayer from "react-player";
import { useReactiveVar, useMutation } from "@apollo/client";
import {
  episodeUrlVar,
  playVar,
  episodeIdVar,
  coverImgUrlVar,
} from "../apollo";
import gql from "graphql-tag";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { episodeTitleVar, playingVar } from "../apollo";
import { Logo } from "./logo";
import {
  markEpisodeAsPlayed,
  markEpisodeAsPlayedVariables,
} from "../__generated__/markEpisodeAsPlayed";
import btnSpinner from "../images/btn-spinner-blue.svg";
import { Duration } from "./duration";

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
  const [seeking, setSeeking] = useState(false);
  const [progress, setProgress] = useState<IProgressState>();
  const [playingTime, setPlayingTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.currentTarget.value));
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayingTime(parseFloat(e.currentTarget.value));
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
    }
  };

  const onClose = () => {
    playVar(false);
    playingVar(false);
    episodeIdVar(0);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  useEffect(() => {
    const onPlayingTime = () => {
      if (progress) {
        setPlayingTime(progress?.played);
      }
    };
    onPlayingTime();
  }, [progress]);

  return (
    <div
      className={`px-5 w-full h-24 flex-col justify-between items-center bg-white border-t border-gray-300 fixed bottom-0 shadow-inner ${
        play ? "" : "hidden"
      }`}
    >
      <div className="flex items-center justify-between lg:justify-center h-full w-full">
        <div className="flex items-center lg:w-4/12 w-24">
          <img
            src={coverImgUrl}
            alt={episodeTitle}
            className="w-16 h-16 rounded-lg"
          />
          <div className="hidden lg:line-clamp-2 text-base text-gray-700 font-light opacity-80 h-12 max-w-max mx-auto text-center">
            {episodeTitle}
          </div>
        </div>
        <div
          className="text-3xl hidden lg:mx-3 lg:block"
          onClick={handlePlaying}
        >
          {playing ? (
            <FontAwesomeIcon
              icon={["far", "pause-circle"]}
              className="text-5xl text-sky-500 hover:opacity-70 transition-opacity cursor-pointer"
            />
          ) : (
            <FontAwesomeIcon
              icon={["far", "play-circle"]}
              className="text-5xl text-sky-500 hover:opacity-70 transition-opacity cursor-pointer"
            />
          )}
        </div>
        <div className="flex-col lg:w-96 h-full w-full px-5">
          <div className="lg:hidden flex h-16 w-full justify-center items-center">
            <div className="text-sm text-gray-700 font-light opacity-80 line-clamp-2 w-full text-center">
              {episodeTitle}
            </div>
          </div>
          <div className="lg:flex lg:flex-col lg:justify-center lg:items-center lg:h-full">
            <div className=" flex items-center h-3 lg:h-5 w-full">
              <input
                type="range"
                min={0}
                max={0.999999}
                step="any"
                value={playingTime}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
                className="w-full lg:w-96 cursor-pointer"
              />
            </div>

            <div className="hidden lg:block w-full">
              <div className="flex items-center justify-between">
                <div>
                  <Duration
                    seconds={duration * playingTime}
                    options={"ml-3 text-sm text-sky-600 font-light"}
                  />
                </div>
                <div>
                  <Duration
                    seconds={duration}
                    options={"mr-3 text-sm font-light text-gray-700 opacity-70"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-3xl lg:hidden block" onClick={handlePlaying}>
          {progress?.loaded && progress.loaded >= 0 && progress.loaded < 0.1 ? (
            <div>
              <Logo logoFile={btnSpinner} option={"w-5"} />
            </div>
          ) : playing ? (
            <FontAwesomeIcon
              icon={["far", "pause-circle"]}
              className="text-4xl text-sky-500 hover:opacity-70 transition-opacity cursor-pointer"
            />
          ) : (
            <FontAwesomeIcon
              icon={["far", "play-circle"]}
              className="text-4xl text-sky-500 hover:opacity-70 transition-opacity cursor-pointer"
            />
          )}
        </div>

        <div className="hidden lg:block">
          <FontAwesomeIcon
            icon={["fas", "volume-up"]}
            className="text-xl mr-3 text-gray-600"
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
          className="flex justify-start items-start text-gray-500 hover:text-sky-500 cursor-pointer mb-16"
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
        onDuration={handleDuration}
      />
    </div>
  );
};
