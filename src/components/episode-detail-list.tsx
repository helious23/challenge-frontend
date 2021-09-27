import { Logo } from "./logo";
import spinner from "../images/spinner.svg";
import { useQuery } from "@apollo/client";
import {
  getEpisodes,
  getEpisodesVariables,
} from "../__generated__/getEpisodes";
import gql from "graphql-tag";
import { EPISODE_FRAGMENT } from "../fragment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const GET_EPISODES = gql`
  query getEpisodes($GetEpisodesInput: PodcastSearchInput!) {
    getEpisodes(input: $GetEpisodesInput) {
      ok
      error
      episodes {
        ...EpisodeParts
      }
    }
  }
  ${EPISODE_FRAGMENT}
`;

interface EpisodeDetailListProps {
  podcastId: string;
  episodeId: string;
}

export const EpisodeDetailList: React.FC<EpisodeDetailListProps> = ({
  podcastId,
  episodeId,
}) => {
  const { data: episodesData, loading: episodesLoading } = useQuery<
    getEpisodes,
    getEpisodesVariables
  >(GET_EPISODES, {
    variables: {
      GetEpisodesInput: {
        id: +podcastId,
      },
    },
  });
  return (
    <div className="h-full">
      <div className="text-lg font-medium">이 채널의 다른 에피소드</div>
      {episodesLoading ? (
        <div className="mt-16 flex justify-center items-center">
          <Logo logoFile={spinner} option={"w-32"} />
        </div>
      ) : episodesData?.getEpisodes.episodes !== null &&
        episodesData?.getEpisodes.episodes.length !== undefined &&
        episodesData.getEpisodes.episodes.length >= 5 ? (
        episodesData?.getEpisodes.episodes
          .slice(-5)
          .map((episode) => (
            <Link
              key={episode.id}
              to={`/podcast/${podcastId}/episode/${episode.id}`}
            >
              <div className="flex justify-between items-center group">
                <div className="mt-3">
                  <div className="text-sm text-gray-700 opacity-60 font-light">
                    {episode.createdAt.split("T")[0].replace(/-()/g, ".")}
                  </div>
                  <div
                    className={`mt-1 mx-2 text-gray-700 font-normal  ${
                      episode.id === +episodeId ? "text-sky-500" : ""
                    }`}
                  >
                    {episode.title}
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={["fas", "headphones-alt"]}
                  className="text-3xl text-sky-400 opacity-70 ml-3 mt-5 group-hover:text-sky-600 transform group-hover:-translate-y-2 transition-transform "
                />
              </div>
              <div className="border-t border-gray-200 w-full mt-5"></div>
            </Link>
          ))
          .reverse()
      ) : (
        episodesData?.getEpisodes.episodes !== null &&
        episodesData?.getEpisodes.episodes
          .map((episode) => (
            <Link
              key={episode.id}
              to={`/podcast/${podcastId}/episode/${episode.id}`}
            >
              <div className="flex justify-between items-center group ">
                <div className="mt-3 ">
                  <div className="text-sm text-gray-700 opacity-60 font-light">
                    {episode.createdAt.split("T")[0].replace(/-()/g, ".")}
                  </div>
                  <div
                    className={`mt-1 mx-2 text-gray-700 font-normal  ${
                      episode.id === +episodeId ? "text-sky-500" : ""
                    }`}
                  >
                    {episode.title}
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={["fas", "headphones-alt"]}
                  className="text-3xl text-sky-400 opacity-70 ml-3 mt-5 group-hover:text-sky-600 transform group-hover:-translate-y-2 transition-transform "
                />
              </div>
              <div className="border-t border-gray-200 w-full mt-5"></div>
            </Link>
          ))
          .reverse()
      )}
      <div className="flex justify-center items-center my-10 lg:mb-32">
        <div className="text-sky-500 font-light hover:text-sky-700">
          <Link to={`/podcast/${podcastId}`}>
            <div className="flex items-center">
              <div className="mr-2">전체 에피소드 보기</div>
              <FontAwesomeIcon icon={["fas", "chevron-right"]} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};