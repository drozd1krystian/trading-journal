import DailyJournal from "./pages/DailyJournal";
import Dashboard from "./pages/Dashboard";
import EditJournal from "./pages/EditJournal";
import "./sass/styles.scss";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUserSession, isLoading } from "./redux/User/user.actions";
import AuthRoute from "./hoc/AuthRoute";
import LoggingIn from "./components/Loaders/LoggingIn";
import LoadingScreen from "./components/Loaders/LoadingScreen";
import { AnimatePresence } from "framer-motion";
import Popup from "./components/Popup";
import TradeJournal from "./pages/TradeJournal";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(isLoading());
    dispatch(checkUserSession());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="app" id="app">
      <LoadingScreen />
      <LoggingIn />
      <Popup />
      <AnimatePresence>
        <Switch location={location}>
          <AuthRoute exact path="/dashboard" component={Dashboard} />
          <AuthRoute exact path="/journal" component={DailyJournal} />
          <AuthRoute exact path="/edit-journal/:id" component={EditJournal} />
          <AuthRoute exact path="/journal-trades" component={TradeJournal} />

          <Route exact path="/signup" render={() => <SignUp />} />
          <Route exact path="/signin" render={() => <SignIn />} />
          <Route exact path="*">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
