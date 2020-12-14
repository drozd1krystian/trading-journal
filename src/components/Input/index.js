import React from "react";
import "./style.scss";

const Input = ({ label, handler, ...otherProps }) => {
  return (
    <>
      {label ? <label htmlFor="label" className="label"></label> : null}
      <input
        type="text"
        className="input"
        placeholder="Search your journal"
        onChange={handler}
        {...otherProps}
      />
    </>
  );
};

export default Input;
