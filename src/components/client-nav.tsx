import { Link } from "react-router-dom";
import routes from "../routes";

interface IClientNavProps {
  pathName: string;
}

export const ClientNav: React.FC<IClientNavProps> = ({ pathName }) => {
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
          홈
        </div>
      </Link>
      <Link to={routes.myFeeds}>
        <div
          className={`hover:font-bold text-gray-700 cursor-pointer text-lg lg:text-xl font-medium border-b-4 border-transparent px-2 lg:mx-0 ${
            pathName === routes.myFeeds
              ? "text-sky-500 border-sky-500 transition-colors pb-1 lg:pb-0 lg:border-transparent"
              : ""
          }`}
        >
          피드
        </div>
      </Link>
      <Link to={routes.subscriptions}>
        <div
          className={` hover:font-bold text-gray-700 cursor-pointer text-lg lg:text-xl font-medium border-b-4 border-transparent px-2 lg:mx-0 text-center ${
            pathName === routes.subscriptions
              ? "text-sky-500  border-sky-500 transition-colors pb-1 lg:pb-0 lg:border-transparent text-center"
              : ""
          }`}
        >
          구독
        </div>
      </Link>
      <Link to={routes.likes}>
        <div
          className={` hover:font-bold text-gray-700 cursor-pointer text-lg lg:text-xl font-medium border-b-4 border-transparent px-2 lg:mx-0 text-center ${
            pathName === routes.likes
              ? "text-sky-500  border-sky-500 transition-colors pb-1 lg:pb-0 lg:border-transparent text-center"
              : ""
          }`}
        >
          좋아요
        </div>
      </Link>
      <Link to={routes.search}>
        <div
          className={` hover:font-bold text-gray-700 cursor-pointer text-lg lg:text-xl font-medium border-b-4 border-transparent px-2 lg:mx-0 text-center ${
            pathName === routes.search
              ? "text-sky-500  border-sky-500 transition-colors pb-1 lg:pb-0 lg:border-transparent text-center"
              : ""
          }`}
        >
          검색
        </div>
      </Link>
      <Link to={`/category/교양`}>
        <div
          className={` hover:font-bold text-gray-700 cursor-pointer text-lg lg:text-xl font-medium border-b-4 border-transparent px-2 lg:mx-0 text-center ${
            pathName.includes("/category")
              ? "text-sky-500  border-sky-500 transition-colors pb-1 lg:pb-0 lg:border-transparent text-center"
              : ""
          }`}
        >
          카테고리
        </div>
      </Link>{" "}
    </>
  );
};
