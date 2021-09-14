import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Logo } from "../pages/logo";
import spinner from "../images/spinner.svg";
import { meQuery } from "../__generated__/meQuery";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserRole } from "../__generated__/globalTypes";
import routes from "../routes";
import { Header } from "../components/header";
import { NotFound } from "../pages/404";
import { Podcasts } from "../pages/clients/podcasts";
import { useMe } from "../hooks/useMe";

const clientRoutes = [{ path: routes.home, component: <Podcasts /> }];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="mt-64 flex justify-center items-center">
        <Logo logoFile={spinner} option={"w-64 mr-10"} />
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
