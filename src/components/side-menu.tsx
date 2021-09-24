import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import routes from "../routes";
import { UserRole } from "../__generated__/globalTypes";
import { useMe } from "../hooks/useMe";
import { logUserOut } from "../apollo";

interface ISideMenuProps {
  menuClick: boolean;
  onMenuClick: () => void;
}

export const SideMenu: React.FC<ISideMenuProps> = ({
  menuClick,
  onMenuClick,
}) => {
  const { data: userData } = useMe();

  return (
    <>
      <div
        className={`transition duration-700 ease-in-out ${
          menuClick
            ? "w-full h-full z-30 fixed top-0 left-0 opacity-60 bg-black"
            : ""
        }`}
      >
        <div onClick={onMenuClick} className="w-10/12 h-full"></div>
      </div>
      <div>
        <div
          className={
            menuClick
              ? "h-full w-56 fixed top-0 right-0 z-30 bg-white"
              : "hidden"
          }
        >
          <div className="flex w-full my-10 justify-center items-center cursor-default">
            <div className="flex justify-center items-center">
              <div className="text-sky-500 mr-1">
                {userData?.me.email.split("@")[0]}
              </div>
              님 반갑습니다
              <div className="text-xs text-sky-500 ml-1">
                <FontAwesomeIcon icon={["fas", "music"]} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center bg-gray-100 py-2">
            <div
              className="text-sm mr-5 font-light hover:text-sky-600 transition-colors"
              onClick={onMenuClick}
            >
              <Link to={routes.editProfile}>프로필 수정</Link>
            </div>
            <div className="text-xs">|</div>
            <div
              className="text-sm ml-5 font-light hover:text-sky-600 transition-colors"
              onClick={onMenuClick}
            >
              <Link to={routes.editPassword}>비밀번호 수정</Link>
            </div>
          </div>
          {userData?.me.role === UserRole.Listener ? (
            <div className="grid grid-cols-3 grid-rows-2 mt-5 justify-items-center items-center">
              <div className="mx-1 my-4">
                <div className="flex-col group" onClick={onMenuClick}>
                  <Link to={routes.home}>
                    <div className="flex justify-center items-center">
                      <FontAwesomeIcon
                        icon={["fas", "home"]}
                        className="text-3xl text-gray-500 group-hover:text-sky-500 transition-colors"
                      />
                    </div>
                    <div className="text-center text-sm group-hover:text-sky-500 transition-colors text-gray-700 font-light mt-1">
                      홈
                    </div>
                  </Link>
                </div>
              </div>
              <div className="mx-1 my-2">
                <div className="flex-col group">
                  <div className="flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={["fas", "trophy"]}
                      className="text-3xl text-amber-500 group-hover:text-sky-500 transition-colors"
                    />
                  </div>
                  <div className="text-center text-sm group-hover:text-sky-500 transition-colors text-gray-700 font-light mt-1">
                    순위
                  </div>
                </div>
              </div>
              <div className="mx-1 my-2">
                <div className="flex-col group" onClick={onMenuClick}>
                  <Link to={routes.subscriptions}>
                    <div className="flex justify-center items-center">
                      <FontAwesomeIcon
                        icon={["fas", "podcast"]}
                        className="text-3xl text-purple-500 group-hover:text-sky-500 transition-colors"
                      />
                    </div>
                    <div className="text-center text-sm group-hover:text-sky-500 transition-colors text-gray-700 font-light mt-1">
                      구독
                    </div>
                  </Link>
                </div>
              </div>
              <div className="mx-1 my-2">
                <div className="flex-col group" onClick={onMenuClick}>
                  <Link to={routes.likes}>
                    <div className="flex justify-center items-center">
                      <FontAwesomeIcon
                        icon={["fas", "heart"]}
                        className="text-3xl text-red-500 group-hover:text-sky-500 transition-colors"
                      />
                    </div>
                    <div className="text-center text-sm group-hover:text-sky-500 transition-colors text-gray-700 font-light mt-1">
                      좋아요
                    </div>
                  </Link>
                </div>
              </div>
              <div className="mx-1 my-2">
                <div className="flex-col group" onClick={onMenuClick}>
                  <Link to={routes.search}>
                    <div className="flex justify-center items-center">
                      <FontAwesomeIcon
                        icon={["fas", "search"]}
                        className="text-3xl group-hover:text-sky-500 transition-colors"
                      />
                    </div>
                    <div className="text-center text-sm group-hover:text-sky-500 transition-colors text-gray-700 font-light mt-1">
                      검색
                    </div>
                  </Link>
                </div>
              </div>
              <div className="mx-1 my-2">
                <div className="flex-col group" onClick={onMenuClick}>
                  <Link to={`/category/교양`}>
                    <div className="flex justify-center items-center">
                      <FontAwesomeIcon
                        icon={["fas", "list-ul"]}
                        className="text-3xl group-hover:text-sky-500 transition-colors text-pink-800"
                      />
                    </div>
                    <div className="text-center text-sm group-hover:text-sky-500 transition-colors text-gray-700 font-light mt-1">
                      카테고리
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center mt-6">
              <div className="mx-1 my-5">
                <div className="flex-col group" onClick={onMenuClick}>
                  <Link to={routes.home}>
                    <div className="flex justify-center items-center">
                      <FontAwesomeIcon
                        icon={["fas", "home"]}
                        className="text-3xl text-gray-500 group-hover:text-sky-500 transition-colors"
                      />
                    </div>
                    <div className="text-sm group-hover:text-sky-500 transition-colors text-gray-700 font-light mt-2">
                      <div>나의 팟캐스트</div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="my-2 ml-5">
                <div className="flex-col group" onClick={onMenuClick}>
                  <Link to={routes.addPodcast}>
                    <div className="flex justify-center items-center">
                      <FontAwesomeIcon
                        icon={["far", "plus-square"]}
                        className="text-3xl group-hover:text-sky-500 transition-colors text-pink-800"
                      />
                    </div>
                    <div className="text-sm group-hover:text-sky-500 transition-colors text-gray-700 font-light mt-2">
                      <div>팟캐스트 등록</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
          <div
            className="flex w-full my-10 justify-center items-center cursor-pointer"
            onClick={() => logUserOut()}
          >
            <div className="rounded-3xl py-2 px-2 w-6/12 text-center mx-3 bg-gray-100 text-gray-700 text-sm hover:bg-white border border-transparent hover:border-gray-300 hover:text-gray-400">
              로그아웃
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
