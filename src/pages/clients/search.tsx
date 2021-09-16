import { PageTitle } from "../../components/page-title";
import { useForm } from "react-hook-form";
import routes from "../../routes";
import { useHistory } from "react-router-dom";
import { FormError } from "../../components/form-error";

interface IFormProps {
  searchTerm: string;
}

export const Search = () => {
  const { register, handleSubmit, formState } = useForm<IFormProps>();
  const history = useHistory();

  const onSearchSubmit = (data: IFormProps) => {
    const { searchTerm } = data;
    history.push({
      pathname: routes.search,
      search: `?term=${searchTerm}`,
    });
  };
  return (
    <div>
      <PageTitle title={"검색"} />
      <form
        className="w-full mt-32 lg:mt-24 flex items-center justify-center flex-col"
        onSubmit={handleSubmit(onSearchSubmit)}
      >
        <input
          {...register("searchTerm", {
            required: "검색어를 입력해 주세요",
            minLength: {
              value: 2,
              message: "검색어는 최소 두글자 이상입니다",
            },
          })}
          className="max-w-md lg:max-w-4xl w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:border-sky-400 border border-gray-100 transition-colors cursor-pointer"
          type="search"
          placeholder="검색어를 입력하세요"
        />
        {formState.errors.searchTerm?.message && (
          <FormError errorMessage={formState.errors.searchTerm?.message} />
        )}
      </form>
    </div>
  );
};
