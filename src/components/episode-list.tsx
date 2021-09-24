import { podcastsDetailQuery_getPodcast_podcast_episodes } from "../__generated__/podcastsDetailQuery";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMe } from "../hooks/useMe";
import { UserRole } from "../__generated__/globalTypes";

interface IEpisodeListProps {
  episodes: podcastsDetailQuery_getPodcast_podcast_episodes[] | undefined;
  id: number | undefined;
}

export const EpisodeList: React.FC<IEpisodeListProps> = ({ episodes, id }) => {
  const { data: userData } = useMe();
  return (
    <div>
      {episodes &&
        episodes
          .map((episode) => (
            <Link
              key={episode.id}
              to={
                userData?.me.role === UserRole.Listener
                  ? `/podcast/${id}/episode/${episode.id}`
                  : `/podcast/${id}/edit-episode/${episode.id}`
              }
            >
              <div className="flex justify-between items-center group">
                <div className="mt-3">
                  <div className="text-sm text-gray-700 opacity-60 font-light">
                    {episode.createdAt.split("T")[0].replace(/-()/g, ".")}
                  </div>
                  <div className="mt-1 mx-2 text-gray-700 font-normal">
                    {episode.title}
                  </div>
                </div>
                {userData?.me.role === UserRole.Listener ? (
                  <FontAwesomeIcon
                    icon={["fas", "headphones-alt"]}
                    className="text-3xl text-sky-400 opacity-70 ml-3 mt-5 group-hover:text-sky-600 transform group-hover:-translate-y-2 transition-transform "
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={["far", "edit"]}
                    className="text-3xl text-sky-400 opacity-70 ml-3 mt-5 group-hover:text-sky-600 transform group-hover:-translate-y-2 transition-transform "
                  />
                )}
              </div>
              <div className="border-t border-gray-200 w-full mt-5"></div>
            </Link>
          ))
          .reverse()}
    </div>
  );
};
