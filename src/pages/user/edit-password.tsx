import { PageTitle } from "../../components/page-title";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormError } from "../../components/form-error";

import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import routes from "../../routes";
import {
  editPasswordMutation,
  editPasswordMutationVariables,
} from "../../__generated__/editPasswordMutation";
import { Button } from "../../components/button";

interface IEditPassword {
  password: string;
  passwordCheck: string;
}

const EDIT_PASSWORD_MUTATION = gql`
  mutation editPasswordMutation($input: EditPasswordInput!) {
    editPassword(input: $input) {
      ok
      error
    }
  }
`;

export const EditPassword = () => {
  const history = useHistory();
  const onCompleted = (data: editPasswordMutation) => {
    const {
      editPassword: { ok },
    } = data;
    if (ok) {
      alert("비밀번호가 수정되었습니다");
      history.push(routes.home);
    }
  };

  const [editPasswordMutation, { data: editPasswordResult, loading }] =
    useMutation<editPasswordMutation, editPasswordMutationVariables>(
      EDIT_PASSWORD_MUTATION,
      {
        onCompleted,
      }
    );

  const onSubmit = (data: IEditPassword) => {
    const { password } = data;
    editPasswordMutation({
      variables: {
        input: {
          password,
        },
      },
    });
  };

  const { register, formState, handleSubmit, watch } = useForm<IEditPassword>({
    mode: "all",
    defaultValues: {},
  });
  return (
    <div className="h-full flex flex-col items-center pt-28 lg:pt-20 lg:mb-24">
      <PageTitle title={"비밀번호 수정"} />
      <div className="w-full max-w-screen-sm flex px-5 flex-col items-center">
        <h3 className="w-full text-2xl mt-8 text-gray-800 font-semibold text-center">
          비밀번호 수정
        </h3>
        <form
          className="grid gap-3 mt-5 w-full mb-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="text-left mb-3 text-md font-semibold">
              새로운 비밀번호
            </div>
            <input
              placeholder="비밀번호(영문 소문자, 숫자, 특수문자 6~20자)"
              className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:border-sky-400 border border-gray-100 transition-colors cursor-pointer"
              type="password"
              {...register("password", {
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,20})/,
                  message:
                    "비밀번호는 영문 소문자, 숫자, 특수문자 포함 6~20자 입니다",
                },
              })}
            />
          </div>
          {formState.errors.password?.message && (
            <FormError errorMessage={formState.errors.password.message} />
          )}
          <div>
            <input
              placeholder="비밀번호를 확인해주세요"
              className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:border-sky-400 border border-gray-100 transition-colors cursor-pointer"
              type="password"
              {...register("passwordCheck", {
                required: "비밀번호 확인이 필요합니다",
                validate: (value) =>
                  value === watch("password") || "비밀번호가 일치하지 않습니다",
              })}
            />
          </div>
          {formState.errors.passwordCheck?.message && (
            <FormError errorMessage={formState.errors.passwordCheck.message} />
          )}

          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"새 비밀번호로 수정하기"}
          />
          {editPasswordResult?.editPassword.error && (
            <FormError errorMessage={editPasswordResult.editPassword.error} />
          )}
        </form>
      </div>
    </div>
  );
};
