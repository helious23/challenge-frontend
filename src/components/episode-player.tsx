import ReactPlayer from "react-player";
import { useReactiveVar, useMutation } from "@apollo/client";
import { episodeUrlVar, playVar, episodeIdVar } from "../apollo";
import gql from "graphql-tag";
import {
  markEpisodeAsPlayed,
  markEpisodeAsPlayedVariables,
} from "../__generated__/markEpisodeAsPlayed";

const MARKED_EPISODE = gql`
  mutation markEpisodeAsPlayed($input: MarkEpisodeAsPlayedInput!) {
    markEpisodeAsPlayed(input: $input) {
      ok
      error
    }
  }
`;

export const EpisodePlayer = () => {
  const episodeUrl = useReactiveVar(episodeUrlVar);
  const play = useReactiveVar(playVar);
  const episodeId = useReactiveVar(episodeIdVar);

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

  const onProgress = (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    console.log(state);
  };

  return (
    <div
      className={`w-full h-20 bg-red-400 fixed bottom-0 ${
        play ? "" : "hidden"
      }`}
    >
      <ReactPlayer
        url={episodeUrl}
        width="100%"
        height="100%"
        playing={false}
        controls={true}
        onEnded={onMarked}
        onProgress={onProgress}
      />
    </div>
  );
};
