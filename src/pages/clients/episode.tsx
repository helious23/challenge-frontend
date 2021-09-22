import gql from "graphql-tag";
import { EPISODE_FRAGMENT, PODCAST_FRAGMENT } from "../../fragment";
import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { Logo } from "../../components/logo";
import spinner from "../../images/spinner.svg";
import { PageTitle } from "../../components/page-title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LikeButton } from "../../components/like-button";
import { SubButton } from "../../components/sub-button";
import {
  getEpisode,
  getEpisodeVariables,
} from "../../__generated__/getEpisode";
import {
  getEpisodes,
  getEpisodesVariables,
} from "../../__generated__/getEpisodes";

const GET_EPISODE = gql`
  query getEpisode(
    $GetEpisodeInput: GetEpisodeInput!
    $PodcastSearchInput: PodcastSearchInput!
  ) {
    getEpisode(input: $GetEpisodeInput) {
      ok
      error
      episode {
        ...EpisodeParts
      }
    }
    getPodcast(input: $PodcastSearchInput) {
      ok
      error
      podcast {
        ...PodcastParts
      }
    }
  }
  ${EPISODE_FRAGMENT}
  ${PODCAST_FRAGMENT}
`;

const GET_EPISODES = gql`
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

interface IEpisodeParams {
  id: string;
  episodeId: string;
}

export const Episode = () => {
  const { id: podcastId, episodeId } = useParams<IEpisodeParams>();

  const { data: episodeData, loading: episodeLoading } = useQuery<
    getEpisode,
    getEpisodeVariables
  >(GET_EPISODE, {
    variables: {
      GetEpisodeInput: {
        podcastId: +podcastId,
        episodeId: +episodeId,
      },
      PodcastSearchInput: {
        id: +podcastId,
      },
    },
  });

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
    <div className="mt-32 lg:mt-24 w-full lg:h-screen">
      {episodeLoading ? (
        <div className="mt-64 flex justify-center items-center">
          <Logo logoFile={spinner} option={"w-32"} />
        </div>
      ) : (
        <div className="h-full">
          <PageTitle title={episodeData?.getEpisode.episode?.title} />
          <div className="lg:flex lg:max-w-5xl lg:mx-auto mx-5 mb-32 h-full">
            <div className="lg:w-8/12 lg:h-96 lg:mx-5 rounded-xl">
              <div
                style={{
                  backgroundImage: `url(${episodeData?.getPodcast.podcast?.coverImg})`,
                }}
                className="flex items-center justify-center bg-cover bg-center h-full rounded-xl"
              >
                <div className="w-full h-full flex justify-center items-center backdrop-filter backdrop-blur-lg backdrop-brightness-75 rounded-xl">
                  <img
                    src={episodeData?.getPodcast.podcast?.coverImg}
                    alt={episodeData?.getEpisode.episode?.title}
                    className=" w-60 h-60 lg:w-72 lg:h-72 m-3 rounded-md bg-cover bg-center shadow-xl"
                  />
                </div>
              </div>
              <div className="mt-5 text-2xl font-light">
                {episodeData?.getEpisode.episode?.title}
              </div>
              <Link to={`/podcast/${episodeData?.getPodcast.podcast?.id}`}>
                <div className="mt-3 text-sm font-light text-sky-500 hover:text-sky-700">
                  {episodeData?.getPodcast.podcast?.title} &gt;
                </div>
              </Link>
              <div className="mt-3 text-sm text-gray-700">
                {episodeData?.getEpisode.episode?.createdAt
                  .split("T")[0]
                  .slice(2)
                  .replace(/-()/g, ".")}
              </div>
              <div className="mt-3 text-gray-900 text-base opacity-70">
                {episodeData?.getEpisode.episode?.description ||
                  episodeData?.getEpisode.episode?.title}
              </div>
              <div className="flex item-center mt-5">
                <div className="w-10/12 lg:w-5/12 py-2 bg-sky-500 text-white font-medium text-base rounded-3xl flex">
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={["fas", "play"]}
                      className="ml-5 text-xl animate-pulse absolute"
                    />
                  </div>
                  <div className="flex w-full items-center justify-center">
                    <div>에피소드 듣기</div>
                  </div>
                </div>
                <div className="w-2/12 flex justify-center">
                  <LikeButton
                    id={podcastId}
                    title={episodeData?.getPodcast.podcast?.title}
                    coverImg={episodeData?.getPodcast.podcast?.coverImg}
                    categoryName={
                      episodeData?.getPodcast.podcast?.category?.name
                    }
                    categorySlug={
                      episodeData?.getPodcast.podcast?.category?.slug
                    }
                    description={episodeData?.getPodcast.podcast?.description}
                  />
                </div>
              </div>
              <div className="bg-gray-100 mt-5 flex items-center justify-between ">
                <Link
                  to={`/podcast/${episodeData?.getPodcast.podcast?.id}`}
                  className="w-full"
                >
                  <div className="bg-gray-100 flex items-center justify-between ">
                    <img
                      src={episodeData?.getPodcast.podcast?.coverImg}
                      alt={episodeData?.getEpisode.episode?.title}
                      className="w-16 h-16 m-3 rounded-md bg-cover bg-center shadow-xl"
                    />
                    <div className="truncate w-full">
                      <div className="text-sm font-light md:text-lg truncate">
                        {episodeData?.getPodcast.podcast?.title}
                      </div>
                      <div className="text-sm font-medium text-sky-600 ">
                        채널로 가기 &gt;{" "}
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="relative">
                  <SubButton
                    id={podcastId}
                    title={episodeData?.getPodcast.podcast?.title}
                    coverImg={episodeData?.getPodcast.podcast?.coverImg}
                    categoryName={
                      episodeData?.getPodcast.podcast?.category?.name
                    }
                    categorySlug={
                      episodeData?.getPodcast.podcast?.category?.slug
                    }
                    description={episodeData?.getPodcast.podcast?.description}
                    options={"w-24 lg:w-32"}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 lg:mt-0 h-full lg:w-4/12 lg:mx-5">
              <div className="h-full">
                <div className="text-lg font-medium">
                  이 채널의 다른 에피소드
                </div>
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
                        <div className="flex justify-between items-center group ">
                          <div className="mt-3 ">
                            <div className="text-sm text-gray-700 opacity-60 font-light">
                              {episode.createdAt
                                .split("T")[0]
                                .replace(/-()/g, ".")}
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
                              {episode.createdAt
                                .split("T")[0]
                                .replace(/-()/g, ".")}
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
                    <Link
                      to={`/podcast/${episodeData?.getPodcast.podcast?.id}`}
                    >
                      <div className="flex items-center">
                        <div className="mr-2">전체 에피소드 보기</div>
                        <FontAwesomeIcon icon={["fas", "chevron-right"]} />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
