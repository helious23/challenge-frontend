import { podcastsDetailQuery } from "../__generated__/podcastsDetailQuery";
import btnSpinner from "../images/btn-spinner.svg";
import { useForm } from "react-hook-form";
import { FormError } from "./form-error";
import gql from "graphql-tag";
import { useMutation, useApolloClient } from "@apollo/client";
import { Logo } from "./logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMe } from "../hooks/useMe";
import { PODCAST_QUERY } from "../pages/clients/podcast-detail";
import {
  createReview,
  createReviewVariables,
} from "../__generated__/createReview";
import {
  deleteReview,
  deleteReviewVariables,
} from "../__generated__/deleteReview";

interface IReviewProps {
  podcastData: podcastsDetailQuery | undefined;
  id: string;
}

interface IReviewForm {
  title: string;
  text: string;
}

interface IReview {
  id: number;
}

const CREATE_REVIEW_MUTATION = gql`
  mutation createReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      ok
      error
      id
    }
  }
`;

const DELETE_REVIEW_MUTATION = gql`
  mutation deleteReview($input: DeleteReviewInput!) {
    deleteReview(input: $input) {
      ok
      error
      reviewId
    }
  }
`;

export const Review: React.FC<IReviewProps> = ({ podcastData, id }) => {
  const { register, formState, handleSubmit, getValues } = useForm<IReviewForm>(
    {
      mode: "all",
    }
  );
  const { data: userData } = useMe();
  const client = useApolloClient();

  const onCreateCompleted = (data: createReview) => {
    const {
      createReview: { ok, id: reviewId },
    } = data;
    if (ok) {
      const { text, title } = getValues();
      const reviewResults = client.readQuery({
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

      if (reviewResults) {
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
              ...reviewResults.getPodcast,
              podcast: {
                ...reviewResults.getPodcast.podcast,
                reviews: [
                  {
                    createdAt: new Date().toISOString(),
                    id: reviewId,
                    reviewer: {
                      email: userData?.me.email,
                      __typename: "User",
                    },
                    text,
                    title,
                    __typename: "Review",
                  },
                  ...reviewResults.getPodcast.podcast.reviews,
                ],
              },
            },
            countSubscriptions: {
              ...reviewResults.countSubscriptions,
            },
            countLikes: {
              ...reviewResults.countLikes,
            },
          },
        });
      }
    }
  };

  const onDeleteCompleted = (data: deleteReview) => {
    const {
      deleteReview: { ok, reviewId },
    } = data;
    if (ok) {
      const reviewResults = client.readQuery({
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

      if (reviewResults) {
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
              ...reviewResults.getPodcast,
              podcast: {
                ...reviewResults.getPodcast.podcast,
                reviews: reviewResults.getPodcast.podcast.reviews.filter(
                  (review: IReview) => review.id !== reviewId
                ),
              },
            },
            countSubscriptions: {
              ...reviewResults.countSubscriptions,
            },
            countLikes: {
              ...reviewResults.countLikes,
            },
          },
        });
      }
    }
  };

  const [createReviewMutation, { data: createMutationResult, loading }] =
    useMutation<createReview, createReviewVariables>(CREATE_REVIEW_MUTATION, {
      onCompleted: onCreateCompleted,
    });

  const [deleteReviewMutation, { data: deleteMutationResult }] = useMutation<
    deleteReview,
    deleteReviewVariables
  >(DELETE_REVIEW_MUTATION, {
    onCompleted: onDeleteCompleted,
  });

  const onDeleteReview = (id: number) => {
    if (userData) {
      deleteReviewMutation({
        variables: {
          input: {
            id,
          },
        },
      });
    }
  };

  const onSubmit = (data: IReviewForm) => {
    const { title, text } = data;
    if (!loading) {
      createReviewMutation({
        variables: {
          input: {
            text,
            title,
            podcastId: +id,
          },
        },
      });
    }
  };

  return (
    <div>
      <form
        className="grid gap-3 mt-5 w-full mb-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          placeholder="제목을 입력해주세요"
          type="text"
          className="py-2 px-2 bg-gray-100 rounded-lg outline-none text-gray-700 text-base"
          {...register("title")}
        />
        {formState.errors.title?.message && (
          <FormError errorMessage={formState.errors.title.message} />
        )}
        <textarea
          placeholder="댓글을 입력해주세요"
          className="py-2 px-2 h-24 bg-gray-100 rounded-lg outline-none text-gray-700 font-extralight"
          {...register("text")}
        />
        {formState.errors.text?.message && (
          <FormError errorMessage={formState.errors.text.message} />
        )}
        <div className="flex justify-end">
          <button
            className={`py-1 text-sm bg-sky-500 rounded-3xl text-white text-center w-20`}
          >
            {loading ? (
              <div className="flex justify-center">
                <Logo logoFile={btnSpinner} option={"w-5"} />
              </div>
            ) : (
              "등록"
            )}
          </button>
        </div>
        {createMutationResult?.createReview.error && (
          <FormError
            errorMessage={createMutationResult.createReview.error}
            options={"text-sm"}
          />
        )}
      </form>
      <div className="border-t border-gray-200 w-full mt-2"></div>
      <div className="mt-5">
        {podcastData?.getPodcast.podcast?.reviews.map((review, index) => (
          <div key={index} className="mt-5 mx-2">
            <div className="flex justify-between w-full">
              <div className="flex items-center justify-center">
                <div className="flex mr-5 text-sm">
                  <div className="text-sky-600">
                    {review.reviewer?.email.split("@")[0]}
                  </div>
                  <span className="ml-2 text-gray-600">님</span>
                </div>
              </div>
              <div className="flex items-center text-xs text-gray-400">
                <div>{review.createdAt.split("T")[0]}</div>
                <div className="ml-1">
                  {+review.createdAt.split("T")[1].split(":")[0] + 9}:
                  {review.createdAt.split("T")[1].split(":")[1]}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="mt-0.5 text-base text-gray-700">
                {review.title}
              </div>
              <div onClick={() => onDeleteReview(review.id)}>
                <FontAwesomeIcon
                  icon={["far", "trash-alt"]}
                  className="text-sm text-gray-400 hover:text-gray-700 cursor-pointer"
                />
                {deleteMutationResult?.deleteReview.error && (
                  <FormError
                    errorMessage={deleteMutationResult.deleteReview.error}
                    options={"text-sm"}
                  />
                )}
              </div>
            </div>
            <div className="mt-2 py-2 px-2 bg-gray-100 rounded-lg">
              <div className="font-extralight text-gray-700">{review.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
