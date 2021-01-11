import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const mapState = ({ user }) => ({
  isLoading: user.isLoading,
});

const LoggingIn = ({ show, message }) => {
  const { isLoading } = useSelector(mapState);
  return (
    <>
      {isLoading ? (
        <div className="loader_wrap">
          <div className="loader">
            <div className="loader_icon"></div>
            <div className="loader_message">
              <p>Logging in...</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LoggingIn;
