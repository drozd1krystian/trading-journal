import React from "react";
import Card from "../../components/Card";
import "./style.scss";

const Dashboard = (props) => {
  return (
    <div className="container">
      <div className="page_title">
        <h3>Dashboard</h3>
        <select name="" id="">
          <option value="">Elo</option>
          <option value="">Elo</option>
        </select>
      </div>
      <div className="page_content">
        <div className="page_cards">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
