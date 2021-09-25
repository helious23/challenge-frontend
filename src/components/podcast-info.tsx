import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { UserRole } from "../__generated__/globalTypes";

interface IPodcastInfoProps {
  categoryName: string | null | undefined;
  podcastTitle: string | null | undefined;
  creator?: string | undefined;
  subscriber?: number | null | undefined;
  likes?: number | null | undefined;
  description: string | null | undefined;
}

export const PodcastInfo: React.FC<IPodcastInfoProps> = ({
  categoryName,
  podcastTitle,
  creator,
  subscriber,
  likes,
  description,
}) => {
  const { data: userData } = useMe();
  return (
    <div>
      {userData?.me.role === UserRole.Listener ? (
        <Link to={`/category/${categoryName}`}>
          <div className="text-sky-500 text-md font-semibold">
            # {categoryName}
          </div>
        </Link>
      ) : (
        <div className="text-sky-500 text-md font-semibold">
          # {categoryName}
        </div>
      )}
      <div className="text-xl lg:text-2xl font-bold">{podcastTitle}</div>
      <div className="text-gray-600 opacity-50 text-sm mt-0.5">
        {creator && creator.split("@")[0]}
      </div>
      <div className="mt-2">
        <span className="text-gray-600 opacity-80 text-sm mr-1">구독자</span>
        <span className="text-gray-600  text-sm">{subscriber}</span>
        <span className="mx-2 text-gray-600 opacity-80 text-sm">·</span>
        <span className="text-gray-600 opacity-80 text-sm mr-1">좋아요</span>
        <span className="text-gray-600  text-sm">{likes}</span>
      </div>
      <div className="mt-4 text-gray-600 opacity-90 text-base lg:text-md">
        {description}
      </div>
    </div>
  );
};
