import { PageTitle } from "../../components/page-title";
import { Logo } from "../../components/logo";
import spinner from "../../images/spinner.svg";
import { Podcast } from "../../components/podcast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { PODCAST_FRAGMENT } from "../../fragment";
import { useQuery } from "@apollo/client";
import { myLikes } from "../../__generated__/myLikes";

export const MY_LIKES_QUERY = gql`
  query myLikes {
    myLikes {
      ok
      error
      likes {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const Likes = () => {
  const { data, loading } = useQuery<myLikes>(MY_LIKES_QUERY);

  return (
    <div className="mt-32 lg:mt-28 mx-5">
      <PageTitle title={"좋아요"} />
      {loading ? (
        <div className="mt-64 flex justify-center items-center">
          <Logo logoFile={spinner} option={"w-32"} />
        </div>
      ) : (
        <div>
          <div className="max-w-lg md:max-w-4xl mx-auto">
            <div className="text-xl lg:text-2xl font-bold flex items-center">
              <div className="mr-2">좋아요</div>
              <FontAwesomeIcon
                icon={["far", "heart"]}
                className="text-red-400"
              />
            </div>
            <div className="grid md:grid-cols-4 gap-3 mb-16">
              {data?.myLikes.likes !== null &&
                data?.myLikes.likes.map((podcast) => (
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
