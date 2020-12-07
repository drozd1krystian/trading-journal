import React from "react";
import "./style.scss";
import Navbar from "../Navbar";

const Header = (props) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header_content">
          <h2 className="logo">TradeJournal</h2>
          <Navbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
