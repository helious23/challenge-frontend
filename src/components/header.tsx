import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import podbang from "../images/podbang.png";
import { Logo } from "./logo";
import { useMe } from "../hooks/useMe";
import { Link, useLocation } from "react-router-dom";
import routes from "../routes";
import { UserRole } from "../__generated__/globalTypes";
import { useState } from "react";
import { HostNav } from "./host-nav";
import { ClientNav } from "./client-nav";
import { SideMenu } from "./side-menu";

export const Header: React.FC = () => {
  const location = useLocation();
  const [menuClick, setMenuClick] = useState(false);

  const onMenuClick = () => {
    setMenuClick((current) => !current);
  };

  let pathName = "";
  pathName = location.pathname;
  const { data: userData } = useMe();

  return (
    <>
      <header className="pt-2 px-2 lg:border-b lg:border-gray-200 fixed top-0 w-full bg-white z-10 opacity-90">
        <div className="w-full mx-auto flex justify-between items-center">
          <Link to={routes.home}>
            <Logo logoFile={podbang} option={"w-40 cursor-pointer"} />
          </Link>
          <div className="flex justify-center items-center">
            <Link to={routes.editProfile}>
              <div className="mx-3 border border-sky-400 py-1.5 px-4 text-sm text-sky-500 rounded-3xl cursor-pointer hidden sm:block">
                {userData?.me.email
                  ? `${userData.me.email.split("@")[0]} 님`
                  : "로그인"}
              </div>
            </Link>
            {userData?.me.role === UserRole.Listener && (
              <Link to={routes.search}>
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-2xl mx-3 cursor-pointer"
                />
              </Link>
            )}
            <div onClick={onMenuClick}>
              <FontAwesomeIcon
                icon={faBars}
                className="text-2xl mx-3 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="lg:flex lg:justify-center lg:items-start lg:relative lg:-top-10 lg:-mb-7 lg:mx-64">
          <div className="mt-1 md:mt-0 lg:w-96 flex justify-evenly items-center border-b border-gray-200 lg:border-transparent">
            {userData?.me.role === UserRole.Listener ? (
              <ClientNav pathName={pathName} />
            ) : (
              <HostNav pathName={pathName} />
            )}
          </div>
        </div>
      </header>
      <SideMenu menuClick={menuClick} onMenuClick={onMenuClick} />
    </>
  );
};
