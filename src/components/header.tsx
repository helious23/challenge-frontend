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
    <header className="pt-2 px-2 lg:border-b lg:border-gray-200 fixed top-0 w-full bg-white z-10 opacity-90">
      <div className="w-full mx-auto flex justify-between items-center">
        <Link to={routes.home}>
          <Logo logoFile={podbang} option={"w-40 cursor-pointer"} />
        </Link>
        <div className="flex justify-center items-center">
          <Link to={routes.editProfile}>
            <div className="mx-3 border border-sky-400 py-1.5 px-4 text-sm text-sky-500 rounded-3xl cursor-pointer hidden sm:block">
              {data?.me.email ? `${data.me.email.split("@")[0]} 님` : "로그인"}
            </div>
          </Link>
          <Link to={routes.search}>
            <FontAwesomeIcon
              icon={faSearch}
              className="text-2xl mx-3 cursor-pointer"
            />
          </Link>
          <FontAwesomeIcon
            icon={faBars}
            className="text-2xl mx-3 cursor-pointer"
          />
        </div>
      </div>
      <div className="lg:flex lg:justify-center lg:items-start lg:relative lg:-top-10 lg:-mb-7 lg:mx-64">
        <div className="mt-1 md:mt-0 lg:w-96 flex justify-between items-center border-b border-gray-200 lg:border-transparent">
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
          <div className="hover:font-bold text-gray-700 cursor-pointer text-lg lg:text-xl font-medium border-b-4 border-transparent px-2 lg:mx-0 text-center">
            순위
          </div>
          <div className="hover:font-bold text-gray-700 cursor-pointer text-lg lg:text-xl font-medium border-b-4 border-transparent px-2 lg:mx-0 text-center">
            매거진
          </div>
          <div className="hover:font-bold text-gray-700 cursor-pointer text-lg lg:text-xl font-medium border-b-4 border-transparent px-2 lg:mx-0 text-center">
            오디오북
          </div>
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
          </Link>
        </div>
      </div>
    </header>
  );
};
