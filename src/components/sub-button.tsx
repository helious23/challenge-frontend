import { Logo } from "./logo";
import btnSpinner from "../images/btn-spinner.svg";
import btnSpinnerBlue from "../images/btn-spinner-blue.svg";
import { useState } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import {
  subscribeMutation,
  subscribeMutationVariables,
} from "../__generated__/subscribeMutation";
import gql from "graphql-tag";
import { ME_QUERY, useMe } from "../hooks/useMe";
import { PODCAST_QUERY } from "../pages/clients/podcast-detail";

interface ISubButtonProps {
  id: string;
  title: string | undefined;
  coverImg: string | undefined;
  categoryName: string | undefined;
  categorySlug: string | undefined;
  description: string | null | undefined;
  options?: string;
}

interface ISubscriptions {
  __typename: string;
  id: number;
  title: string;
}

const SUBSCRIBE_MUTATION = gql`
  mutation subscribeMutation($input: ToggleSubscribeInput!) {
    toggleSubscribe(input: $input) {
      ok
      error
    }
  }
`;

export const SubButton: React.FC<ISubButtonProps> = ({
  id,
  options,
  title,
  coverImg,
  categoryName,
  categorySlug,
  description,
}) => {
  const [subLoading, setSubLoading] = useState(false);
  const client = useApolloClient();
  const { data: userData } = useMe();
  const onSubscription = userData?.me.subscriptions.some(
    (podcast) => podcast.id === +id
  );

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
    <div
      onClick={onSubscribe}
      className={`rounded-3xl flex items-center py-2 cursor-pointer mr-3 transform hover:-translate-y-1 transition-transform ${
        onSubscription
          ? "bg-white text-gray-400 border border-gray-300 hover:border-gray-400 hover:text-gray-600"
          : "bg-sky-500 text-white hover:bg-sky-600"
      } ${options}`}
    >
      {subLoading ? (
        <div className="w-full px-10 py-0.5 flex justify-center items-center">
          <div>
            <Logo
              logoFile={onSubscription ? btnSpinnerBlue : btnSpinner}
              option={"w-5"}
            />
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center">
          <div className="text-xl font-light hover:text-gray-400 absolute ml-3 mb-0.5">
            {onSubscription ? "-" : "+"}
          </div>
          <div
            className={`w-full flex justify-center items-center ${
              onSubscription ? "font-light text-xs" : "font-medium text-md "
            }`}
          >
            <div>{onSubscription ? "구독 취소" : "구독"}</div>
          </div>
        </div>
      )}
    </div>
  );
};
