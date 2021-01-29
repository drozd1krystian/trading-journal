import React, { useEffect, useRef, useState } from "react";
import CalendarInput from "../../components/Calendar";
import MainLayout from "../../layouts/main";
import "./style.scss";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import { ReactComponent as TradeIcon } from "../../assets/trade.svg";
import Button from "../../components/Button";
import InputTag from "../../components/InputTags";
import Select from "../../components/Select";
import Input from "../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTradesStart,
  filterTrades,
  removeTradeStart,
  updateBalanceStart,
} from "../../redux/Trades/trades.actions";
import Trade from "../../components/Trade";
import Modal from "../../components/Modal";
import { showModal } from "../../redux/Modal/modal.actions";
import useModal from "../../hooks/useModal";
import useSortableData from "../../hooks/useSortableData";

const list = ["Type", "Forex", "Crypto"];

const mapState = ({ trades }) => ({
  trades: trades.filteredTrades,
  balance: trades.balance,
});

const MyTrades = (props) => {
  const [value, onChange] = useState([new Date(), new Date()]);
  const [tags, setTags] = useState([]);
  const [type, setType] = useState("");
  const [symbol, setSymbol] = useState("");
  const [side, setSide] = useState("");
  const [trade, setTrade] = useState(null);
  const { trades, balance } = useSelector(mapState);
  const { items, requestSort, sortConfig } = useSortableData(trades);
  const { show, loading, done, error } = useModal();
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
    setType("");
    setSymbol("");
    setSide("");
  };
  const handleTradeRemove = () => dispatch(removeTradeStart(trade));
  const handleModal = (trade) => {
    dispatch(showModal());
    setTrade(trade);
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

  // useEffect(() => {
  //   dispatch(updateBalanceStart(balance));
  // }, [balance]);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return "arrows";
    }
    return sortConfig.key === name
      ? `${sortConfig.direction} arrows`
      : "arrows";
  };

  return (
    <MainLayout title="Trades">
      <Modal
        show={show}
        loading={loading}
        confirm={handleTradeRemove}
        done={done}
        error={error}
        cancel={() => dispatch(showModal())}
      />
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
          <div className="col-3 mt-2 row">
            <Button handler={handleFilterSubmit}>Filter </Button>
            <Button btnStyle="btn--unstyled" handler={handleFiltersClear}>
              Clear
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <h4 className="section_title">
          <span>
            <TradeIcon className="icon-small" /> Your Trades
          </span>
        </h4>
        <div className="table_wrapper">
          <table className="table">
            <thead>
              <tr className="table_row" role="row">
                <th
                  className="table_header"
                  onClick={() => requestSort("date")}
                >
                  <button className="btn--default bold" type="button">
                    Date <span className={getClassNamesFor("date")} />
                  </button>
                </th>
                <th
                  className="table_header"
                  onClick={() => requestSort("symbol")}
                >
                  <button className="btn--default bold" type="button">
                    Symbol <span className={getClassNamesFor("symbol")} />
                  </button>
                </th>
                <th
                  className="table_header"
                  onClick={() => requestSort("type")}
                >
                  <button className="btn--default bold" type="button">
                    Type <span className={getClassNamesFor("type")} />
                  </button>
                </th>
                <th
                  className="table_header"
                  onClick={() => requestSort("side")}
                >
                  <button className="btn--default bold" type="button">
                    Side <span className={getClassNamesFor("side")} />
                  </button>
                </th>
                <th
                  className="table_header"
                  onClick={() => requestSort("quantity")}
                >
                  <button className="btn--default bold" type="button">
                    Qty <span className={getClassNamesFor("quantity")} />
                  </button>
                </th>
                <th
                  className="table_header"
                  onClick={() => requestSort("entryPrice")}
                >
                  <button className="btn--default bold" type="button">
                    Entry Price{" "}
                    <span className={getClassNamesFor("entryPrice")} />
                  </button>
                </th>
                <th
                  className="table_header"
                  onClick={() => requestSort("stopLoss")}
                >
                  <button className="btn--default bold" type="button">
                    Stop Loss <span className={getClassNamesFor("stopLoss")} />
                  </button>
                </th>
                <th className="table_header">Notes</th>
                <th className="table_header">Tags</th>
                <th className="table_header" onClick={() => requestSort("net")}>
                  <button className="btn--default bold" type="button">
                    Profit <span className={getClassNamesFor("net")} />
                  </button>
                </th>
                <th className="table_header">Options</th>
              </tr>
            </thead>
            <tbody>
              {items.map((trade) => (
                <Trade trade={trade} handler={() => handleModal(trade)} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </MainLayout>
  );
};

export default MyTrades;
