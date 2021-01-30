import React, { useEffect, useState } from "react";
import "./style.scss";
import MainLayout from "../../layouts/main";
import { ReactComponent as ExportIcon } from "../../assets/export.svg";
import Input from "../../components/Input";
import InputTags from "../../components/InputTags";
import CalendarInput from "../../components/Calendar";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addTradeStart,
  updateBalanceStart,
} from "../../redux/Trades/trades.actions";
import Select from "../../components/Select";
import { useParams } from "react-router-dom";

const mapState = ({ trades }) => ({
  balance: trades.balance,
  trades: trades.trades,
});

const AddTrade = () => {
  const [value, onChange] = useState(new Date());
  const [tags, setTags] = useState({
    arr: [],
    error: false,
  });
  const [side, setSide] = useState("Buy");
  const [symbol, setSymbol] = useState("");
  const [type, setType] = useState({
    value: "",
    error: false,
  });
  const [quantity, setQuantity] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [net, setNet] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [notes, setNotes] = useState("");
  const { balance, trades } = useSelector(mapState);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleTagsChange = (newTags) =>
    setTags((prev) => ({ ...prev, arr: [...newTags].sort(), error: false }));

  const onTypeChange = (newType) =>
    setType((prev) => ({ ...prev, value: newType, error: false }));

  const validateNumber = (value) => {
    return isNaN(value) || value < 0 ? 0 : value;
  };

  const validateProfit = (value) => {
    return isNaN(value) ? 0 : value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tags.arr.length === 0) {
      setTags((prev) => ({ ...prev, error: true }));
      return;
    }

    if (type.value === "") {
      setType((prev) => ({ ...prev, error: true }));
      return;
    }
    const trade = {
      date: value,
      tags: tags.arr,
      side,
      symbol,
      quantity: validateNumber(quantity),
      entryPrice: validateNumber(entryPrice),
      exitPrice: validateNumber(exitPrice),
      stopLoss: validateNumber(stopLoss),
      net: validateProfit(net),
      imgUrl,
      notes,
      type: type.value,
    };

    dispatch(addTradeStart({ trade, id }));
    clearForm();
  };

  const clearForm = () => {
    setSide("Buy");
    setStopLoss("");
    setSymbol("");
    setTags({
      arr: [],
      error: false,
    });
    setQuantity("");
    setEntryPrice("");
    setImgUrl("");
    setExitPrice("");
    setStopLoss("");
    setNotes("");
    setNet("");
  };

  useEffect(() => {
    dispatch(updateBalanceStart(balance));
  }, [balance]);

  useEffect(() => {
    if (id) {
      const trade = trades.find((el) => el.id === id);
      setSide(trade.side);
      setStopLoss(trade.stopLoss);
      setSymbol(trade.symbol);
      setTags((prev) => ({ ...prev, arr: [...trade.tags] }));
      setQuantity(trade.quantity);
      setEntryPrice(trade.entryPrice);
      setImgUrl(trade.imgUrl);
      setExitPrice(trade.exitPrice);
      setStopLoss(trade.stopLoss);
      setNotes(trade.notes);
      setNet(trade.net);
      setType((prev) => ({
        ...prev,
        value: trade.type,
      }));
    } else {
      clearForm();
    }
  }, [id]);

  return (
    <MainLayout title="Add Trade">
      <section className="section">
        <h4 className="section_title">
          <ExportIcon className="icon-small" />
          <span>Manual Entry</span>
        </h4>
        <p>
          Use this form to insert your trades manually. Mandatory fields are
          marked with *.
        </p>
        <div className="col-12 mt-1">
          <form className="add_form" onSubmit={handleSubmit}>
            <div className="col-10">
              <label className="label">Trade Side *:</label>
              <div className="row">
                <div className="radio">
                  <input
                    type="radio"
                    name="trade_side"
                    className="radio"
                    id="radio_buy"
                    defaultChecked
                    onClick={() => setSide("Buy")}
                  />
                  <label className="radio_label" htmlFor="radio_buy">
                    Buy
                  </label>
                </div>
                <div className="radio">
                  <input
                    type="radio"
                    name="trade_side"
                    id="radio_sell"
                    className="radio"
                    onClick={() => setSide("Sell")}
                  />
                  <label className="radio_label" htmlFor="radio_sell">
                    Sell
                  </label>
                </div>
              </div>
            </div>
            <div className="col-10">
              <Input
                label="Symbol *:"
                placeholder="Eg. EURUSD"
                handler={(e) => setSymbol(e.target.value.toUpperCase())}
                required
                value={symbol}
              />
            </div>
            <div className="col-10">
              <label className="label">Type *:</label>
              <Select
                list={["Forex", "Crypto"]}
                selected={type.value}
                handler={onTypeChange}
              />
            </div>
            <div className="col-10">
              <Input
                label="Quanitity *:"
                handler={(e) => setQuantity(e.target.value)}
                required
                value={quantity}
              />
            </div>
            <div className="col-10">
              <label className="label">Date *:</label>
              <CalendarInput
                value={value}
                onChange={onChange}
                showDate={true}
              />
              required
            </div>
            <div className="col-10">
              <Input
                label="Entry Price *:"
                handler={(e) => setEntryPrice(e.target.value)}
                required
                value={entryPrice}
              />
            </div>
            <div className="col-10">
              <Input
                label="Exit Price *:"
                handler={(e) => setExitPrice(e.target.value)}
                required
                value={exitPrice}
              />
            </div>
            <div className="col-10">
              <Input
                label="Stop Loss:"
                handler={(e) => setStopLoss(e.target.value)}
                value={stopLoss}
              />
            </div>
            <div className="col-10">
              <Input
                label="Image Url:"
                handler={(e) => setImgUrl(e.target.value)}
                value={imgUrl}
              />
            </div>
            <div className="col-10">
              <Input
                label="Profit/Loss *:"
                handler={(e) => setNet(e.target.value)}
                required
                value={net}
              />
            </div>
            <div className="col-10">
              <label className="label">Notes (up to 250 chars):</label>
              <textarea
                cols="30"
                rows="5"
                className="input text_area"
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
              />
            </div>
            <div className="col-10">
              <label className="label">Tags (add at least one) *:</label>
              <InputTags
                defaultTags={tags.arr}
                onChange={handleTagsChange}
                error={tags.error}
              />
            </div>
            {type.error ? (
              <p className="text-red mt-1">Please pick trade type!</p>
            ) : null}
            <div className="row mt-2">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default AddTrade;
