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
  createPromotionImg,
  createPromotionImgVariables,
} from "../../__generated__/createPromotionImg";

export const CREATE_PROMOTION_IMG = gql`
  mutation createPromotionImg(
    $createPromotionImgInput: CreatePromotionImgInput!
  ) {
    createPromotionImg(input: $createPromotionImgInput) {
      ok
      error
    }
  }
`;

interface IFormProps {
  file: FileList;
}

interface IParams {
  id: string;
}

export const AddPromotion = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [uploading, setUploading] = useState(false);
  const { id } = useParams<IParams>();

  const { register, formState, handleSubmit } = useForm<IFormProps>({
    mode: "all",
  });

  const onCompleted = (data: createPromotionImg) => {
    const {
      createPromotionImg: { ok },
    } = data;
    if (ok) {
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
                isPromoted: true,
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
    }
  };

  const [
    createPromotionImgMutation,
    { data: createPromotionImgMutationResults, loading },
  ] = useMutation<createPromotionImg, createPromotionImgVariables>(
    CREATE_PROMOTION_IMG,
    {
      onCompleted,
    }
  );

  const onSubmit = async (data: IFormProps) => {
    try {
      setUploading(true);
      const { file } = data;
      const actualImg = file[0];
      const formBody = new FormData();
      formBody.append("file", actualImg);
      const { url: promotionImgUrl } = await (
        await fetch(
          "https://nuber-eats-challenge-back.herokuapp.com/uploads/",
          {
            method: "POST",
            body: formBody,
          }
        )
      ).json();

      createPromotionImgMutation({
        variables: {
          createPromotionImgInput: {
            promotionImage: promotionImgUrl,
            id: +id,
          },
        },
      });
    } catch (error) {}
  };

  return (
    <div className="mt-40 lg:mt-36">
      <PageTitle title={"프로모션 구매"} />
      {loading ? (
        <div className="mt-64 flex justify-center items-center">
          <Logo logoFile={spinner} option={"w-32"} />
        </div>
      ) : (
        <div className="mt-8 pb-20 max-w-lg md:max-w-4xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="text-2xl font-medium">프로모션 구매하기</div>
          </div>
          <div className="mx-10 mt-10 mb-5 flex justify-between">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-3 w-full mb-5"
            >
              <div className="font-light text-lg mb-10 mx-5 lg:mx-20">
                <div className="flex item-center justify-start">
                  <div className="border rounded-b-2xl rounded-tr-2xl border-gray-700 border-opacity-70 p-3 text-gray-700 opacity-90">
                    프로모션이 무엇인가요?
                  </div>
                </div>
                <div className="flex items-center justify-end w-full mt-8 lg:mt-5">
                  <div className="flex flex-col items-center justify-center text-white opacity-90 bg-sky-500 rounded-b-2xl rounded-tl-2xl py-2 px-5">
                    <div>프로모션 이미지를 등록하시면 </div>
                    <div>메인 페이지 상단에 프로모션 이미지 노출 및 </div>
                    <div>검색 페이지 인기있는 팟캐스트에 등록됩니다.</div>
                  </div>
                </div>
              </div>
              <div className="font-medium ml-3 mt-2 text-lg">
                프로모션 이미지 파일 등록
              </div>
              <div className="flex justify-between items-center py-2 px-2 bg-gray-100 rounded-lg outline-none focus:border-sky-400 border border-transparent transition-colors">
                <input
                  className="px-2 bg-gray-100 rounded-lg outline-none text-gray-700 text-base focus:border-sky-400 border border-transparent transition-colors w-10/12"
                  type="file"
                  accept="image/*"
                  {...register("file", {
                    required: "프로모션 이미지 파일은 필수 등록 사항입니다",
                  })}
                />
              </div>
              <Button
                canClick={formState.isValid}
                loading={uploading}
                actionText="프로모션 이미지 등록하기"
              />
              {createPromotionImgMutationResults?.createPromotionImg.error && (
                <FormError
                  errorMessage={
                    createPromotionImgMutationResults.createPromotionImg.error
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
