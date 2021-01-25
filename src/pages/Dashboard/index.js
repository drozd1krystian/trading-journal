import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import MainLayout from "../../layouts/main";
import "./style.scss";
import Chart from "react-apexcharts";

import { series } from "./data";
import { useSelector } from "react-redux";

const mapState = ({ user, trades }) => ({
  initialBalance: user.currentUser.initialBalance,
  balance: trades.balance,
});

const Dashboard = (props) => {
  const lastTradeDate = "on 2020-12-08";
  const { initialBalance, balance } = useSelector(mapState);
  const [dailySeries, setDailySeries] = useState([
    {
      name: "Daily Pln",
      data: [0, 0],
    },
  ]);
  const [monthlySeries, setMonthlySeries] = useState([
    {
      name: "Monthly Pln",
      data: [0, 0],
    },
  ]);

  const [yearlySeries, setYearlySeries] = useState([
    {
      name: "Yearly Pln",
      data: [0, 0],
    },
  ]);

  // To do:
  // Calculate monthly gain
  // Calculate yearly gain

  useEffect(() => {
    setDailySeries((prev) => {
      const arr = Array(balance.balance.length - 1).fill(0);
      arr.push(balance.values[balance.values.length - 1]);
      return [
        {
          ...prev[0],
          data: [...arr],
        },
      ];
    });

    const today = new Date();
    const firstDay = `${today.getFullYear()}-${today.getMonth() + 1}-1`;
    const firstDayIndex = balance.dates.findIndex((date) => date >= firstDay);
    const monthlyPln = balance.values
      .slice(firstDayIndex)
      .reduce((acc, val) => parseFloat(acc) + parseFloat(val));
    setMonthlySeries((prev) => [
      {
        ...prev[0],
        data: [0, 0, monthlyPln],
      },
    ]);

    const thisYear = `${today.getFullYear()}-1-1`;
    const firstYearTrade = balance.dates.findIndex((date) => date >= thisYear);
    const yearlyPln = balance.values
      .slice(firstYearTrade)
      .reduce((acc, val) => parseFloat(acc) + parseFloat(val));

    setYearlySeries((prev) => [
      {
        ...prev[0],
        data: [0, 0, yearlyPln],
      },
    ]);
  }, []);

  const data = {
    options: {
      colors: ["#00E396"],
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
        tooltip: {
          enabled: false,
        },
      },
      fill: {
        colors: ["#40BC90"],
      },
      stroke: {
        width: [1],
        curve: "smooth",
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
  };

  const lineChart = {
    options: {
      chart: {
        id: "Balance",
        type: "area",
      },
      fill: {
        colors: ["#00E396", "#44BADC"],
        type: ["gradient", "solid"],
      },
      stroke: {
        curve: "smooth",
        width: [2, 0],
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        labels: {
          colors: "#fff",
        },
      },
      colors: ["#00E396", "#44BADC"],
      annotations: {
        yaxis: [
          {
            y: initialBalance,
            borderColor: "#00E396",
            label: {
              borderColor: "#00E396",
              style: {
                color: "#fff",
                background: "#00E396",
              },
              text: `Initial Balance: ${initialBalance}`,
            },
          },
        ],
      },
      grid: {
        show: true,
        borderColor: "#47515d",
      },
      labels: balance.dates,
      xaxis: {
        type: "datetime",
        labels: {
          show: true,
          rotate: 0,
          trim: false,
          tickPlacement: "between",
          style: {
            colors: "#aab8c5",
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-xaxis-label",
          },
          format: "dd/MM/yyyy",
        },
      },
      yaxis: {
        type: "numeric",
        title: {
          text: "$",
          style: {
            color: "#aab8c5",
          },
        },
        labels: {
          show: true,
          rotate: 0,
          style: {
            colors: "#aab8c5",
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-xaxis-label",
          },
        },
      },
      y: {
        formatter: undefined,
        title: {
          formatter: (value) => `${value}`,
        },
      },
    },

    series: [
      {
        name: "Balance",
        data: balance.balance,
      },
      dailySeries[0],
    ],
  };

  const barChartSeries = [
    {
      name: "Balance",
      data: balance.balance,
    },
  ];

  return (
    <MainLayout title="Dashboard">
      <div className="row">
        <div className="col-5 ">
          <Card title="Balance" balance={0} subValue={lastTradeDate}>
            <Chart options={data.options} series={barChartSeries} type="bar" />
          </Card>
        </div>
        <div className="col-5 ">
          <Card title="Last Day Pnl" balance={0} subValue="0%">
            <Chart options={data.options} series={dailySeries} type="line" />
          </Card>
        </div>
        <div className="col-5 ">
          <Card title="Pnl This Month" balance={0} subValue="0%">
            <Chart options={data.options} series={monthlySeries} type="line" />
          </Card>
        </div>
        <div className="col-5">
          <Card title="Pnl This Year" balance={0} subValue="0%">
            <Chart options={data.options} series={yearlySeries} type="line" />
          </Card>
        </div>
      </div>
      <div className="row ">
        <div className="balance">
          <h4 className="balance_header">PLN EVOLUTION FOR ACCOUNT</h4>
          <div className="chart">
            <Chart
              options={lineChart.options}
              series={lineChart.series}
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
