import React from "react";
import Card from "../../components/Card";
import "./style.scss";

const Dashboard = (props) => {
  const lastTradeDate = "on 2020-12-08";
  return (
    <div className="container">
      <div className="page_title">
        <h3>Dashboard</h3>
      </div>
      <div className="page_content">
        <div className="page_cards">
          <Card title="Balance" balance={0} subValue={lastTradeDate} />
          <Card title="Last Day Pnl" balance={0} subValue="0%" />
          <Card title="Pnl This Month" balance={0} subValue="0%" />
          <Card title="Pnl This Year" balance={0} subValue="0%" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
