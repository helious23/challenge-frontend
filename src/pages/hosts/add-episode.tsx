import gql from "graphql-tag";
import { useMutation, useApolloClient } from "@apollo/client";
import { Logo } from "../../components/logo";
import spinner from "../../images/spinner.svg";
import { PageTitle } from "../../components/page-title";
import { useForm } from "react-hook-form";
import { FormError } from "../../components/form-error";
import { Button } from "../../components/button";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import { MY_PODCAST_QUERY } from "./my-podcast";
import {
  createEpisode,
  createEpisodeVariables,
} from "../../__generated__/createEpisode";

export const CREATE_EPISODE_MUTATION = gql`
  mutation createEpisode($createEpisodeInput: CreateEpisodeInput!) {
    createEpisode(input: $createEpisodeInput) {
      ok
      error
      id
    }
  }
`;

interface IFormProps {
  title: string;
  description?: string;
  file: FileList;
}

interface IParams {
  id: string;
}

export const AddEpisode = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [uploading, setUploading] = useState(false);
  const [episodeUrl, setEpisodeUrl] = useState("");
  const { id } = useParams<IParams>();

  const { register, formState, handleSubmit, getValues } = useForm<IFormProps>({
    mode: "all",
  });

  const onCompleted = (data: createEpisode) => {
    const {
      createEpisode: { ok, id: episodeId },
    } = data;
    if (ok) {
      const { title, description } = getValues();
      setUploading(false);
      const queryResult = client.readQuery({
        query: MY_PODCAST_QUERY,
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

      if (queryResult) {
        client.writeQuery({
          query: MY_PODCAST_QUERY,
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
          data: {
            myPodcast: {
              ...queryResult.myPodcast,
              podcast: {
                ...queryResult.myPodcast.podcast,
                episodes: [
                  ...queryResult.myPodcast.podcast.episodes,
                  {
                    createdAt: new Date().toISOString(),
                    ...(description !== null
                      ? { description }
                      : { description: null }),
                    id: episodeId,
                    rating: 0,
                    title,
                    episodeUrl,
                    __typename: "Episode",
                  },
                ],
              },
            },
            countLikes: {
              ...queryResult.countLikes,
            },
            countSubscriptions: {
              ...queryResult.countSubscriptions,
            },
          },
        });
      }
      history.push(`/podcast/${id}`);
      setUploading(false);
    }
  };

  const [
    createEpisodeMutation,
    { data: createEpisodeMutationResults, loading },
  ] = useMutation<createEpisode, createEpisodeVariables>(
    CREATE_EPISODE_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = async (data: IFormProps) => {
    try {
      setUploading(true);
      const { title, description, file } = data;
      const actualAudio = file[0];
      const formBody = new FormData();
      formBody.append("file", actualAudio);
      const { url: episodeUrl } = await (
        await fetch(
          "https://nuber-eats-challenge-back.herokuapp.com/uploads/",
          {
            method: "POST",
            body: formBody,
          }
        )
      ).json();
      setEpisodeUrl(episodeUrl);

      createEpisodeMutation({
        variables: {
          createEpisodeInput: {
            title,
            ...(description !== "" && { description }),
            episodeUrl,
            podcastId: +id,
          },
        },
      });
    } catch (error) {}
  };

  return (
    <div className="mt-40 lg:mt-36">
      <PageTitle title={"???????????? ??????"} />
      {loading ? (
        <div className="mt-64 flex justify-center items-center">
          <Logo logoFile={spinner} option={"w-32"} />
        </div>
      ) : (
        <div className="mt-8 pb-20 max-w-lg md:max-w-4xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="text-2xl font-medium">???????????? ????????????</div>
          </div>
          <div className="mx-10 mt-10 mb-5 flex justify-between">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-3 mt-5 w-full mb-5"
            >
              <div className="font-medium ml-3 mt-2 text-lg">???????????? ??????</div>
              <input
                className="py-2 px-2 bg-gray-100 rounded-lg outline-none text-gray-700 text-base font-light focus:border-sky-400 border border-transparent transition-colors"
                {...register("title", {
                  required: "???????????? ????????? ?????? ?????? ?????? ?????????",
                  minLength: {
                    value: 2,
                    message: "???????????? ????????? ????????? ????????? ???????????????",
                  },
                })}
                placeholder="???????????? ??????"
                type="text"
                required
              />

              {formState.errors.title?.message && (
                <FormError errorMessage={formState.errors.title?.message} />
              )}
              <div className="font-medium ml-3 mt-2 text-lg">???????????? ??????</div>
              <textarea
                className="py-2 px-2 h-24 bg-gray-100 rounded-lg outline-none text-gray-700 font-light focus:border-sky-400 border border-transparent transition-colors resize-none"
                {...register("description")}
                placeholder="???????????? ?????? (????????????)"
              />
              <div className="font-medium ml-3 mt-2 text-lg">
                ???????????? ?????? ??????
              </div>
              <div className="flex justify-between items-center py-2 px-2 bg-gray-100 rounded-lg outline-none focus:border-sky-400 border border-transparent transition-colors">
                <input
                  className="px-2 bg-gray-100 rounded-lg outline-none text-gray-700 text-base focus:border-sky-400 border border-transparent transition-colors w-10/12"
                  type="file"
                  accept="audio/*"
                  {...register("file", {
                    required: "???????????? ????????? ?????? ?????? ???????????????",
                  })}
                />
              </div>
              <Button
                canClick={formState.isValid}
                loading={uploading}
                actionText="???????????? ????????????"
              />
              {createEpisodeMutationResults?.createEpisode.error && (
                <FormError
                  errorMessage={
                    createEpisodeMutationResults.createEpisode.error
                  }
                />
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
