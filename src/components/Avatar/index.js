import React from "react";
import "./style.scss";
import { ReactComponent as DefaultUser } from "../../assets/user.svg";

const Avatar = ({ data }) => {
  return (
    <div className="user">
      <DefaultUser className="user_photo" />
      <p className="user_name">{data.firstName}</p>
    </div>
  );
};

export default Avatar;
