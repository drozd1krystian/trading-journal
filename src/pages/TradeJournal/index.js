import React, { useEffect, useRef, useState } from "react";
import CalendarInput from "../../components/Calendar";
import MainLayout from "../../layouts/main";
import "./style.scss";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import Button from "../../components/Button";
import InputTag from "../../components/InputTags";
import Select from "../../components/Select";
import Input from "../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTradesStart,
  filterTrades,
} from "../../redux/Trades/trades.actions";
import Trade from "../../components/Trade";

const list = ["Type", "Forex", "Crypto"];

const mapState = ({ trades }) => ({
  trades: trades.filteredTrades,
});

const MyTrades = (props) => {
  const [value, onChange] = useState([new Date(), new Date()]);
  const [tags, setTags] = useState([]);
  const [type, setType] = useState("");
  const [symbol, setSymbol] = useState("");
  const [side, setSide] = useState("");
  const { trades } = useSelector(mapState);
  const dispatch = useDispatch();

  const onTypeChange = (newType) => setType(newType);
  const onSideChange = (newSide) => setSide(newSide);

  const handleTagsInput = (arr) => setTags(arr);

  const handleFilterSubmit = () => {
    const filters = {
      date: value,
      tags,
      type: type === "Type" ? "" : type.value,
      side: side === "Side" ? "" : side,
      symbol,
    };
    dispatch(filterTrades(filters));
  };

  const handleFiltersClear = () => {
    onChange([new Date(), new Date()]);
    setTags([]);
  };

  useEffect(() => {
    const filters = {
      date: value,
      tags,
      type,
      side,
      symbol,
    };
    if (trades.length === 0) dispatch(fetchTradesStart(filters));
  }, []);

  return (
    <MainLayout title="Trades">
      <section className="section">
        <h4 className="section_title">
          <CalendarIcon className="icon-small" />
          <span>Filter</span>
        </h4>
        <div className="row">
          <div className="col-2">
            <CalendarInput
              value={value}
              onChange={onChange}
              selectRange={true}
              returnValue="range"
            />
          </div>
          <div className="col-3">
            <InputTag
              defaultTags={tags}
              onChange={handleTagsInput}
              limit={3}
              defaultPick="Type"
            />
          </div>

          <div className="col-1">
            <Select list={list} handler={onTypeChange} defaultPick="Type" />
          </div>
          <div className="col-1">
            <Select
              list={["Side", "Buy", "Sell"]}
              handler={onSideChange}
              defaultPick="Side"
            />
          </div>
          <div className="col-2">
            <Input
              placeholder="Eg. GBPUSD"
              handler={(e) => setSymbol(e.target.value.toUpperCase())}
              value={symbol}
            />
          </div>
          <div className="col-2 mt-2 row">
            <Button handler={handleFilterSubmit}>Filter </Button>
            <Button btnStyle="btn--unstyled" handler={handleFiltersClear}>
              Clear
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <h4 className="section_title">
          <span>Your Trades</span>
        </h4>
        <div className="table_wrapper">
          <table className="table">
            <thead>
              <tr className="table_row" role="row">
                <th className="table_header">Date</th>
                <th className="table_header">Symbol</th>
                <th className="table_header">Type</th>
                <th className="table_header">Side</th>
                <th className="table_header">Qty</th>
                <th className="table_header">Entry Price</th>
                <th className="table_header">Stop Loss</th>
                <th className="table_header">Notes</th>
                <th className="table_header">Tags</th>
                <th className="table_header">Profit</th>
                <th className="table_header">Options</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <Trade trade={trade} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </MainLayout>
  );
};

export default MyTrades;
