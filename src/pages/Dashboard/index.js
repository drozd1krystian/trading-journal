import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import MainLayout from "../../layouts/main";
import "./style.scss";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

const mapState = ({ user, trades }) => ({
  user: user.currentUser,
  initialBalance: user.currentUser.initialBalance,
  balance: trades.balance,
  pairs: trades.balance.pairs,
});

const Dashboard = (props) => {
  const { initialBalance, balance, pairs, user } = useSelector(mapState);
  const [dailyPln, setDailyPln] = useState({
    gain: 0,
    percentage: 0,
  });
  const [monthlyGain, setMonthlyGain] = useState({
    gain: 0,
    percentage: 0,
  });
  const [yearlyGain, setYearlyGain] = useState({
    gain: 0,
    percentage: 0,
  });
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

  useEffect(() => {
    if (balance.balance.length > 1) {
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

      setDailyPln((prev) => ({
        ...prev,
        gain: balance.values[balance.values.length - 1],
        percentage: (
          (balance.values[balance.values.length - 1] /
            balance.balance[balance.balance.length - 2]) *
          100
        ).toFixed(2),
      }));

      const today = new Date();
      //const firstDay = `${today.getFullYear()}-${today.getMonth() + 1}-1`;
      const lastMonthTrade = balance.dates[balance.dates.length - 1].split("-");
      lastMonthTrade[2] = "1";
      const firstDay = lastMonthTrade.join("-");
      const firstDayIndex = balance.dates.findIndex((date) => date >= firstDay);
      const monthlyPln =
        balance.balance[balance.balance.length - 1] -
        balance.balance[firstDayIndex - 1];

      const monthlyPercentage = (
        (balance.balance[balance.balance.length - 1] /
          balance.balance[firstDayIndex - 1]) *
          100 -
        100
      ).toFixed(2);

      setMonthlySeries((prev) => [
        {
          ...prev[0],
          data: [0, 0, monthlyPln],
        },
      ]);
      setMonthlyGain((prev) => ({
        ...prev,
        gain: monthlyPln,
        percentage: monthlyPercentage,
      }));

      const thisYear = `${today.getFullYear()}-1-1`;
      const firstYearTrade = balance.dates.findIndex(
        (date) => date >= thisYear
      );

      const yearlyPln =
        firstYearTrade !== 0
          ? balance.balance[balance.balance.length - 1] -
            balance.balance[firstYearTrade - 1]
          : balance.balance[balance.balance.length - 1] - balance.balance[0];

      const yearlyPercentage = (
        (firstYearTrade !== 0
          ? balance.balance[balance.balance.length - 1] /
            balance.balance[firstYearTrade - 1]
          : balance.balance[balance.balance.length - 1] / balance.balance[0]) *
          100 -
        100
      ).toFixed(2);
      //}

      setYearlySeries((prev) => [
        {
          ...prev[0],
          data: [0, 0, yearlyPln],
        },
      ]);
      setYearlyGain((prev) => ({
        ...prev,
        gain: yearlyPln,
        percentage: yearlyPercentage,
      }));
    }
  }, [balance]);

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
      yaxis: {
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

  const [topPairs, setTopPairs] = useState([]);
  const [bottomPairs, setBottomPairs] = useState([]);

  useEffect(() => {
    const top = [];
    const bottom = [];

    const sortable = Object.entries(pairs)
      .sort(([, a], [, b]) => a.gain - b.gain)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    for (let pair in sortable) {
      if (sortable[pair].gain > 0) top.push({ pair, ...sortable[pair] });
      if (sortable[pair].gain < 0) bottom.push({ pair, ...sortable[pair] });
    }
    setTopPairs(top.slice(0, 3));
    setBottomPairs(bottom.slice(0, 3));
  }, [pairs]);

  return (
    <MainLayout title="Dashboard">
      {balance.balance.length > 1 ? (
        <>
          <div className="row">
            <div className="col-5 ">
              <Card
                title="Balance"
                balance={balance.balance[balance.balance.length - 1]}
                subValue={balance.dates[balance.dates.length - 1]}
              >
                <Chart
                  options={data.options}
                  series={barChartSeries}
                  type="bar"
                />
              </Card>
            </div>
            <div className="col-5">
              <Card
                title="Last Day Pnl"
                balance={dailyPln.gain}
                subValue={`${dailyPln.percentage}%`}
              >
                <Chart
                  options={data.options}
                  series={dailySeries}
                  type="line"
                />
              </Card>
            </div>
            <div className="col-5 ">
              <Card
                title="Pnl This Month"
                balance={monthlyGain.gain}
                subValue={`${monthlyGain.percentage}%`}
              >
                <Chart
                  options={data.options}
                  series={monthlySeries}
                  type="line"
                />
              </Card>
            </div>
            <div className="col-5">
              <Card
                title="Pnl This Year"
                balance={yearlyGain.gain}
                subValue={`${yearlyGain.percentage}%`}
              >
                <Chart
                  options={data.options}
                  series={yearlySeries}
                  type="line"
                />
              </Card>
            </div>
          </div>
          <div className="row">
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
          <div className="row mt-2">
            <div className="ticket">
              <div className="ticket_body">
                <h4 className="ticket_header">TOP PERFORMING INSTRUMENTS</h4>
                <table className="table">
                  <thead>
                    <tr className="table_row" role="row">
                      <th className="table_header">Symbol</th>
                      <th className="table_header">$</th>
                      <th className="table_header">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPairs.map((el) => (
                      <tr className="table_row" key={el.pair}>
                        <td className="table_cell">{el.pair}</td>
                        <td className="table_cell">{el.gain}</td>
                        <td className="table_cell">{el.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="ticket">
              <div className="ticket_body">
                <h4 className="ticket_header">BOTTOM PERFORMING INSTRUMENTS</h4>
                <table className="table">
                  <thead>
                    <tr className="table_row" role="row">
                      <th className="table_header">Symbol</th>
                      <th className="table_header">$</th>
                      <th className="table_header">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bottomPairs.map((el) => (
                      <tr className="table_row" key={el.pair}>
                        <td className="table_cell">{el.pair}</td>
                        <td className="table_cell">{el.gain}</td>
                        <td className="table_cell">{el.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <section className="section">
          <h4 className="section_title">
            <span>Dashboard</span>
          </h4>
          <h3 className="text-grey">Hi {user.name}!</h3>
          <p>
            To get started, please add at least <strong>one</strong> trade to
            populate your dashboard.
          </p>
          <div className="row mt-2">
            <Link to="/import">
              <Button>Import Trades</Button>
            </Link>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default Dashboard;
