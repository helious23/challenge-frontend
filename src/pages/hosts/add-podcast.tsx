import gql from "graphql-tag";
import { useMutation, useQuery, useApolloClient } from "@apollo/client";
import { Logo } from "../../components/logo";
import spinner from "../../images/spinner.svg";
import { PageTitle } from "../../components/page-title";
import { useForm } from "react-hook-form";
import { FormError } from "../../components/form-error";
import { Button } from "../../components/button";
import {
  createPodcast,
  createPodcastVariables,
} from "../../__generated__/createPodcast";
import { CATEGORY_FRAGMENT } from "../../fragment";
import { allCategories } from "../../__generated__/allCategories";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import routes from "../../routes";
import { MY_PODCASTS_QUERY } from "./my-podcasts";

export const CREATE_PODCAST_MUTATION = gql`
  mutation createPodcast($createPodcastInput: CreatePodcastInput!) {
    createPodcast(input: $createPodcastInput) {
      ok
      error
      id
    }
  }
`;

export const ALL_CATEGORIES_QUERY = gql`
  query allCategories {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
  }
  ${CATEGORY_FRAGMENT}
`;

interface IFormProps {
  title: string;
  description: string;
  categoryName: string;
  file: FileList;
}

export const AddPodcast = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onCompleted = (data: createPodcast) => {
    const {
      createPodcast: { ok, id },
    } = data;
    if (ok) {
      const { title, categoryName, description } = getValues();
      setUploading(false);
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
              totalResults: queryResult.myPodcasts?.totalResults + 1,
              totalPages: Math.ceil(
                (queryResult.myPodcasts?.totalResults + 1) / 9
              ),
              podcasts: [
                {
                  description,
                  category: {
                    name: categoryName,
                    slug: categoryName,
                    __typename: "Category",
                  },
                  coverImg: imageUrl,
                  id: id,
                  title,
                  __typename: "Podcast",
                },
                ...queryResult.myPodcasts.podcasts,
              ],
            },
          },
        });
      }
      alert("팟캐스트가 등록 되었습니다");
      history.push(routes.home);
    }
    setUploading(false);
  };

  const [
    createPodcastMutation,
    { data: createPodcastMutationResult, loading },
  ] = useMutation<createPodcast, createPodcastVariables>(
    CREATE_PODCAST_MUTATION,
    {
      onCompleted,
    }
  );

  const { data: categoryData, loading: categoryLoading } =
    useQuery<allCategories>(ALL_CATEGORIES_QUERY);

  const { register, formState, handleSubmit, getValues } = useForm<IFormProps>({
    mode: "all",
    defaultValues: {
      categoryName: categoryLoading
        ? "카테고리를 선택하세요"
        : categoryData?.allCategories.categories![0].name,
    },
  });

  const onSubmit = async (data: IFormProps) => {
    try {
      setUploading(true);
      const { title, categoryName, description, file } = data;
      const actualImage = file[0];
      const formBody = new FormData();
      formBody.append("file", actualImage);
      const { url: coverImg } = await (
        await fetch(
          "https://nuber-eats-challenge-back.herokuapp.com/uploads/",
          {
            method: "POST",
            body: formBody,
          }
        )
      ).json();
      setImageUrl(coverImg);

      createPodcastMutation({
        variables: {
          createPodcastInput: {
            title,
            categoryName,
            description,
            coverImg,
          },
        },
      });
    } catch (error) {}
  };

  return (
    <div className="mt-40 lg:mt-36">
      <PageTitle title={"팟캐스트 등록"} />
      {loading ? (
        <div className="mt-64 flex justify-center items-center">
          <Logo logoFile={spinner} option={"w-32"} />
        </div>
      ) : (
        <div className="mt-8 pb-20 max-w-lg md:max-w-4xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="text-2xl font-medium">팟캐스트 등록하기</div>
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
                팟캐스트 대표 사진 등록
              </div>
              <div className="flex justify-between items-center py-2 px-2 bg-gray-100 rounded-lg outline-none focus:border-sky-400 border border-transparent transition-colors">
                <input
                  className="px-2 bg-gray-100 rounded-lg outline-none text-gray-700 text-base focus:border-sky-400 border border-transparent transition-colors w-10/12"
                  type="file"
                  accept="image/*"
                  {...register("file", { required: true })}
                />
              </div>
              <Button
                canClick={formState.isValid}
                loading={uploading}
                actionText="팟캐스트 등록하기"
              />
              {createPodcastMutationResult?.createPodcast.error && (
                <FormError
                  errorMessage={createPodcastMutationResult.createPodcast.error}
                />
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
