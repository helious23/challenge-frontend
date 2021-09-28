import { PageTitle } from "../../components/page-title";
import {
  EPISODE_FRAGMENT,
  PODCAST_FRAGMENT,
  REVIEW_FRAGMENT,
} from "../../fragment";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Logo } from "../../components/logo";
import spinner from "../../images/spinner.svg";
import { useState } from "react";
import { PodcastInfo } from "../../components/podcast-info";

import { Review } from "../../components/review";
import { EpisodeList } from "../../components/episode-list";
import { SubButton } from "../../components/sub-button";
import { LikeButton } from "../../components/like-button";
import {
  podcastsDetailQuery,
  podcastsDetailQueryVariables,
} from "../../__generated__/podcastsDetailQuery";

interface IPodcastParams {
  id: string;
}

export const PODCAST_QUERY = gql`
  query podcastsDetailQuery(
    $PodcastSearchInput: PodcastSearchInput!
    $CountSubscriptionsInput: CountSubscriptionsInput!
    $CountLikesInput: CountLikesInput!
  ) {
    getPodcast(input: $PodcastSearchInput) {
      ok
      error
      podcast {
        creator {
          email
        }
        ...PodcastParts
        episodes {
          ...EpisodeParts
        }
        reviews {
          ...ReviewParts
        }
      }
    }
    countSubscriptions(input: $CountSubscriptionsInput) {
      users
    }
    countLikes(input: $CountLikesInput) {
      users
    }
  }
  ${PODCAST_FRAGMENT}
  ${EPISODE_FRAGMENT}
  ${REVIEW_FRAGMENT}
`;

export const PodcastDetail = () => {
  const [episodeView, setEpisodeView] = useState(true);
  const [reviewView, setReviewView] = useState(false);

  const onEpisodeView = () => {
    setEpisodeView(true);
    setReviewView(false);
  };
  const onReviewView = () => {
    setEpisodeView(false);
    setReviewView(true);
  };

  const { id } = useParams<IPodcastParams>();

  const { data: podcastData, loading } = useQuery<
    podcastsDetailQuery,
    podcastsDetailQueryVariables
  >(PODCAST_QUERY, {
    variables: {
      PodcastSearchInput: {
        id: +id,
      },
      CountSubscriptionsInput: {
        id: +id,
      },
      CountLikesInput: {
        id: +id,
      },
    },
  });

  return (
    <div className="mt-32 lg:mt-24 w-full">
      <PageTitle title={"팟캐스트 정보"} />
      {loading ? (
        <div className="mt-64 flex justify-center items-center">
          <Logo logoFile={spinner} option={"w-32"} />
        </div>
      ) : (
        <>
          <PageTitle title={podcastData?.getPodcast.podcast?.title} />
          <div className="md:max-w-5xl mx-auto">
            <div className="flex flex-col items-start justify-center lg:flex-row lg:items-start lg:justify-start lg:w-full">
              <div className="flex items-center justify-center w-full lg:w-2/5">
                <img
                  src={podcastData?.getPodcast.podcast?.coverImg}
                  alt={podcastData?.getPodcast.podcast?.title}
                  className="w-40 h-40 lg:w-52 lg:h-52 m-3 rounded-md bg-cover bg-center shadow-xl"
                />
              </div>
              <div className="mt-5 px-4 w-full mx-auto">
                <PodcastInfo
                  categoryName={podcastData?.getPodcast.podcast?.category?.name}
                  podcastTitle={podcastData?.getPodcast.podcast?.title}
                  creator={podcastData?.getPodcast.podcast?.creator.email}
                  subscriber={podcastData?.countSubscriptions.users}
                  likes={podcastData?.countLikes.users}
                  description={podcastData?.getPodcast.podcast?.description}
                />
                <div className="mt-5 flex justify-start items-center">
                  <SubButton
                    id={id}
                    title={podcastData?.getPodcast.podcast?.title}
                    coverImg={podcastData?.getPodcast.podcast?.coverImg}
                    categoryName={
                      podcastData?.getPodcast.podcast?.category?.name
                    }
                    categorySlug={
                      podcastData?.getPodcast.podcast?.category?.slug
                    }
                    description={podcastData?.getPodcast.podcast?.description}
                    options={"w-32 lg:w-44"}
                  />
                  <LikeButton
                    id={id}
                    title={podcastData?.getPodcast.podcast?.title}
                    coverImg={podcastData?.getPodcast.podcast?.coverImg}
                    categoryName={
                      podcastData?.getPodcast.podcast?.category?.name
                    }
                    categorySlug={
                      podcastData?.getPodcast.podcast?.category?.slug
                    }
                    description={podcastData?.getPodcast.podcast?.description}
                  />
                </div>
                <div className="mt-5 w-full mb-32">
                  <div>
                    <div className="flex cursor-pointer">
                      <div
                        onClick={onEpisodeView}
                        className={`mr-5 p-2 transition-colors ${
                          episodeView
                            ? "border-b-4  border-sky-500"
                            : "text-gray-300"
                        }`}
                      >
                        에피소드
                      </div>
                      <div
                        onClick={onReviewView}
                        className={`p-2 transition-colors ${
                          reviewView
                            ? "border-b-4  border-sky-500"
                            : "text-gray-300"
                        }`}
                      >
                        댓글
                      </div>
                    </div>
                    <div className={episodeView ? "mt-5" : "hidden"}>
                      <EpisodeList
                        episodes={podcastData?.getPodcast.podcast?.episodes}
                        id={podcastData?.getPodcast.podcast?.id}
                      />
                    </div>
                    <div className={reviewView ? "mt-5" : "hidden"}>
                      <Review podcastData={podcastData} id={id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
