import DailyJournal from "./pages/DailyJournal";
import Dashboard from "./pages/Dashboard";
import EditJournal from "./pages/EditJournal";
import "./sass/styles.scss";
import { Switch, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUserSession } from "./redux/User/user.actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="dark_theme" id="app">
      <Switch>
        <Route exact path="/dashboard" render={() => <Dashboard />}></Route>
        <Route exact path="/journal" render={() => <DailyJournal />}></Route>
        <Route
          exact
          path="/edit-journal/:id"
          render={() => <EditJournal />}
        ></Route>
        <Route exact path="/signup" render={() => <SignUp />} />
        <Route exact path="/signin" render={() => <SignIn />} />
      </Switch>
    </div>
  );
}

export default App;
