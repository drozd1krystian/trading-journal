import React from "react";
import "./style.scss";

const Button = ({ value, handler, btnStyle }) => {
  return (
    <button className={`btn ` + btnStyle} onClick={handler}>
      {value}
    </button>
  );
};

export default Button;
