import React from "react";
import "./style.scss";
import Avatar from "../Avatar";

import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import DropDownMenu from "../DropDownMenu";
import { useDispatch, useSelector } from "react-redux";
import { signOutStart } from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Navbar = (props) => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(signOutStart());
  };

  const settingsList = [
    { link: "/user", title: "Account & Fees" },
    { link: "/goals", title: "Trading Goals" },
  ];
  const userList = [
    { link: "/user", title: "User Settings" },
    { link: "/signin", title: "Sign Out", action: signOutUser },
  ];

  return (
    <nav className="menu">
      <ul className="links list-unstyled">
        <li className="link">
          <SettingsIcon className="link_icon-big" />
          <DropDownMenu list={settingsList} />
        </li>
        <li className="link">
          <Avatar data={currentUser} />
          <DropDownMenu list={userList} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
