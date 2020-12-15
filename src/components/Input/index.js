import React from "react";
import "./style.scss";

const Input = ({ label, handler, placeholder, ...otherProps }) => {
  return (
    <>
      {label ? (
        <label htmlFor="label" className="label">
          {label}
        </label>
      ) : null}
      <input
        type="text"
        className="input"
        placeholder={placeholder}
        onChange={handler}
        {...otherProps}
      />
    </>
  );
};

export default Input;
