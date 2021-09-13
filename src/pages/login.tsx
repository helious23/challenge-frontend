import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { FormError } from "../components/form-error";
import { Logo } from "./logo";
import podbang from "../images/podbang.png";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import { Button } from "./button";
import { Link, useLocation } from "react-router-dom";
import routes from "../routes";
import { PageTitle } from "../components/page-title";
import { logUserIn } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
  message?: string;
}

export const Login = () => {
  const location = useLocation<ILoginForm>();
  const { register, formState, handleSubmit } = useForm<ILoginForm>({
    mode: "all",
    defaultValues: {
      email: location?.state?.email || "",
      password: location?.state?.password || "",
    },
  });
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      logUserIn(token);
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = (data: ILoginForm) => {
    const { email, password } = data;
    if (!loading) {
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="h-full flex flex-col items-center mt-3 lg:mt-32">
      <PageTitle title={"로그인"} />
      <div className="w-full max-w-screen-sm flex px-5 flex-col items-center">
        <Logo logoFile={podbang} option={"w-64 mr-10"} />
        <div className="w-full text-2xl mt-8 text-gray-800 font-semibold text-center">
          이메일로 로그인
        </div>
        <div
          className={`${
            location.state?.message ? "text-sky-500 mt-5 font-medium" : ""
          }`}
        >
          {location.state?.message ? location.state.message : ""}
        </div>
        <form
          className="grid gap-3 mt-5 w-full mb-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="">
            <div className="text-left mb-3 text-md font-semibold">이메일</div>
            <input
              placeholder="이메일을 입력해주세요"
              className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:border-sky-400 border border-gray-100 transition-colors cursor-pointer"
              type="email"
              {...register("email", {
                required: "이메일 주소가 필요합니다",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "이메일 주소 형식이 아닙니다",
                },
              })}
            />
          </div>
          {formState.errors.email?.message && (
            <FormError errorMessage={formState.errors.email.message} />
          )}
          <div>
            <div className="text-left mb-3 text-md font-semibold">비밀번호</div>
            <input
              placeholder="비밀번호를 입력해주세요"
              className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:border-sky-400 border border-gray-100 transition-colors cursor-pointer"
              type="password"
              {...register("password", {
                required: "비밀번호가 필요합니다",
                minLength: {
                  value: 6,
                  message: "비밀번호는 6글자 이상입니다",
                },
              })}
            />
          </div>
          {formState.errors.password?.message && (
            <FormError errorMessage={formState.errors.password.message} />
          )}
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"로그인"}
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          계정이 없으신가요?{" "}
          <Link
            to={routes.createAccount}
            className="text-sky-500 hover:underline"
          >
            회원 가입
          </Link>
        </div>
      </div>
    </div>
  );
};
