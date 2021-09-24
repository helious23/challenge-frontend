import { useParams, Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { PageTitle } from "../../components/page-title";
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
  const { data: podcastData, loading } = useQuery<
    myPodcast,
    myPodcastVariables
  >(MY_PODCAST_QUERY, {
    variables: {
      input: {
        id: +id,
      },
    },
  });

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
                <div className="mt-10 flex justify-center items-center">
                  <Link to={`/add-podcast/${id}/add-episode`}>
                    <div className=" mx-3 lg:mx-10 px-4 py-2 bg-sky-500 font-white rounded-3xl text-white cursor-pointer hover:opacity-70 transition-opacity">
                      에피소드 등록
                    </div>
                  </Link>
                  <div className=" mx-3 lg:mx-10 px-4 py-2 bg-sky-500 font-white rounded-3xl text-white cursor-pointer hover:opacity-70 transition-opacity">
                    프로모션 구매
                  </div>
                </div>
                <div className="mt-10 w-full mb-32">
                  <div>
                    {podcastData?.myPodcast.podcast?.episodes.length === 0 ? (
                      <div className="flex flex-col justify-center items-center">
                        <h2 className="font-semibold text-2xl mb-3 mt-10">
                          등록된 에피소드가 없습니다
                        </h2>
                        <h4 className="font-medium text-base mb-5">
                          다채로운 에피소드를 등록하세요!
                        </h4>
                      </div>
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
