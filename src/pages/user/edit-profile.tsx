import { useMe } from "../../hooks/useMe";
import { FormError } from "../../components/form-error";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PageTitle } from "../../components/page-title";

import routes from "../../routes";
import gql from "graphql-tag";
import { useMutation, useApolloClient } from "@apollo/client";
import { Button } from "../../components/button";
import {
  editProfileMutation,
  editProfileMutationVariables,
} from "../../__generated__/editProfileMutation";

interface IEditProfileForm {
  email?: string;
}

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfileMutation($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

export const EditProfile = () => {
  const { data: userData } = useMe();
  const history = useHistory();
  const client = useApolloClient();

  const { register, formState, handleSubmit, getValues } =
    useForm<IEditProfileForm>({
      mode: "all",
      defaultValues: {
        email: userData?.me.email,
      },
    });

  const onCompleted = (data: editProfileMutation) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              email
            }
          `,
          data: {
            email: newEmail,
          },
        });
      }
      alert("프로필이 수정되었습니다.");
      history.push(routes.home);
    }
  };
  const [editProfileMutation, { data: editProfileResults, loading }] =
    useMutation<editProfileMutation, editProfileMutationVariables>(
      EDIT_PROFILE_MUTATION,
      {
        onCompleted,
      }
    );

  const onSubmit = (data: IEditProfileForm) => {
    const { email } = data;
    editProfileMutation({
      variables: {
        input: {
          ...(email !== "" && email !== userData?.me.email && { email }),
        },
      },
    });
  };

  return (
    <div className="h-full flex flex-col items-center mt-28 lg:mt-20 lg:mb-24">
      <PageTitle title={"프로필 수정"} />
      <div className="w-full max-w-screen-sm flex px-5 flex-col items-center">
        <h3 className="w-full text-2xl mt-8 text-gray-800 font-semibold text-center">
          프로필 수정
        </h3>
        <form
          className="grid gap-3 mt-5 w-full mb-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="">
            <div className="text-left mb-3 text-md font-semibold">
              이메일(아이디)
            </div>
            <input
              placeholder="이메일을 입력해주세요"
              className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:border-sky-400 border border-gray-100 transition-colors cursor-pointer"
              type="email"
              {...register("email", {
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "이메일 주소 형식이 아닙니다",
                },
                validate: (value) =>
                  value !== userData?.me.email || "기존 이메일과 동일합니다",
              })}
            />
          </div>
          {formState.errors.email?.message && (
            <FormError errorMessage={formState.errors.email.message} />
          )}
          <Link to={routes.editPassword}>
            <div className="mt-3 py-3 text-white font-medium text-lg rounded-3xl focus:outline-none transition-colors bg-sky-400 text-center cursor-pointer hover:bg-sky-600">
              비밀번호 수정
            </div>
          </Link>
          <Button
            canClick={!loading}
            loading={loading}
            actionText={"프로필 수정하기"}
          />
          {editProfileResults?.editProfile.error && (
            <FormError errorMessage={editProfileResults.editProfile.error} />
          )}
        </form>
      </div>
    </div>
  );
};
