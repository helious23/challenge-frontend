import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { FormError } from "../components/form-error";
import { Logo } from "./logo";
import podbang from "../images/podbang.png";
import { Button } from "./button";
import { Link, useHistory } from "react-router-dom";
import routes from "../routes";
import { PageTitle } from "../components/page-title";
import { UserRole } from "../__generated__/globalTypes";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  passwordCheck: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const history = useHistory();

  const { register, formState, handleSubmit, watch, getValues } =
    useForm<ICreateAccountForm>({
      mode: "all",
      defaultValues: {
        role: UserRole.Listener,
      },
    });

  const onCompleted = (data: createAccountMutation) => {
    const { email, password } = getValues();
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      history.push(routes.home, {
        message: "계정이 생성되었습니다. 로그인 하세요.",
        email,
        password,
      });
    }
  };

  const [createAccountMutation, { data: createAccountResult, loading }] =
    useMutation<createAccountMutation, createAccountMutationVariables>(
      CREATE_ACCOUNT_MUTATION,
      {
        onCompleted,
      }
    );

  const onSubmit = (data: ICreateAccountForm) => {
    const { email, password, role } = data;
    if (!loading) {
      createAccountMutation({
        variables: {
          createAccountInput: {
            email,
            password,
            role,
          },
        },
      });
    }
  };

  return (
    <div className="h-full flex flex-col items-center mt-3 lg:mt-24">
      <PageTitle title={"회원 가입"} />
      <div className="w-full max-w-screen-sm flex px-5 flex-col items-center">
        <Logo logoFile={podbang} option={"w-64 mr-10"} />
        <h3 className="w-full text-2xl mt-8 text-gray-800 font-semibold text-center">
          회원 가입
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
              placeholder="비밀번호(영문 소문자, 숫자, 특수문자 6~20자)"
              className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:border-sky-400 border border-gray-100 transition-colors cursor-pointer"
              type="password"
              {...register("password", {
                required: "비밀번호가 필요합니다",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6})/,
                  message:
                    "비밀번호는 영문 소문자, 숫자, 특수문자 포함 6자 이상입니다",
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
          <select
            {...register("role", { required: true })}
            className="focus:outline-none cursor-pointer mt-3 px-3 py-2 border focus:border-sky-400"
          >
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"회원가입"}
          />
          {createAccountResult?.createAccount.error && (
            <FormError errorMessage={createAccountResult.createAccount.error} />
          )}
        </form>
        <div>
          이미 가입하셨나요?{" "}
          <Link to={routes.home} className="text-sky-500 hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};
