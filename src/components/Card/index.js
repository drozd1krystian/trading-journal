import React from "react";
import "./style.scss";

const Card = ({ title, balance, subValue, ...otherProps }) => {
  const { children } = otherProps;

  return (
    <div className="card">
      <div className="card_body">
        <div className="row row-align-center">
          <div className="col-5 card_value">
            <p className="card_text">{title}</p>
            <p className="card_text">
              <strong>${balance}</strong>
            </p>
            <p className="card_text">{subValue}</p>
          </div>
          <div className="col-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
