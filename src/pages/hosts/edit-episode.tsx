import gql from "graphql-tag";
import { useMutation, useApolloClient, useQuery } from "@apollo/client";
import { Logo } from "../../components/logo";
import spinner from "../../images/spinner.svg";
import { PageTitle } from "../../components/page-title";
import { useForm } from "react-hook-form";
import { FormError } from "../../components/form-error";
import { Button } from "../../components/button";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MY_PODCAST_QUERY } from "./my-podcast";
import { myPodcast, myPodcastVariables } from "../../__generated__/myPodcast";
import {
  updateEpisode,
  updateEpisodeVariables,
} from "../../__generated__/updateEpisode";

export const UPDATE_EPISODE_MUTATION = gql`
  mutation updateEpisode($updateEpisodeInput: UpdateEpisodeInput!) {
    updateEpisode(input: $updateEpisodeInput) {
      ok
      error
    }
  }
`;

interface IFormProps {
  title: string;
  description?: string;
  file: FileList;
}

interface IParams {
  podcastId: string;
  episodeId: string;
}

interface IEpisode {
  __typename: "Episode";
  id: number;
  title: string;
  episodeUrl: string | null;
  description: string | null;
}

export const EditEpisode = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [uploading, setUploading] = useState(false);
  const [episodeUrl, setEpisodeUrl] = useState("");
  const { podcastId, episodeId } = useParams<IParams>();
  const [episode, setEpisode] = useState<IEpisode>();

  const { register, formState, handleSubmit, getValues, setValue } =
    useForm<IFormProps>({
      mode: "all",
    });
  const { data: myPodcastData } = useQuery<myPodcast, myPodcastVariables>(
    MY_PODCAST_QUERY,
    {
      variables: {
        input: {
          id: +podcastId,
        },
      },
    }
  );

  useEffect(() => {
    if (myPodcastData) {
      let result: IEpisode;
      const findData = myPodcastData.myPodcast.podcast?.episodes.find(
        (episode) => episode.id === +episodeId
      );
      result = {
        ...findData!,
      };
      setEpisode(result);
    }
  }, [myPodcastData, episodeId]);

  useEffect(() => {
    if (episode) {
      setValue("title", episode.title);
      setValue(
        "description",
        episode.description !== null ? episode.description : ""
      );
    }
  }, [episode, setValue]);

  const onCompleted = (data: updateEpisode) => {
    const {
      updateEpisode: { ok },
    } = data;
    if (ok) {
      const { title, description } = getValues();
      setUploading(false);
      const queryResult = client.readQuery({
        query: MY_PODCAST_QUERY,
        variables: { input: { id: +podcastId } },
      });

      if (queryResult) {
        client.writeQuery({
          query: MY_PODCAST_QUERY,
          variables: { input: { id: +podcastId } },
          data: {
            myPodcast: {
              ...queryResult.myPodcast,
              podcast: {
                ...queryResult.myPodcast.podcast,
                episodes: queryResult.myPodcast.podcast.episodes.map(
                  (episode: IEpisode) =>
                    episode.id === +episodeId
                      ? {
                          createdAt: new Date().toISOString(),
                          ...(description !== null
                            ? { description }
                            : { description: null }),
                          id: +episodeId,
                          rating: 0,
                          title,
                          episodeUrl:
                            episodeUrl === ""
                              ? episode?.episodeUrl
                              : episodeUrl,
                          __typename: "Episode",
                        }
                      : episode
                ),
              },
            },
          },
        });
      }
      alert("에피소드가 수정 되었습니다");
      history.push(`/podcast/${podcastId}`);
      setUploading(false);
    }
  };

  const [
    updateEpisodeMutation,
    { data: updateEpisodeMutationResult, loading },
  ] = useMutation<updateEpisode, updateEpisodeVariables>(
    UPDATE_EPISODE_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = async (data: IFormProps) => {
    try {
      setUploading(true);
      const { title, description, file } = data;
      if (file.length !== 0) {
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
      }

      updateEpisodeMutation({
        variables: {
          updateEpisodeInput: {
            podcastId: +podcastId,
            episodeId: +episodeId,
            ...(title !== "" && { title }),
            description,
            ...(episodeUrl !== "" && { episodeUrl }),
          },
        },
      });
    } catch (error) {}
  };

  return (
    <div className="mt-40 lg:mt-36">
      <PageTitle title={"에피소드 수정"} />
      {loading ? (
        <div className="mt-64 flex justify-center items-center">
          <Logo logoFile={spinner} option={"w-32"} />
        </div>
      ) : (
        <div className="mt-8 pb-20 max-w-lg md:max-w-4xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="text-2xl font-medium">에피소드 수정하기</div>
          </div>
          <div className="mx-10 mt-10 mb-5 flex justify-between">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-3 mt-5 w-full mb-5"
            >
              <div className="font-medium ml-3 mt-2 text-lg">에피소드 제목</div>
              <input
                className="py-2 px-2 bg-gray-100 rounded-lg outline-none text-gray-700 text-base font-light focus:border-sky-400 border border-transparent transition-colors"
                {...register("title", {
                  minLength: {
                    value: 2,
                    message: "에피소드 제목은 두글자 이상이 필요합니다",
                  },
                })}
                placeholder="에피소드 제목"
                type="text"
              />

              {formState.errors.title?.message && (
                <FormError errorMessage={formState.errors.title?.message} />
              )}
              <div className="font-medium ml-3 mt-2 text-lg">에피소드 설명</div>
              <textarea
                className="py-2 px-2 h-24 bg-gray-100 rounded-lg outline-none text-gray-700 font-light focus:border-sky-400 border border-transparent transition-colors resize-none"
                {...register("description")}
                placeholder="에피소드 설명 (선택사항)"
              />
              <div className="font-medium ml-3 mt-2 text-lg">
                에피소드 파일 수정
              </div>
              <div className="flex justify-between items-center py-2 px-2 bg-gray-100 rounded-lg outline-none focus:border-sky-400 border border-transparent transition-colors">
                <input
                  className="px-2 bg-gray-100 rounded-lg outline-none text-gray-700 text-base focus:border-sky-400 border border-transparent transition-colors w-10/12"
                  type="file"
                  accept="audio/*"
                  {...register("file", { required: false })}
                />
              </div>
              <Button
                canClick={formState.isDirty}
                loading={uploading}
                actionText="에피소드 수정하기"
              />
              {updateEpisodeMutationResult?.updateEpisode.error && (
                <FormError
                  errorMessage={updateEpisodeMutationResult.updateEpisode.error}
                />
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
