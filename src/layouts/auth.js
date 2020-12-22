import React from "react";

const AuthLayout = (props) => {
  const { children } = props;

  return (
    <div className="container mt-5">
      <div className="row row-center">
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
