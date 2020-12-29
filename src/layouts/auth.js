import React from "react";
import { Link } from "react-router-dom";

const AuthLayout = (props) => {
  const { children } = props;

  return (
    <div className="container">
      <div className="row row-center mt-5 ">
        <div className="col-4">
          <div className="form">
            <h3 className="form_logo text-center">TradeJournal</h3>
            <div className="form_body bg-dark">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
