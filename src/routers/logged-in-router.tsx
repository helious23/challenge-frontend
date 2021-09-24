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
import { Category } from "../pages/clients/category";
import { PodcastDetail } from "../pages/clients/podcast-detail";
import { Episode } from "../pages/clients/episode";
import { Subscriptions } from "../pages/clients/subscriptions";
import { Likes } from "../pages/clients/likes";
import { MyPodcasts } from "../pages/hosts/my-podcasts";
import { AddPodcast } from "../pages/hosts/add-podcast";
import { AddEpisode } from "../pages/hosts/add-episode";

const commonRoutes = [
  { path: routes.editProfile, component: <EditProfile /> },
  { path: routes.editPassword, component: <EditPassword /> },
];

const clientRoutes = [
  { path: routes.home, component: <Podcasts /> },
  { path: routes.search, component: <Search /> },
  { path: routes.category, component: <Category /> },
  { path: routes.podcast, component: <PodcastDetail /> },
  { path: routes.episode, component: <Episode /> },
  { path: routes.subscriptions, component: <Subscriptions /> },
  { path: routes.likes, component: <Likes /> },
];

const hostRoutes = [
  { path: routes.home, component: <MyPodcasts /> },
  { path: routes.addPodcast, component: <AddPodcast /> },
  { path: routes.addEpisode, component: <AddEpisode /> },
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="mt-64 flex justify-center items-center">
        <Logo logoFile={spinner} option={"w-32"} />
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {commonRoutes.map((route) => (
          <Route key={route.path} path={route.path} exact>
            {route.component}
          </Route>
        ))}
        {data.me.role === UserRole.Listener &&
          clientRoutes.map((route) => (
            <Route key={route.path} path={route.path} exact>
              {route.component}
            </Route>
          ))}
        {data.me.role === UserRole.Host &&
          hostRoutes.map((route) => (
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
