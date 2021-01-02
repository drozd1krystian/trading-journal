import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const AuthRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useSelector(mapState);
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default AuthRoute;
