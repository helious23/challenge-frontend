import { podcastsDetailQuery } from "../__generated__/podcastsDetailQuery";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IEpisodeListProps {
  podcastData: podcastsDetailQuery | undefined;
}

export const EpisodeList: React.FC<IEpisodeListProps> = ({ podcastData }) => {
  return (
    <div>
      {podcastData?.getPodcast.podcast?.episodes.map((episode) => (
        <Link
          key={episode.id}
          to={`/podcast/${podcastData.getPodcast.podcast?.id}/episode/${episode.id}`}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-700 opacity-60 font-light">
                {episode.createdAt.split("T")[0].replace(/-(.)/g, ".")}
              </div>
              <div className="mt-1 px-5">{episode.title}</div>
            </div>
            <FontAwesomeIcon
              icon={["fas", "headphones-alt"]}
              className="text-3xl text-sky-500 opacity-70"
            />
          </div>
          <div className="border-t border-gray-200 w-full mt-5"></div>
        </Link>
      ))}
    </div>
  );
};
