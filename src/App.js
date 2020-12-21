import DailyJournal from "./pages/DailyJournal";
import Dashboard from "./pages/Dashboard";
import EditJournal from "./pages/EditJournal";
import "./sass/styles.scss";
import { Switch, Route } from "react-router-dom";

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
      </Switch>
    </div>
  );
}

export default App;
