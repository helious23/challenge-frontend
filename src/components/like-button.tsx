import { Logo } from "./logo";
import btnSpinnerHeart from "../images/btn-spinner-heart.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useMe, ME_QUERY } from "../hooks/useMe";
import {
  likeMutation,
  likeMutationVariables,
} from "../__generated__/likeMutation";
import { useMutation, useApolloClient } from "@apollo/client";
import gql from "graphql-tag";
import { PODCAST_QUERY } from "../pages/clients/podcast-detail";

interface ILikeButtonProps {
  id: string;
  title: string | undefined;
  coverImg: string | undefined;
  categoryName: string | undefined;
  categorySlug: string | undefined;
  description: string | null | undefined;
}

interface ILikes {
  __typename: string;
  id: number;
}

const LIKE_MUTATION = gql`
  mutation likeMutation($input: ToggleLikeInput!) {
    toggleLike(input: $input) {
      ok
      error
    }
  }
`;

export const LikeButton: React.FC<ILikeButtonProps> = ({
  id,
  title,
  coverImg,
  categoryName,
  categorySlug,
  description,
}) => {
  const [likeLoading, setLikeLoading] = useState(false);
  const { data: userData } = useMe();
  const client = useApolloClient();
  const onLike = userData?.me.likes.some((podcast) => podcast.id === +id);

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
                      title,
                      coverImg,
                      category: {
                        __typename: "Category",
                        name: categoryName,
                        slug: categorySlug,
                      },
                      description,
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

  return (
    <div
      onClick={onLikes}
      className="w-10 h-10 rounded-full bg-gray-100 flex 
      items-center justify-center cursor-pointer transform hover:-translate-y-2 transition-transform 
      hover:bg-gray-200 border border-transparent hover:border hover:border-gray-300"
    >
      {likeLoading ? (
        <div className="">
          <Logo logoFile={btnSpinnerHeart} option={"w-5"} />
        </div>
      ) : (
        <>
          {onLike ? (
            <FontAwesomeIcon icon={["fas", "heart"]} className="text-red-400" />
          ) : (
            <FontAwesomeIcon icon={["far", "heart"]} className="text-red-400" />
          )}
        </>
      )}
    </div>
  );
};
