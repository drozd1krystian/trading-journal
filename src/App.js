import DailyJournal from "./pages/DailyJournal";
import Dashboard from "./pages/Dashboard";
import EditJournal from "./pages/EditJournal";
import "./sass/styles.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUserSession } from "./redux/User/user.actions";
import AuthRoute from "./hoc/AuthRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div className="dark_theme" id="app">
      <Switch>
        <AuthRoute exact path="/dashboard" component={Dashboard} />
        <AuthRoute exact path="/journal" component={DailyJournal} />
        <AuthRoute exact path="/edit-journal/:id" component={EditJournal} />

        <Route exact path="/signup" render={() => <SignUp />} />
        <Route exact path="/signin" render={() => <SignIn />} />
        <Route exact path="*">
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
