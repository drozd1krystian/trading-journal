import DailyJournal from "./pages/DailyJournal";
import Dashboard from "./pages/Dashboard";
import EditJournal from "./pages/EditJournal";
import "./sass/styles.scss";
import { Switch, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div className="dark_theme" id="app">
      <Switch>
        <Route exact path="/" render={() => <Dashboard />}></Route>
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
