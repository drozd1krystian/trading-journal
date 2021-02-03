import React from "react";
import "./style.scss";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header_content">
          <Link to="/dashboard">
            <h2 className="logo">TradeJournal</h2>
          </Link>
          <Navbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
