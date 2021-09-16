import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import podbang from "../images/podbang.png";
import { Logo } from "./logo";
import { useMe } from "../hooks/useMe";
import { Link, useLocation } from "react-router-dom";
import routes from "../routes";

export const Header: React.FC = () => {
  const location = useLocation();
  let pathName = "";
  pathName = location.pathname;
  const { data } = useMe();
  return (
    <header className="pt-2 px-1 lg:border-b lg:border-gray-200 fixed top-0 w-full bg-white z-10">
      <div className="w-full mx-auto flex justify-between items-center">
        <Link to={routes.home}>
          <Logo logoFile={podbang} option={"w-40 cursor-pointer"} />
        </Link>
        <div className="flex justify-center items-center">
          <Link to={routes.editProfile}>
            <div className="mr-5 border border-sky-400 py-1.5 px-4 text-sm text-sky-500 rounded-3xl cursor-pointer hidden lg:block">
              {data?.me.email ? `${data.me.email} 님` : "로그인"}
            </div>
          </Link>
          <Link to={routes.search}>
            <FontAwesomeIcon
              icon={faSearch}
              className="text-2xl mr-5 cursor-pointer"
            />
          </Link>
          <FontAwesomeIcon
            icon={faBars}
            className="text-2xl mr-5 cursor-pointer"
          />
        </div>
      </div>
      <div className="lg:flex lg:justify-center lg:items-start lg:relative lg:-top-10 lg:-mb-7 lg:mx-64">
        <div className="mt-1 md:mt-0 flex justify-between items-center border-b border-gray-200 lg:border-transparent w-full overflow-y-auto">
          <Link to={routes.home}>
            <div
              className={`hover:font-bold text-gray-700 cursor-pointer text-lg font-medium border-b-4 border-transparent ${
                pathName === routes.home
                  ? "text-sky-500  border-sky-500 transition-colors px-2 pb-1 lg:pb-0 lg:border-transparent"
                  : "px-2"
              }`}
            >
              홈
            </div>
          </Link>
          <div className=" hover:font-bold text-gray-700 cursor-pointer text-lg font-medium border-b-4 border-transparent text-center">
            순위
          </div>
          <div className=" hover:font-bold text-gray-700 cursor-pointer text-lg font-medium border-b-4 border-transparent text-center">
            매거진
          </div>
          <div className=" hover:font-bold text-gray-700 cursor-pointer text-lg font-medium border-b-4 border-transparent text-center">
            오디오북
          </div>
          <Link to={routes.search}>
            <div
              className={` hover:font-bold text-gray-700 cursor-pointer text-lg font-medium border-b-4 border-transparent text-center ${
                pathName === routes.search
                  ? "text-sky-500  border-sky-500 transition-colors px-2 pb-1 lg:pb-0 lg:border-transparent text-center"
                  : "px-2"
              }`}
            >
              검색
            </div>
          </Link>
          <div className="mr-4 hover:font-bold text-gray-700 cursor-pointer text-lg font-medium border-b-4 border-transparent text-center">
            카테고리
          </div>
        </div>
      </div>
    </header>
  );
};