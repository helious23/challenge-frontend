import { PageTitle } from "../../components/page-title";
import {
  EPISODE_FRAGMENT,
  PODCAST_FRAGMENT,
  REVIEW_FRAGMENT,
} from "../../fragment";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Logo } from "../../components/logo";

import spinner from "../../images/spinner.svg";
import { useState } from "react";
import { PodcastInfo } from "../../components/podcast-info";
import {
  podcastsDetailQuery,
  podcastsDetailQueryVariables,
} from "../../__generated__/podcastsDetailQuery";
import {
  subscribeMutation,
  subscribeMutationVariables,
} from "../../__generated__/subscribeMutation";

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

const SUBSCRIBE_MUTATION = gql`
  mutation subscribeMutation($input: ToggleSubscribeInput!) {
    toggleSubscribe(input: $input) {
      ok
      error
    }
  }
`;

export const PodcastDetail = () => {
  const [episodeView, setEpisodeView] = useState(true);
  const [reviewView, setReviewView] = useState(false);
  const [subscirbe, setSubscribe] = useState(false);

  const onEpisodeView = () => {
    setEpisodeView(true);
    setReviewView(false);
  };
  const onReviewView = () => {
    setEpisodeView(false);
    setReviewView(true);
  };

  const { id } = useParams<IPodcastParams>();

  const onCompleted = () => {
    setSubscribe((current) => !current);
  };

  const [subscribeMutation] = useMutation<
    subscribeMutation,
    subscribeMutationVariables
  >(SUBSCRIBE_MUTATION, {
    onCompleted,
  });

  const onSubscribe = () => {
    subscribeMutation({
      variables: {
        input: {
          podcastId: +id,
        },
      },
    });
  };

  const { data, loading } = useQuery<
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
      {loading ? (
        <div className="mt-64 flex justify-center items-center">
          <Logo logoFile={spinner} option={"w-32"} />
        </div>
      ) : (
        <>
          <PageTitle title={data?.getPodcast.podcast?.title!} />
          <div className="md:max-w-5xl mx-auto">
            <div className="flex flex-col items-start justify-center lg:flex-row lg:items-start lg:justify-start lg:w-full">
              <div className="flex items-center justify-center w-full lg:w-2/5">
                <img
                  src={data?.getPodcast.podcast?.coverImg}
                  alt={data?.getPodcast.podcast?.title}
                  className="w-40 h-40 lg:w-52 lg:h-52 m-3 rounded-md bg-cover bg-center shadow-xl"
                />
              </div>
              <div className="mt-5 px-4 w-full mx-auto">
                <PodcastInfo
                  categoryName={data?.getPodcast.podcast?.category?.name}
                  podcastTitle={data?.getPodcast.podcast?.title}
                  creator={data?.getPodcast.podcast?.creator.email}
                  subscriber={data?.countSubscriptions.users}
                  likes={data?.countLikes.users}
                  description={data?.getPodcast.podcast?.description}
                />
                <div className="mt-5 flex justify-start items-center">
                  <div
                    onClick={onSubscribe}
                    className={`rounded-3xl flex items-center justify-between py-1 cursor-pointer mr-3 ${
                      subscirbe
                        ? "bg-white text-sky-500 border border-sky-400"
                        : "bg-sky-500 text-white"
                    }`}
                  >
                    <div className="text-2xl mb-1 ml-4 lg:mx-4 font-extralight">
                      +
                    </div>
                    <div className="w-10 text-md font-medium ml-4 lg:ml-10 mr-8 lg:mr-14">
                      {subscirbe ? "구독취소" : "구독"}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">
                    <FontAwesomeIcon
                      icon={["far", "heart"]}
                      className="text-red-400"
                    />
                  </div>
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
                      <div>
                        {data?.getPodcast.podcast?.episodes.map((episode) => (
                          <Link
                            key={episode.id}
                            to={`/podcast/${data.getPodcast.podcast?.id}/episode/${episode.id}`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="text-sm text-gray-700 opacity-60 font-light">
                                  {episode.createdAt
                                    .split("T")[0]
                                    .replace(/-(.)/g, ".")}
                                </div>
                                <div className="mt-1">{episode.title}</div>
                              </div>
                              <FontAwesomeIcon
                                icon={["fas", "headphones-alt"]}
                                className="text-3xl text-sky-500 opacity-70"
                              />
                            </div>
                            <div className="border-t border-gray-200 w-full mt-5"></div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className={reviewView ? "mt-5" : "hidden"}>
                      <div>
                        {data?.getPodcast.podcast?.reviews.map(
                          (review, index) => (
                            <div key={index}>
                              <div>{review.reviewer?.email}</div>
                              <div>{review.title}</div>
                              <div className="flex justify-end">
                                <div>{review.createdAt.split("T")[0]}</div>
                                <div className="ml-2">
                                  {review.createdAt.split("T")[1].split(":")[0]}{" "}
                                  시
                                </div>
                                <div className="ml-2">
                                  {review.createdAt.split("T")[1].split(":")[1]}{" "}
                                  분
                                </div>
                              </div>
                              <div>{review.text}</div>
                            </div>
                          )
                        )}
                      </div>
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
