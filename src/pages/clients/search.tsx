import { PageTitle } from "../../components/page-title";
import { useForm } from "react-hook-form";
import routes from "../../routes";
import { useHistory, Link, useLocation } from "react-router-dom";
import { FormError } from "../../components/form-error";
import { Categories } from "../../components/categories";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "@apollo/client";
import { searchCategoryQuery } from "../../__generated__/searchCategoryQuery";
import { promotionPodcastQuery } from "../../__generated__/promotionPodcastQuery";
import { PROMOTION_PODCAST } from "./podcasts";
import { CATEGORY_FRAGMENT, PODCAST_FRAGMENT } from "../../fragment";
import spinner from "../../images/spinner.svg";
import {
  searchPodcasts,
  searchPodcastsVariables,
} from "../../__generated__/searchPodcasts";
import { useEffect, useState } from "react";
import { Logo } from "../../components/logo";
import { Podcast } from "../../components/podcast";
import { Pagination } from "../../components/pagination";

interface IFormProps {
  searchTerm: string;
}

const SEARCH_PODCASTS_QUERY = gql`
  query searchPodcasts($input: SearchPodcastsInput!) {
    searchPodcasts(input: $input) {
      ok
      error
      totalPages
      totalResults
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

const SEARCH_CATEGORY_QUERY = gql`
  query searchCategoryQuery {
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

export const Search = () => {
  const { register, handleSubmit, formState } = useForm<IFormProps>();
  const history = useHistory();
  const location = useLocation();
  const [callQuery, { data: searchingData, loading: searchingLoading }] =
    useLazyQuery<searchPodcasts, searchPodcastsVariables>(
      SEARCH_PODCASTS_QUERY
    );

  const query = location.search.split("?term=")[1];

  const [page, setPage] = useState(1);
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  useEffect(() => {
    if (query) {
      callQuery({
        variables: {
          input: {
            titleQuery: query,
            page,
          },
        },
      });
    }
  }, [callQuery, query, page]);

  const { data: promotionData } =
    useQuery<promotionPodcastQuery>(PROMOTION_PODCAST);

  const { data, loading } = useQuery<searchCategoryQuery>(
    SEARCH_CATEGORY_QUERY
  );

  const onSearchSubmit = (data: IFormProps) => {
    const { searchTerm } = data;
    history.push({
      pathname: routes.search,
      search: `?term=${searchTerm}`,
    });
  };

  return (
    <div className="mt-20 lg:mt-20 h-full">
      <PageTitle title={query ? query : "검색"} />
      {loading ? (
        <div className="mt-64 flex justify-center items-center">
          <Logo logoFile={spinner} option={"w-32"} />
        </div>
      ) : !query ? (
        <>
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
          <div className="max-w-lg md:max-w-4xl mx-auto mb-20">
            <div className="mb-5 text-xl lg:text-2xl font-bold mx-5 mt-10">
              지금 가장 인기있는 팟캐스트
            </div>
            {promotionData?.promotionPocasts.results?.map((podcast, index) => (
              <div key={index} className={`flex items-center justify-center`}>
                <Link to={`/podcast/${podcast.id}`}>
                  <div
                    className={`bg-gray-${
                      (index % 2) * 2 + 1
                    }00 text-gray-700 font-normal text-sm rounded-2xl py-2 px-4 mt-2 cursor-pointer transform hover:-translate-y-1 transition-transform`}
                  >
                    # {podcast.title}
                  </div>
                </Link>
              </div>
            ))}
            <div className="mb-5 text-xl lg:text-2xl font-bold mx-5 mt-10">
              카테고리별 채널
            </div>
            <div
              className={
                "flex justify-start overflow-x-auto lg:justify-around scrollbar-hide"
              }
            >
              {data?.allCategories.categories?.map((category) => (
                <Categories
                  id={category.id}
                  key={category.id}
                  name={category.name}
                  coverImg={category.coverImg}
                  slug={category.slug}
                />
              ))}
            </div>
          </div>
        </>
      ) : searchingLoading ? (
        <div className="mt-64 flex flex-col justify-center items-center">
          <Logo logoFile={spinner} option={"w-32  mt-10"} />
          <div className="text-lg text-">
            <span className="text-sky-600 font-bold mt-20">{query}</span> 검색
            중입니다...
          </div>
        </div>
      ) : (
        <div className="max-w-lg md:max-w-4xl mx-auto">
          <div className="mt-40 lg:mt-32">
            {searchingData?.searchPodcasts.totalResults &&
            searchingData?.searchPodcasts.totalResults > 0 ? (
              <div className="flex flex-col justify-center items-center lg:block">
                <div className="text-3xl mb-3">
                  <span className="text-sky-500">"{query}"</span> 검색결과
                </div>
                <div className="mt-5 flex justify-between items-center w-10/12 lg:w-full">
                  <div className="text-base">
                    총{" "}
                    <span className="text-sky-500">
                      {searchingData?.searchPodcasts.totalResults}
                    </span>{" "}
                    개의 팟캐스트를 찾았습니다
                  </div>
                  <div>
                    <Pagination
                      page={page}
                      totalPages={searchingData?.searchPodcasts.totalPages}
                      onNextPageClick={onNextPageClick}
                      onPrevPageClick={onPrevPageClick}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-64 flex flex-col items-center justify-center">
                <h2 className="font-semibold text-2xl mb-3 mt-10">
                  팟캐스트를 찾을 수 없습니다
                </h2>
                <h4 className="font-medium text-base mb-5">
                  <span className="text-sky-500">"{query}"</span> 관련된
                  팟캐스트를 찾지 못했습니다
                </h4>
                <Link
                  className="hover:underline text-sky-600"
                  to={routes.search}
                >
                  검색 화면으로 돌아가기 &rarr;
                </Link>
              </div>
            )}
          </div>
          <div className="grid md:grid-cols-4 gap-5 mb-16 mt-10">
            {searchingData?.searchPodcasts.podcasts?.map((podcast) => (
              <Podcast
                key={podcast.id}
                id={podcast.id}
                title={podcast.title}
                coverImg={podcast.coverImg}
                categoryName={podcast.category?.name}
                description={podcast.description!}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
