import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import MainLayout from "../../layouts/main";
import "./style.scss";
import Chart from "react-apexcharts";

import { series } from "./data";

const Dashboard = (props) => {
  const lastTradeDate = "on 2020-12-08";
  const [chartData, setChartData] = useState([]);
  const [balance, setBalance] = useState([]);

  const data = {
    options: {
      colors: ["#00E396"],
      stroke: {
        curve: "smooth",
      },
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      fill: {
        colors: ["#40BC90"],
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        x: {
          show: false,
        },
      },
    },
    series: [
      {
        name: "Balance",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  const lineChart = {
    options: {
      chart: {
        id: "Balance",
        type: "area",
      },
      fill: {
        colors: ["#00E396"],
      },
      stroke: {
        curve: "smooth",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#00E396"],
      annotations: {
        yaxis: [
          {
            y: 40,
            borderColor: "#00E396",
            label: {
              borderColor: "#00E396",
              style: {
                color: "#fff",
                background: "#00E396",
              },
              text: `Initial Balance: ${40}`,
            },
          },
        ],
      },
      grid: {
        show: true,
        borderColor: "#47515d",
      },
    },
    labels: series.monthDataSeries1.dates,

    series: [
      {
        name: "Balance",
        data: series.monthDataSeries1.prices,
      },
    ],
    xaxis: {
      type: "datetime",
    },
  };

  return (
    <MainLayout title="Dashboard">
      <div className="row">
        <div className="col-5 ">
          <Card title="Balance" balance={0} subValue={lastTradeDate}>
            <Chart
              options={data.options}
              series={data.series}
              type="bar"
              width="100%"
              height="100%"
            />
          </Card>
        </div>
        <div className="col-5 ">
          <Card title="Last Day Pnl" balance={0} subValue="0%">
            <Chart
              options={data.options}
              series={data.series}
              type="line"
              width="100%"
              height="100%"
            />
          </Card>
        </div>
        <div className="col-5 ">
          <Card title="Pnl This Month" balance={0} subValue="0%">
            <Chart
              options={data.options}
              series={data.series}
              type="line"
              width="100%"
              height="100%"
            />
          </Card>
        </div>
        <div className="col-5">
          <Card title="Pnl This Year" balance={0} subValue="0%">
            <Chart
              options={data.options}
              series={data.series}
              type="line"
              width="100%"
              height="100%"
            />
          </Card>
        </div>
      </div>
      <div className="row ">
        <div className="balance">
          <h4>PLN EVOLUTION FOR ACCOUNT</h4>
          <div className="chart">
            <Chart
              options={lineChart.options}
              series={lineChart.series}
              labels={lineChart.labels}
              xaxis={lineChart.xaxis}
              type="area"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
