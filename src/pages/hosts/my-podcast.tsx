import { useParams, Link, useHistory } from "react-router-dom";
import { gql, useQuery, useMutation, useApolloClient } from "@apollo/client";
import { PageTitle } from "../../components/page-title";
import {
  EPISODE_FRAGMENT,
  PODCAST_FRAGMENT,
  REVIEW_FRAGMENT,
} from "../../fragment";
import { Logo } from "../../components/logo";
import spinner from "../../images/spinner.svg";
import { PodcastInfo } from "../../components/podcast-info";
import { EpisodeList } from "../../components/episode-list";

import {
  deletePodcast,
  deletePodcastVariables,
} from "../../__generated__/deletePodcast";
import { useState } from "react";
import { MY_PODCASTS_QUERY } from "./my-podcasts";
import { myPodcasts_myPodcasts_podcasts } from "../../__generated__/myPodcasts";
import { DeletePodcastBtn } from "../../components/delete-podcast-btn";
import { myPodcast, myPodcastVariables } from "../../__generated__/myPodcast";
import routes from "../../routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MY_PODCAST_QUERY = gql`
  query myPodcast(
    $input: MyPodcastInput!
    $countSubscriptionsInput: CountSubscriptionsInput!
    $countLikesInput: CountLikesInput!
  ) {
    myPodcast(input: $input) {
      ok
      error
      podcast {
        ...PodcastParts
        isPromoted
        episodes {
          ...EpisodeParts
        }
        reviews {
          ...ReviewParts
        }
        subscriber {
          email
        }
      }
    }
    countSubscriptions(input: $countSubscriptionsInput) {
      users
    }
    countLikes(input: $countLikesInput) {
      users
    }
  }
  ${PODCAST_FRAGMENT}
  ${EPISODE_FRAGMENT}
  ${REVIEW_FRAGMENT}
`;

const DELETE_PODCAST_MUTATION = gql`
  mutation deletePodcast($deletePodcastInput: PodcastSearchInput!) {
    deletePodcast(input: $deletePodcastInput) {
      ok
      error
    }
  }
`;

interface IParams {
  id: string;
}

export const MyPodcast = () => {
  const { id } = useParams<IParams>();
  const [open, setOpen] = useState(false);
  const [podcastDelete, setpodcastDelete] = useState(true);
  const history = useHistory();
  const client = useApolloClient();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [episodeView, setEpisodeView] = useState(true);
  const [reviewView, setReviewView] = useState(false);
  const [subscriberView, setSubscriberView] = useState(false);

  const onEpisodeView = () => {
    setEpisodeView(true);
    setReviewView(false);
    setSubscriberView(false);
  };
  const onReviewView = () => {
    setReviewView(true);
    setEpisodeView(false);
    setSubscriberView(false);
  };

  const onSubscriberView = () => {
    setSubscriberView(true);
    setReviewView(false);
    setEpisodeView(false);
  };

  const { data: podcastData, loading } = useQuery<
    myPodcast,
    myPodcastVariables
  >(MY_PODCAST_QUERY, {
    variables: {
      input: {
        id: +id,
      },
      countLikesInput: {
        id: +id,
      },
      countSubscriptionsInput: {
        id: +id,
      },
    },
  });

  const onCompleted = (data: deletePodcast) => {
    const {
      deletePodcast: { ok },
    } = data;
    if (ok) {
      const queryResult = client.readQuery({
        query: MY_PODCASTS_QUERY,
        variables: { input: { page: 1 } },
      });

      if (queryResult) {
        client.writeQuery({
          query: MY_PODCASTS_QUERY,
          variables: { input: { page: 1 } },
          data: {
            myPodcasts: {
              ...queryResult.myPodcasts,
              totalResults: queryResult.myPodcasts?.totalResults - 1,
              totalPages: Math.ceil(
                (queryResult.myPodcasts?.totalResults - 1) / 9
              ),
              podcasts: queryResult.myPodcasts.podcasts.filter(
                (podcast: myPodcasts_myPodcasts_podcasts) => podcast.id !== +id
              ),
            },
          },
        });
      }
      history.push(routes.home);
    }
  };

  const [deletePodcastMutation] = useMutation<
    deletePodcast,
    deletePodcastVariables
  >(DELETE_PODCAST_MUTATION, {
    onCompleted,
  });

  const onDelete = () => {
    setpodcastDelete(true);

    setOpen(false);
    if (podcastDelete) {
      deletePodcastMutation({
        variables: {
          deletePodcastInput: {
            id: +id,
          },
        },
      });
    }
  };

  return (
    <div className="mt-32 lg:mt-24">
      <PageTitle
        title={podcastData?.myPodcast.podcast?.title || "나의 팟캐스트"}
      />
      {loading ? (
        <div className="mt-64 flex justify-center items-center">
          <Logo logoFile={spinner} option={"w-32"} />
        </div>
      ) : (
        <>
          <div className="md:max-w-5xl mx-auto">
            {podcastData?.myPodcast.podcast?.isPromoted && (
              <div className="flex justify-center items-center text-sky-600 animate-bounce my-2">
                <div className="mx-2">
                  <FontAwesomeIcon icon={["far", "check-circle"]} />
                </div>
                <div>프로모션 진행 중입니다</div>
              </div>
            )}
            <div className="flex flex-col items-start justify-center lg:flex-row lg:items-start lg:justify-start lg:w-full">
              <div className="flex items-center justify-center w-full lg:w-2/5">
                <img
                  src={podcastData?.myPodcast.podcast?.coverImg}
                  alt={podcastData?.myPodcast.podcast?.title}
                  className="w-40 h-40 lg:w-52 lg:h-52 m-3 rounded-md bg-cover bg-center shadow-xl"
                />
              </div>
              <div className="mt-5 px-4 w-full mx-auto">
                <PodcastInfo
                  categoryName={podcastData?.myPodcast.podcast?.category?.name}
                  podcastTitle={podcastData?.myPodcast.podcast?.title}
                  description={podcastData?.myPodcast.podcast?.description}
                  subscriber={podcastData?.countSubscriptions.users}
                  likes={podcastData?.countLikes.users}
                />
                <div className="mt-10 flex justify-center items-center mx-auto">
                  <Link to={`/add-podcast/${id}/add-episode`}>
                    <div className="lg:mx-6 text-sm mx-1 lg:text-base px-3 lg:px-4 py-2 bg-sky-500  rounded-xl lg:rounded-3xl text-white cursor-pointer hover:opacity-70 transition-opacity">
                      <div className="grid grid-row-2 justify-items-center lg:flex">
                        <div>에피소드</div>
                        <div className="lg:ml-1">등록</div>
                      </div>
                    </div>
                  </Link>
                  <Link to={`/add-promotion/${id}`}>
                    <div className="lg:mx-6 text-sm mx-1 lg:text-base px-3 lg:px-4 py-2 bg-amber-600  rounded-xl lg:rounded-3xl text-white cursor-pointer hover:opacity-70 transition-opacity">
                      <div className="grid grid-row-2 justify-items-center lg:flex">
                        <div>프로모션</div>
                        <div className="lg:ml-1">구매</div>
                      </div>
                    </div>
                  </Link>
                  <Link to={`/edit-podcast/${id}`}>
                    <div className="flex flex-col  lg:mx-6 text-sm mx-1 lg:text-base px-3 lg:px-4 py-2 bg-green-500  rounded-xl lg:rounded-3xl text-white cursor-pointer hover:opacity-70 transition-opacity">
                      <div className="grid grid-row-2 justify-items-center lg:flex">
                        <div>팟캐스트</div>
                        <div className="lg:ml-1">수정</div>
                      </div>
                    </div>
                  </Link>
                  <div className="lg:mx-6 text-sm mx-1 lg:text-base rounded-xl lg:rounded-3xl text-red-500 border border-red-500 cursor-pointer hover:bg-red-500 hover:text-white transition-opacity">
                    <div className="grid grid-row-2 justify-items-center lg:flex">
                      <div>
                        <div
                          onClick={handleClickOpen}
                          className="grid grid-row-2 justify-items-center lg:flex lg:px-4 py-2 px-3 "
                        >
                          <div>팟캐스트</div>
                          <div> 삭제</div>
                        </div>
                        <DeletePodcastBtn
                          handleClose={handleClose}
                          onDelete={onDelete}
                          open={open}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 w-full mb-32">
                  <div>
                    <div className="flex cursor-pointer">
                      <div
                        onClick={onEpisodeView}
                        className={`p-2 transition-colors mx-2 ${
                          episodeView
                            ? "border-b-4  border-sky-500"
                            : "text-gray-300"
                        }`}
                      >
                        에피소드
                      </div>
                      <div
                        onClick={onReviewView}
                        className={`p-2 transition-colors mx-2 ${
                          reviewView
                            ? "border-b-4  border-sky-500"
                            : "text-gray-300"
                        }`}
                      >
                        댓글
                      </div>
                      <div
                        onClick={onSubscriberView}
                        className={`p-2 transition-colors ${
                          subscriberView
                            ? "border-b-4  border-sky-500"
                            : "text-gray-300"
                        }`}
                      >
                        구독자
                      </div>
                    </div>
                    <div className={episodeView ? "mt-5" : "hidden"}>
                      {podcastData?.myPodcast.podcast?.episodes.length === 0 ? (
                        <div className="flex flex-col justify-center items-center">
                          <h2 className="font-semibold text-2xl mb-3 mt-10">
                            등록된 에피소드가 없습니다
                          </h2>
                          <h4 className="font-medium text-base mb-5">
                            다채로운 에피소드를 등록하세요!
                          </h4>
                        </div>
                      ) : (
                        <EpisodeList
                          id={podcastData?.myPodcast.podcast?.id}
                          episodes={podcastData?.myPodcast.podcast?.episodes}
                        />
                      )}
                    </div>
                    <div className={reviewView ? "mt-5" : "hidden"}>
                      <div className="mt-5">
                        {podcastData?.myPodcast.podcast?.reviews.length ===
                        0 ? (
                          <div className="flex flex-col justify-center items-center">
                            <h2 className="font-semibold text-2xl mb-3 mt-10">
                              등록된 댓글이 없습니다
                            </h2>
                            <h4 className="font-medium text-base mb-5">
                              다양한 댓글을 기대하세요!
                            </h4>
                          </div>
                        ) : (
                          podcastData?.myPodcast.podcast?.reviews
                            .map((review, index) => (
                              <div key={index} className="mt-5 mx-2">
                                <div className="flex justify-between w-full">
                                  <div className="flex items-center justify-center">
                                    <div className="flex mr-5 text-sm">
                                      <div className="text-sky-600">
                                        {review.reviewer?.email.split("@")[0]}
                                      </div>
                                      <span className="ml-2 text-gray-600">
                                        님
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center text-xs text-gray-400">
                                    <div className="flex">
                                      <div>
                                        {
                                          review.createdAt
                                            .split("T")[0]
                                            .split("-")[0]
                                        }
                                        -
                                      </div>
                                      <div>
                                        {
                                          review.createdAt
                                            .split("T")[0]
                                            .split("-")[1]
                                        }
                                        -
                                      </div>
                                      <div>
                                        {+review.createdAt
                                          .split("T")[1]
                                          .split(":")[0] +
                                          9 >
                                        24
                                          ? +review.createdAt
                                              .split("T")[0]
                                              .split("-")[2] + 1
                                          : review.createdAt
                                              .split("T")[0]
                                              .split("-")[2]}
                                      </div>
                                    </div>
                                    <div className="ml-1">
                                      {+review.createdAt
                                        .split("T")[1]
                                        .split(":")[0] +
                                        9 >
                                      24
                                        ? +review.createdAt
                                            .split("T")[1]
                                            .split(":")[0] +
                                          9 -
                                          24
                                        : +review.createdAt
                                            .split("T")[1]
                                            .split(":")[0] + 9}
                                      :
                                      {
                                        review.createdAt
                                          .split("T")[1]
                                          .split(":")[1]
                                      }
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="mt-0.5 text-base text-gray-700">
                                    {review.title}
                                  </div>
                                </div>
                                <div className="mt-2 py-2 px-2 bg-gray-100 rounded-lg">
                                  <div className="font-extralight text-gray-700">
                                    {review.text}
                                  </div>
                                </div>
                              </div>
                            ))
                            .reverse()
                        )}
                      </div>
                    </div>
                    <div className={subscriberView ? "mt-5" : "hidden"}>
                      {podcastData?.myPodcast.podcast?.subscriber.length ===
                      0 ? (
                        <div className="flex flex-col justify-center items-center">
                          <h2 className="font-semibold text-2xl mb-3 mt-10">
                            구독중인 유저가 없습니다
                          </h2>
                          <h4 className="font-medium text-base mb-5">
                            반짝이는 아이디어로 구독자를 모집하세요!
                          </h4>
                        </div>
                      ) : (
                        <div>
                          {podcastData?.myPodcast.podcast?.subscriber.map(
                            (user, index) => (
                              <div key={index} className="flex text-sky-700">
                                <ul>
                                  <li>· {user.email}</li>
                                </ul>
                              </div>
                            )
                          )}
                        </div>
                      )}
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
