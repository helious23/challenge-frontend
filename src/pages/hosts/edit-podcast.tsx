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
import {
  updatePodcast,
  updatePodcastVariables,
} from "../../__generated__/updatePodcast";
import { ALL_CATEGORIES_QUERY } from "./add-podcast";
import { allCategories } from "../../__generated__/allCategories";
import { myPodcast_myPodcast_podcast } from "../../__generated__/myPodcast";
import { MY_PODCAST_INFO } from "./edit-episode";
import {
  myPodcastInfo,
  myPodcastInfoVariables,
} from "../../__generated__/myPodcastInfo";

export const UPDATE_PODCAST_MUTATION = gql`
  mutation updatePodcast($updatePodcastInput: UpdatePodcastInput!) {
    updatePodcast(input: $updatePodcastInput) {
      ok
      error
    }
  }
`;

interface IFormProps {
  title: string;
  description: string;
  categoryName: string;
  file: FileList;
}

interface IParams {
  id: string;
}

export const EditPodcast = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [uploading, setUploading] = useState(false);
  const [coverImg, setCoverImg] = useState("");
  const [podcast, setPodcast] = useState<myPodcast_myPodcast_podcast>();
  const { id } = useParams<IParams>();

  const { register, formState, handleSubmit, getValues, setValue } =
    useForm<IFormProps>({
      mode: "all",
    });
  const { data: myPodcastData } = useQuery<
    myPodcastInfo,
    myPodcastInfoVariables
  >(MY_PODCAST_INFO, {
    variables: {
      input: {
        id: +id,
      },
    },
  });

  const { data: categoryData } = useQuery<allCategories>(ALL_CATEGORIES_QUERY);

  useEffect(() => {
    if (myPodcastData) {
      let result: myPodcast_myPodcast_podcast;
      const findData = myPodcastData.myPodcast.podcast;
      result = {
        ...findData!,
      };
      setPodcast(result);
    }
  }, [myPodcastData]);

  useEffect(() => {
    if (podcast) {
      setValue("title", podcast.title);
      setValue("categoryName", podcast.category?.name!);
      setValue("description", podcast.description!);
    }
  }, [podcast, setValue]);

  const onCompleted = (data: updatePodcast) => {
    const {
      updatePodcast: { ok },
    } = data;
    if (ok) {
      const { title, description, categoryName } = getValues();
      setUploading(false);
      const queryResult = client.readQuery({
        query: MY_PODCAST_QUERY,
        variables: { input: { id: +id } },
      });

      if (queryResult) {
        client.writeQuery({
          query: MY_PODCAST_QUERY,
          variables: { input: { id: +id } },
          data: {
            myPodcast: {
              ...queryResult.myPodcast,
              podcast: {
                ...queryResult.myPodcast.podcast,
                title,
                category: {
                  name: categoryName,
                  slug: categoryName,
                  __typename: "Category",
                },
                description,
                coverImg: coverImg === "" ? podcast?.coverImg : coverImg,
              },
            },
          },
        });
      }
      alert("팟캐스트가 수정 되었습니다");
      history.push(`/podcast/${id}`);
      setUploading(false);
    }
  };

  const [
    updatePodcastMutation,
    { data: updatePodcastMutationResult, loading },
  ] = useMutation<updatePodcast, updatePodcastVariables>(
    UPDATE_PODCAST_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = async (data: IFormProps) => {
    try {
      setUploading(true);
      const { title, description, file, categoryName } = data;
      if (file.length !== 0) {
        const actualAudio = file[0];
        const formBody = new FormData();
        formBody.append("file", actualAudio);
        const { url: coverImg } = await (
          await fetch(
            "https://nuber-eats-challenge-back.herokuapp.com/uploads/",
            {
              method: "POST",
              body: formBody,
            }
          )
        ).json();
        setCoverImg(coverImg);
      }

      updatePodcastMutation({
        variables: {
          updatePodcastInput: {
            id: +id,
            title,
            description,
            categoryName,
            ...(coverImg !== "" && { coverImg }),
          },
        },
      });
    } catch (error) {}
  };

  return (
    <div className="mt-40 lg:mt-36">
      <PageTitle title={"팟캐스트 수정"} />
      {loading ? (
        <div className="mt-64 flex justify-center items-center">
          <Logo logoFile={spinner} option={"w-32"} />
        </div>
      ) : (
        <div className="mt-8 pb-20 max-w-lg md:max-w-4xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="text-2xl font-medium">팟캐스트 수정하기</div>
          </div>
          <div className="mx-10 mt-10 mb-5 flex justify-between">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-3 mt-5 w-full mb-5"
            >
              <div className="font-medium ml-3 mt-2 text-lg">팟캐스트 제목</div>
              <input
                className="py-2 px-2 bg-gray-100 rounded-lg outline-none text-gray-700 text-base font-light focus:border-sky-400 border border-transparent transition-colors"
                {...register("title", {
                  required: "팟캐스트 제목은 필수 입력 사항 입니다",
                  minLength: {
                    value: 2,
                    message: "팟캐스트 제목은 두글자 이상이 필요합니다",
                  },
                })}
                placeholder="팟캐스트 제목"
                type="text"
                required
              />

              {formState.errors.title?.message && (
                <FormError errorMessage={formState.errors.title?.message} />
              )}
              <div className="font-medium ml-3 mt-2 text-lg">카테고리 선택</div>
              <select
                className="py-2 px-2 bg-gray-100 rounded-lg outline-none text-gray-700 text-base font-light focus:border-sky-400 border border-transparent transition-colors"
                {...register("categoryName")}
                placeholder="카테고리"
                required
              >
                {categoryData?.allCategories.categories !== null &&
                  categoryData?.allCategories.categories.map(
                    (category, index) => (
                      <option key={index} className="text-gray-500">
                        {category.name}
                      </option>
                    )
                  )}
              </select>
              {formState.errors.categoryName?.message && (
                <FormError
                  errorMessage={formState.errors.categoryName?.message}
                />
              )}
              <div className="font-medium ml-3 mt-2 text-lg">팟캐스트 설명</div>
              <textarea
                className="py-2 px-2 h-24 bg-gray-100 rounded-lg outline-none text-gray-700 font-light focus:border-sky-400 border border-transparent transition-colors resize-none"
                {...register("description", {
                  required: "팟캐스트 설명은 필수 입력 사항 입니다",
                })}
                placeholder="팟캐스트 설명"
                required
              />
              {formState.errors.description?.message && (
                <FormError
                  errorMessage={formState.errors.description?.message}
                />
              )}
              <div className="font-medium ml-3 mt-2 text-lg">
                팟캐스트 대표 사진 변경
                <span className="text-sm">(사진 변경시에만 선택)</span>
              </div>
              <div className="flex justify-between items-center py-2 px-2 bg-gray-100 rounded-lg outline-none focus:border-sky-400 border border-transparent transition-colors">
                <input
                  className="px-2 bg-gray-100 rounded-lg outline-none text-gray-700 text-base focus:border-sky-400 border border-transparent transition-colors w-10/12"
                  type="file"
                  accept="image/*"
                  {...register("file", { required: false })}
                />
              </div>
              <Button
                canClick={formState.isDirty}
                loading={uploading}
                actionText="팟캐스트 수정하기"
              />
              {updatePodcastMutationResult?.updatePodcast.error && (
                <FormError
                  errorMessage={updatePodcastMutationResult.updatePodcast.error}
                />
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
