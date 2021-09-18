import { useParams, Link } from "react-router-dom";
import gql from "graphql-tag";
import { CATEGORY_FRAGMENT, PODCAST_FRAGMENT } from "../../fragment";
import { useQuery } from "@apollo/client";
import { category, categoryVariables } from "../../__generated__/category";
import { useState } from "react";
import { PageTitle } from "../../components/page-title";
import { Podcast } from "../../components/podcast";
import { Pagination } from "../../components/pagination";
import { Logo } from "../../components/logo";
import spinner from "../../images/spinner.svg";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      podcasts {
        ...PodcastParts
      }
      category {
        categoryCount
      }
    }
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
  slug: string;
}

export const Category = () => {
  const [page, setPage] = useState(1);
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  const { slug } = useParams<ICategoryParams>();
  const { data, loading } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          slug,
          page,
        },
      },
    }
  );

  return (
    <div className="mt-40 lg:mt-32">
      <PageTitle title={slug} />
      {loading ? (
        <div className="max-w-lg md:max-w-4xl mx-auto">
          <div className="mb-5 text-xl lg:text-2xl font-bold mx-8 mt-10">
            카테고리
          </div>
          <div className="flex justify-start ml-5 overflow-x-scroll scrollbar-hide">
            {data?.allCategories.categories?.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.name}`}
                className="cursor-pointer transform hover:-translate-y-2 transition-transform mt-2 mr-2 min-w-max"
              >
                <div
                  className={`mt-1 text-md text-center font-light py-1 px-2 rounded-lg ${
                    category.name === slug
                      ? "bg-sky-500 text-gray-50"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {category.name}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-20 flex justify-center items-center">
            <Logo logoFile={spinner} option={"w-32"} />
          </div>
        </div>
      ) : (
        <div className="max-w-lg md:max-w-4xl mx-auto">
          <div className="mb-5 text-xl lg:text-2xl font-bold mx-8 mt-10">
            카테고리
          </div>
          <div className="flex justify-start ml-5 overflow-x-scroll scrollbar-hide">
            {data?.allCategories.categories?.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.name}`}
                className="cursor-pointer transform hover:-translate-y-2 transition-transform mt-2 mr-2 min-w-max"
              >
                <div
                  className={`mt-1 text-md text-center font-light py-1 px-2 rounded-lg ${
                    category.name === slug
                      ? "bg-sky-500 text-gray-50"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {category.name}
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-between items-center mx-8 mt-10">
            <div className="cursor-default">
              <span className="text-xl text-sky-400">
                {data?.category.category?.categoryCount}
              </span>{" "}
              <span className="text-gray-500">개의 팟캐스트</span>
            </div>
            <div></div>
            <div>
              <Pagination
                onNextPageClick={onNextPageClick}
                onPrevPageClick={onPrevPageClick}
                page={page}
                totalPages={data?.category.totalPages!}
              />
            </div>
          </div>
          <div className="max-w-screen-xl mx-auto pb-20">
            <div className="grid md:grid-cols-4 gap-5 mt-5 mb-16">
              {data?.category.podcasts?.map((podcast) => (
                <Podcast
                  key={podcast.id}
                  id={podcast.id}
                  coverImg={podcast.coverImg}
                  title={podcast.title}
                  description={podcast.description!}
                  categoryName={podcast.category?.name}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
