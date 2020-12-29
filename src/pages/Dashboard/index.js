import React from "react";
import Card from "../../components/Card";
import MainLayout from "../../layouts/main";
import "./style.scss";

const Dashboard = (props) => {
  const lastTradeDate = "on 2020-12-08";
  return (
    <MainLayout title="Dashboard">
      <div className="row">
        <div className="col-5 ">
          <Card title="Balance" balance={0} subValue={lastTradeDate} />
        </div>
        <div className="col-5 ">
          <Card title="Last Day Pnl" balance={0} subValue="0%" />
        </div>
        <div className="col-5 ">
          <Card title="Pnl This Month" balance={0} subValue="0%" />
        </div>
        <div className="col-5">
          <Card title="Pnl This Year" balance={0} subValue="0%" />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
