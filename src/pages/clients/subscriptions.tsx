import { PageTitle } from "../../components/page-title";
import { Logo } from "../../components/logo";
import spinner from "../../images/spinner.svg";
import { Podcast } from "../../components/podcast";
import gql from "graphql-tag";
import { PODCAST_FRAGMENT } from "../../fragment";
import { useQuery } from "@apollo/client";
import { mySubscriptions } from "../../__generated__/mySubscriptions";
import { NoSubscription } from "./no-subscription";

export const MY_SUBSCRIPTIONS_QUERY = gql`
  query mySubscriptions {
    mySubscriptions {
      ok
      error
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const Subscriptions = () => {
  const { data, loading } = useQuery<mySubscriptions>(MY_SUBSCRIPTIONS_QUERY);

  return (
    <div className="mt-32 lg:mt-28 mx-5">
      <PageTitle title={"구독중인 팟캐스트"} />
      {data?.mySubscriptions.podcasts?.length === 0 ? (
        <NoSubscription />
      ) : loading ? (
        <div className="mt-64 flex justify-center items-center">
          <Logo logoFile={spinner} option={"w-32"} />
        </div>
      ) : (
        <div>
          <div className="max-w-lg md:max-w-4xl mx-auto">
            <div className="text-xl lg:text-2xl font-bold">
              구독중인 팟캐스트
            </div>
            <div className="grid md:grid-cols-4 gap-3 mb-16">
              {data?.mySubscriptions.podcasts !== null &&
                data?.mySubscriptions.podcasts.map((podcast) => (
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
      )}
    </div>
  );
};
