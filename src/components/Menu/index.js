import React, { useState } from "react";
import "./style.scss";

import DropDownMenu from "../DropDownMenu";

import { ReactComponent as Dashboard } from "../../assets/dashboard.svg";
import { ReactComponent as Calendar } from "../../assets/calendar.svg";
import { ReactComponent as Report } from "../../assets/blocks.svg";
import { ReactComponent as Import } from "../../assets/import.svg";
import { ReactComponent as Arrow } from "../../assets/arrow-down.svg";
import { Link } from "react-router-dom";

const journalLinks = [
  { link: "/journal", title: "Daily Journal" },
  { link: "/journal-trades", title: "Invidual Trade Journal" },
];

const reportsLinks = [{ link: "/mytrades", title: "My Trades" }];

const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subMenu, setSubMenu] = useState({
    0: false,
    1: false,
  });

  const handleSubMenu = (id) => {
    setSubMenu((prev) => ({
      ...prev,
      [id]: !subMenu[id],
    }));
  };

  return (
    <nav className="menu menu-sub bg-dark">
      <div className="container">
        <div className="row">
          <div className="burger" onClick={() => setIsOpen(!isOpen)}>
            <div className="line line-1"></div>
            <div className="line line-2"></div>
            <div className="line line-3"></div>
          </div>
          <ul
            className={
              "links " +
              `${isOpen ? "active " : ""}` +
              `${subMenu[0] || subMenu[1] ? "auto " : ""}`
            }
          >
            <Link to="/" className="link">
              <Dashboard className="link_icon" /> Dashboard
            </Link>

            <li className="link">
              <div className="link_header" onClick={() => handleSubMenu(0)}>
                <Calendar className="link_icon" />
                Journal <Arrow className="icon-small mobile-arrow" />
              </div>
              <DropDownMenu list={journalLinks} isOpen={subMenu[0]} />
            </li>
            <li className="link">
              <div className="link_header" onClick={() => handleSubMenu(1)}>
                <Report className="link_icon" />
                Reports <Arrow className="icon-small mobile-arrow" />
              </div>
              <DropDownMenu list={reportsLinks} isOpen={subMenu[1]} />
            </li>
            <Link to={{ pathname: "/import" }} className="link">
              <Import className="link_icon" />
              Import
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
