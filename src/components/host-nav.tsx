import { Link } from "react-router-dom";
import routes from "../routes";

interface IHostNavProps {
  pathName: string;
}

export const HostNav: React.FC<IHostNavProps> = ({ pathName }) => {
  return (
    <>
      <Link to={routes.home}>
        <div
          className={`hover:font-bold text-gray-700 cursor-pointer text-lg lg:text-xl font-medium border-b-4 border-transparent px-2 lg:mx-0 ${
            pathName === routes.home
              ? "text-sky-500 border-sky-500 transition-colors pb-1 lg:pb-0 lg:border-transparent"
              : ""
          }`}
        >
          나의 팟캐스트
        </div>
      </Link>
      <Link to={routes.addPodcast}>
        <div
          className={`hover:font-bold text-gray-700 cursor-pointer text-lg lg:text-xl font-medium border-b-4 border-transparent px-2 lg:mx-0 ${
            pathName === routes.addPodcast
              ? "text-sky-500 border-sky-500 transition-colors pb-1 lg:pb-0 lg:border-transparent"
              : ""
          }`}
        >
          팟캐스트 등록
        </div>
      </Link>
    </>
  );
};
