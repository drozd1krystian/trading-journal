import React, { useRef, useState } from "react";
import "./style.scss";
import Avatar from "../Avatar";

import { useDispatch, useSelector } from "react-redux";
import { signOutStart } from "../../redux/User/user.actions";
import { Link } from "react-router-dom";
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import { ReactComponent as LogoutIcon } from "../../assets/logout.svg";
import useDetectOutsideClick from "../../hooks/useDetectOutsideClick";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Navbar = (props) => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const listRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useDetectOutsideClick(listRef, setIsOpen);

  const signOutUser = () => {
    dispatch(signOutStart());
  };

  return (
    <nav className="menu">
      <ul className="links list-unstyled" ref={listRef}>
        <li className="link" onClick={() => setIsOpen(!isOpen)}>
          <Avatar data={currentUser} />
          <ul
            className={
              "dropdown list-unstyled " + `${isOpen ? "dropdown--open" : ""}`
            }
          >
            <li className="dropdown_item">
              <Link to="/user" className="dropdown_link">
                <SettingsIcon className="icon-small" /> User Settings
              </Link>
            </li>
            <li className="dropdown_item" onClick={signOutUser}>
              <Link to="/signin" className="dropdown_link">
                <LogoutIcon className="icon-small" /> Sign Out
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
