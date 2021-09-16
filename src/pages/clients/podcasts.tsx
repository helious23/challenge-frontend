import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { PageTitle } from "../../components/page-title";
import { Categories } from "../../components/categories";
import { Podcast } from "../../components/podcast";

import "../../styles/slick/slick.css";
import "../../styles/slick/slick-theme.css";
import { PromitionSlider } from "../../components/slider";
import {
  podcastsPageQuery,
  podcastsPageQueryVariables,
} from "../../__generated__/podcastsPageQuery";
import { useState } from "react";
import { Pagination } from "../../components/pagination";
import { promotionPodcastQuery } from "../../__generated__/promotionPodcastQuery";

const PODCASTS_QUERY = gql`
  query podcastsPageQuery($input: PodcastsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        categoryCount
      }
    }
    podcasts(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        title
        coverImg
        category {
          name
        }
        description
      }
    }
  }
`;

const PROMOTION_PODCAST = gql`
  query promotionPodcastQuery {
    promotionPocasts {
      ok
      error
      results {
        id
        title
        promotionImg
      }
    }
  }
`;

export const Podcasts = () => {
  const [page, setPage] = useState(1);

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  const { data: promotionData } =
    useQuery<promotionPodcastQuery>(PROMOTION_PODCAST);

  console.log(promotionData);

  const { data } = useQuery<podcastsPageQuery, podcastsPageQueryVariables>(
    PODCASTS_QUERY,
    {
      variables: {
        input: {
          page,
        },
      },
    }
  );

  return (
    <div className="mt-20 lg:mt-20 h-full">
      <PageTitle title={"국내 최대 팟캐스트 컨텐츠"} />
      <div className="lg:mx-10">
        <PromitionSlider results={promotionData?.promotionPocasts.results} />
      </div>
      <div className="max-w-screen-xl mx-auto mt-8 pb-20">
        <div className="max-w-lg md:max-w-4xl mx-auto">
          <div className="mb-5 text-xl lg:text-2xl font-bold mx-5">
            카테고리별 채널
          </div>
          <div
            className={
              "flex justify-start overflow-x-auto md:justify-around scrollbar-hide"
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
          <div className="mx-5 mt-10 mb-5 flex justify-between">
            <div className="text-xl lg:text-2xl font-bold">인기 팟캐스트</div>
            <div>
              <Pagination
                page={page}
                totalPages={data?.podcasts.totalPages}
                onNextPageClick={onNextPageClick}
                onPrevPageClick={onPrevPageClick}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-x-5 gap-y-10 mb-16">
            {data?.podcasts.results?.map((podcast) => (
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
      </div>
    </div>
  );
};
