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

const mapState = ({ trades }) => ({
  balance: trades.balance,
});

const AddTrade = () => {
  const [value, onChange] = useState(new Date());
  const [tags, setTags] = useState({
    arr: [],
    error: false,
  });
  const [side, setSide] = useState("Buy");
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [net, setNet] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [notes, setNotes] = useState("");
  const { balance } = useSelector(mapState);
  const dispatch = useDispatch();

  const handleTagsChange = (newTags) =>
    setTags((prev) => ({ ...prev, arr: [...newTags], error: false }));

  const validateNumber = (value, fn) => {
    isNaN(value) || value < 0 ? fn(0) : fn(value);
  };

  const validateProfit = (value, fn) => {
    isNaN(value) ? fn(0) : fn(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tags.arr.length === 0) {
      setTags((prev) => ({ ...prev, error: true }));
      return;
    }
    const trade = {
      date: value,
      tags: tags.arr,
      side,
      symbol,
      quantity,
      entryPrice,
      exitPrice,
      stopLoss,
      net,
      imgUrl,
      notes,
    };
    dispatch(addTradeStart({ trade, balance }));
  };

  useEffect(() => {
    dispatch(updateBalanceStart(balance));
  }, [balance]);

  return (
    <MainLayout title="Add Trade">
      <section className="section">
        <h4 className="section_title">
          <ExportIcon className="ic on-small" />
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
                handler={(e) => setSymbol(e.target.value)}
                required
              />
            </div>
            <div className="col-10">
              <Input
                label="Quanitity *:"
                handler={(e) => validateNumber(e.target.value, setQuantity)}
                required
              />
            </div>
            <div className="col-10">
              <label className="label">Date *:</label>
              <CalendarInput value={value} onChange={onChange} />
              required
            </div>
            <div className="col-10">
              <Input
                label="Entry Price *:"
                handler={(e) => validateNumber(e.target.value, setEntryPrice)}
                required
              />
            </div>
            <div className="col-10">
              <Input
                label="Exit Price *:"
                handler={(e) => validateNumber(e.target.value, setExitPrice)}
                required
              />
            </div>
            <div className="col-10">
              <Input
                label="Stop Loss:"
                handler={(e) => validateNumber(e.target.value, setStopLoss)}
              />
            </div>
            <div className="col-10">
              <Input
                label="Image Url:"
                handler={(e) => setImgUrl(e.target.value)}
              />
            </div>
            <div className="col-10">
              <Input
                label="Profit/Loss *:"
                handler={(e) => validateProfit(e.target.value, setNet)}
                required
              />
            </div>
            <div className="col-10">
              <label className="label">Notes (up to 250 chars):</label>
              <textarea
                cols="30"
                rows="5"
                className="input text_area"
                onChange={(e) => setNotes(e.target.value)}
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
