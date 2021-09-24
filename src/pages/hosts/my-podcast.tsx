import { useParams, Link, useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { PageTitle } from "../../components/page-title";
import { useState } from "react";
import { EPISODE_FRAGMENT, PODCAST_FRAGMENT } from "../../fragment";
import { myPodcast, myPodcastVariables } from "../../__generated__/myPodcast";
import { Logo } from "../../components/logo";
import spinner from "../../images/spinner.svg";
import { PodcastInfo } from "../../components/podcast-info";
import { EpisodeList } from "../../components/episode-list";

export const MY_PODCAST_QUERY = gql`
  query myPodcast($input: MyPodcastInput!) {
    myPodcast(input: $input) {
      ok
      error
      podcast {
        ...PodcastParts
        episodes {
          ...EpisodeParts
        }
      }
    }
  }
  ${PODCAST_FRAGMENT}
  ${EPISODE_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const MyPodcast = () => {
  const { id } = useParams<IParams>();
  const [page, setPage] = useState(1);
  const {
    data: podcastData,
    loading,
    error,
  } = useQuery<myPodcast, myPodcastVariables>(MY_PODCAST_QUERY, {
    variables: {
      input: {
        id: +id,
      },
    },
  });

  const history = useHistory();
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  return (
    <div className="mt-32 lg:mt-24">
      <PageTitle
        title={podcastData?.myPodcast.podcast?.title || "나의 팟캐스트"}
      />
      {loading ? (
        <div className="mt-64 flex justify-center items-center">
          <Logo logoFile={spinner} option={"w-32"} />
        </div>
      ) : (
        <>
          <div className="md:max-w-5xl mx-auto">
            <div className="flex flex-col items-start justify-center lg:flex-row lg:items-start lg:justify-start lg:w-full">
              <div className="flex items-center justify-center w-full lg:w-2/5">
                <img
                  src={podcastData?.myPodcast.podcast?.coverImg}
                  alt={podcastData?.myPodcast.podcast?.title}
                  className="w-40 h-40 lg:w-52 lg:h-52 m-3 rounded-md bg-cover bg-center shadow-xl"
                />
              </div>
              <div className="mt-5 px-4 w-full mx-auto">
                <PodcastInfo
                  categoryName={podcastData?.myPodcast.podcast?.category?.name}
                  podcastTitle={podcastData?.myPodcast.podcast?.title}
                  description={podcastData?.myPodcast.podcast?.description}
                />
                <div className="mt-5 flex justify-start items-center">
                  <div>에피소드 등록하기</div>
                  <div>프로모션 구매하기</div>
                </div>
                <div className="mt-5 w-full mb-32">
                  <div>
                    {podcastData?.myPodcast.podcast?.episodes.length === 0 ? (
                      <div>에피소드를 등록하세요!</div>
                    ) : (
                      <EpisodeList
                        id={podcastData?.myPodcast.podcast?.id}
                        episodes={podcastData?.myPodcast.podcast?.episodes}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
