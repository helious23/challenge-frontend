import { PageTitle } from "../../components/page-title";
import { Logo } from "../../components/logo";
import spinner from "../../images/spinner.svg";
import gql from "graphql-tag";
import { EPISODE_FRAGMENT, PODCAST_FRAGMENT } from "../../fragment";
import { useQuery } from "@apollo/client";
import { NoSubscription } from "./no-subscription";
import { myFeeds } from "../../__generated__/myFeeds";
import { FeedSlider } from "../../components/feed-slider";

export const MY_FEED_QUERY = gql`
  query myFeeds {
    myFeeds {
      ok
      error
      podcasts {
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

export const MyFeeds = () => {
  const { data, loading } = useQuery<myFeeds>(MY_FEED_QUERY);

  return (
    <div className="mt-32 lg:mt-28 mx-5">
      <PageTitle title={"구독중인 팟캐스트"} />
      {data?.myFeeds.podcasts?.length === 0 ? (
        <NoSubscription />
      ) : loading ? (
        <div className="mt-64 flex justify-center items-center">
          <Logo logoFile={spinner} option={"w-32"} />
        </div>
      ) : (
        <div>
          <div className="max-w-lg md:max-w-4xl mx-auto">
            <div className="text-xl lg:text-2xl font-bold">
              새로 업데이트된 에피소드
            </div>
            <div className="mb-32">
              {data?.myFeeds.podcasts?.map((podcast, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center lg:block"
                >
                  <div className="mt-10 text-xl text-gray-700 font-normal">
                    {podcast.title}
                  </div>
                  <div className="w-10/12 lg:w-full h-40">
                    <FeedSlider
                      episodes={podcast.episodes}
                      podcastId={podcast.id}
                      coverImg={podcast.coverImg}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
