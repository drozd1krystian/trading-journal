import React from "react";
import "./style.scss";

import DropDownMenu from "../DropDownMenu";

import { ReactComponent as Dashboard } from "../../assets/dashboard.svg";
import { ReactComponent as Calendar } from "../../assets/calendar.svg";
import { ReactComponent as Report } from "../../assets/blocks.svg";
import { ReactComponent as Import } from "../../assets/import.svg";

const journalLinks = [
  { link: "/journal", title: "Daily Journal" },
  { link: "/journal-trades", title: "Invidual Trade Journal" },
];

const reportsLinks = [{ link: "/mytrades", title: "My Trades" }];

const Menu = (props) => {
  return (
    <nav className="menu menu-sub bg-dark">
      <div className="container">
        <ul className="links">
          <li className="link">
            <Dashboard className="link_icon" /> Dashboard
          </li>
          <li className="link">
            <Calendar className="link_icon" />
            Journal
            <DropDownMenu list={journalLinks} />
          </li>
          <li className="link">
            <Report className="link_icon" />
            Reports
            <DropDownMenu list={reportsLinks} />
          </li>
          <li className="link">
            <Import className="link_icon" />
            Import
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
