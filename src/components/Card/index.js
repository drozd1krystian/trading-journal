import React from "react";
import "./style.scss";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card_body">
        <div className="card_col">
          <p className="card_text">Balance</p>
          <p className="card_text">
            <strong>$0</strong>
          </p>
          <p className="card_text">on 2020/12/07</p>
        </div>
        <div className="card_col">
          <h2>Chart</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
