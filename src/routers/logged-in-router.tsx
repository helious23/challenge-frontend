import { Logo } from "../components/logo";
import spinner from "../images/spinner.svg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserRole } from "../__generated__/globalTypes";
import routes from "../routes";
import { Header } from "../components/header";
import { NotFound } from "../pages/404";
import { Podcasts } from "../pages/clients/podcasts";
import { Search } from "../pages/clients/search";
import { useMe } from "../hooks/useMe";
import { EditProfile } from "../pages/user/edit-profile";
import { EditPassword } from "../pages/user/edit-password";

const clientRoutes = [
  { path: routes.home, component: <Podcasts /> },
  { path: routes.editProfile, component: <EditProfile /> },
  { path: routes.editPassword, component: <EditPassword /> },
  { path: routes.search, component: <Search /> },
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="mt-64 flex justify-center items-center">
        <Logo logoFile={spinner} option={"w-32 mr-10"} />
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === UserRole.Listener &&
          clientRoutes.map((route) => (
            <Route key={route.path} path={route.path} exact>
              {route.component}
            </Route>
          ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
