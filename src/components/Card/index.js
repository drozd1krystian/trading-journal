import React from "react";
import "./style.scss";

const Card = ({ title, balance, subValue, ...otherProps }) => {
  const { children } = otherProps;

  return (
    <div className="card">
      <div className="card_body">
        <div className="card_col">
          <p className="card_text">{title}</p>
          <p className="card_text">
            <strong>${balance}</strong>
          </p>
          <p className="card_text">{subValue}</p>
        </div>
        <div className="card_col">{children}</div>
      </div>
    </div>
  );
};

export default Card;
