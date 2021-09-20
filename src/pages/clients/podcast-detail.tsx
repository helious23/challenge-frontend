import { PageTitle } from "../../components/page-title";
import {
  EPISODE_FRAGMENT,
  PODCAST_FRAGMENT,
  REVIEW_FRAGMENT,
} from "../../fragment";
import gql from "graphql-tag";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Logo } from "../../components/logo";
import spinner from "../../images/spinner.svg";
import { useState } from "react";
import { PodcastInfo } from "../../components/podcast-info";
import { useMe, ME_QUERY } from "../../hooks/useMe";
import {
  likeMutation,
  likeMutationVariables,
} from "../../__generated__/likeMutation";
import {
  podcastsDetailQuery,
  podcastsDetailQueryVariables,
} from "../../__generated__/podcastsDetailQuery";
import {
  subscribeMutation,
  subscribeMutationVariables,
} from "../../__generated__/subscribeMutation";
import { Review } from "../../components/review";
import { EpisodeList } from "../../components/episode-list";
import { SubButton } from "../../components/sub-button";
import { LikeButton } from "../../components/like-button";

interface IPodcastParams {
  id: string;
}

interface ISubscriptions {
  __typename: string;
  id: number;
  title: string;
}

interface ILikes {
  __typename: string;
  id: number;
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

const LIKE_MUTATION = gql`
  mutation likeMutation($input: ToggleLikeInput!) {
    toggleLike(input: $input) {
      ok
      error
    }
  }
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
  const [subLoading, setSubLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const { data: userData } = useMe();
  const client = useApolloClient();

  const onEpisodeView = () => {
    setEpisodeView(true);
    setReviewView(false);
  };
  const onReviewView = () => {
    setEpisodeView(false);
    setReviewView(true);
  };

  const { id } = useParams<IPodcastParams>();

  const onSubscription = userData?.me.subscriptions.some(
    (podcast) => podcast.id === +id
  );

  const onLike = userData?.me.likes.some((podcast) => podcast.id === +id);

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

  const onLikeCompleted = async (data: likeMutation) => {
    const {
      toggleLike: { ok },
    } = data;

    if (ok) {
      const meQueryResult = client.readQuery({
        query: ME_QUERY,
      });

      if (meQueryResult) {
        client.writeQuery({
          query: ME_QUERY,
          data: {
            me: {
              ...meQueryResult.me,
              likes: onLike
                ? meQueryResult.me.likes.filter(
                    (like: ILikes) => like.id !== +id
                  )
                : [
                    ...meQueryResult.me.likes,
                    {
                      __typename: "Podcast",
                      id: +id,
                    },
                  ],
            },
          },
        });
      }
      const queryResult = client.readQuery({
        query: PODCAST_QUERY,
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

      if (queryResult) {
        client.writeQuery({
          query: PODCAST_QUERY,
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
          data: {
            getPodcast: {
              ...queryResult.getPodcast,
            },
            countSubscriptions: {
              ...queryResult.countSubscriptions,
            },
            countLikes: {
              ...queryResult.countLikes,
              users: onLike
                ? queryResult.countLikes.users - 1
                : queryResult.countLikes.users + 1,
            },
          },
        });
      }
    }
    setLikeLoading(false);
  };

  const onSubCompleted = async (data: subscribeMutation) => {
    const {
      toggleSubscribe: { ok },
    } = data;

    if (ok) {
      const meQueryResult = client.readQuery({
        query: ME_QUERY,
      });

      if (meQueryResult) {
        client.writeQuery({
          query: ME_QUERY,
          data: {
            me: {
              ...meQueryResult.me,
              subscriptions: onSubscription
                ? meQueryResult.me.subscriptions.filter(
                    (sub: ISubscriptions) => sub.id !== +id
                  )
                : [
                    ...meQueryResult.me.subscriptions,
                    {
                      __typename: "Podcast",
                      id: +id,
                      title: podcastData?.getPodcast.podcast?.title,
                    },
                  ],
            },
          },
        });
      }
      const queryResult = client.readQuery({
        query: PODCAST_QUERY,
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

      if (queryResult) {
        client.writeQuery({
          query: PODCAST_QUERY,
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
          data: {
            getPodcast: {
              ...queryResult.getPodcast,
            },
            countSubscriptions: {
              ...queryResult.countSubscriptions,
              users: onSubscription
                ? queryResult.countSubscriptions.users - 1
                : queryResult.countSubscriptions.users + 1,
            },
            countLikes: {
              ...queryResult.countLikes,
            },
          },
        });
      }
    }
    setSubLoading(false);
  };

  const [subscribeMutation] = useMutation<
    subscribeMutation,
    subscribeMutationVariables
  >(SUBSCRIBE_MUTATION, {
    onCompleted: onSubCompleted,
  });

  const [likeMutation] = useMutation<likeMutation, likeMutationVariables>(
    LIKE_MUTATION,
    {
      onCompleted: onLikeCompleted,
    }
  );

  const onLikes = () => {
    setLikeLoading(true);
    likeMutation({
      variables: {
        input: {
          podcastId: +id,
        },
      },
    });
  };

  const onSubscribe = () => {
    setSubLoading(true);
    subscribeMutation({
      variables: {
        input: {
          podcastId: +id,
        },
      },
    });
  };

  return (
    <div className="mt-32 lg:mt-24 w-full">
      {loading ? (
        <div className="mt-64 flex justify-center items-center">
          <Logo logoFile={spinner} option={"w-32"} />
        </div>
      ) : (
        <>
          <PageTitle title={podcastData?.getPodcast.podcast?.title!} />
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
                    onSubscribe={onSubscribe}
                    onSubscription={onSubscription}
                    subLoading={subLoading}
                    userData={userData}
                  />
                  <LikeButton
                    likeLoading={likeLoading}
                    onLike={onLike}
                    onLikes={onLikes}
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
                      <EpisodeList podcastData={podcastData} />
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
