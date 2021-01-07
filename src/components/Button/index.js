import React from "react";
import "./style.scss";

const Button = ({ handler, btnStyle, ...otherProps }) => {
  const { children } = otherProps;
  return (
    <button className={`btn ` + btnStyle} onClick={handler}>
      {children}
    </button>
  );
};

export default Button;
