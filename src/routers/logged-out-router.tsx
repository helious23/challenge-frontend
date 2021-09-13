import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "../pages/login";
import { CreateAccount } from "../pages/create-account";
import routes from "../routes";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={routes.createAccount}>
          <CreateAccount />
        </Route>
        <Route path={routes.home}>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};
