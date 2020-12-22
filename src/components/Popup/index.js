import React, { useEffect, useState } from "react";
import "./style.scss";

import { ReactComponent as CheckMark } from "../../assets/check-mark.svg";

const Popup = ({ message }) => {
  return (
    <div className="popup">
      <p className="popup_message">
        <CheckMark className="icon icon-success" /> {message}
      </p>
    </div>
  );
};

export default Popup;
