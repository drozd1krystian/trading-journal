import React from "react";
import "./style.scss";
import Avatar from "../Avatar";

import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import DropDownMenu from "../DropDownMenu";

const Navbar = (props) => {
  const data = {
    name: "User",
  };

  const settingsList = [
    { link: "/user", title: "Account & Fees" },
    { link: "/goals", title: "Trading Goals" },
  ];
  const userList = [
    { link: "/user", title: "User Settings" },
    { link: "/", title: "Logout" },
  ];

  return (
    <nav className="side_menu">
      <ul className="links">
        <li className="link">
          <i className="link-icon">
            <SettingsIcon className="side_menu-icon" />
          </i>
          <DropDownMenu list={settingsList} />
        </li>
        <li className="link">
          <Avatar data={data} />
          <DropDownMenu list={userList} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
