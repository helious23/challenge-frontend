import { useState } from "react";
import gql from "graphql-tag";
import { PODCAST_FRAGMENT } from "../../fragment";
import { useQuery } from "@apollo/client";
import { PageTitle } from "../../components/page-title";
import { Logo } from "../../components/logo";
import spinner from "../../images/spinner.svg";
import { Pagination } from "../../components/pagination";
import { Podcast } from "../../components/podcast";
import {
  myPodcasts,
  myPodcastsVariables,
} from "../../__generated__/myPodcasts";
import { NoPodcast } from "./no-podcast";

export const MY_PODCASTS_QUERY = gql`
  query myPodcasts($input: MyPodcastsInput!) {
    myPodcasts(input: $input) {
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

export const MyPodcasts = () => {
  const [page, setPage] = useState(1);

  const { data, loading } = useQuery<myPodcasts, myPodcastsVariables>(
    MY_PODCASTS_QUERY,
    {
      variables: {
        input: {
          page,
        },
      },
    }
  );

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  return (
    <div className="mt-32 lg:mt-24">
      <PageTitle title={"나의 팟캐스트"} />
      {data?.myPodcasts.totalResults === 0 ? (
        <NoPodcast />
      ) : loading ? (
        <div className="mt-64 flex justify-center items-center">
          <Logo logoFile={spinner} option={"w-32"} />
        </div>
      ) : (
        <>
          <div className="mt-8 pb-20 max-w-lg md:max-w-4xl mx-auto">
            <div className="mx-10 mt-10 mb-5 flex justify-between">
              <div className="text-xl lg:text-2xl font-bold">나의 팟캐스트</div>
              <div>
                <Pagination
                  page={page}
                  totalPages={data?.myPodcasts.totalPages}
                  onNextPageClick={onNextPageClick}
                  onPrevPageClick={onPrevPageClick}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-4 gap-3 mb-16">
              {data?.myPodcasts.podcasts?.map((podcast) => (
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
        </>
      )}
    </div>
  );
};
