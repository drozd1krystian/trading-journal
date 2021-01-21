import React, { useState } from "react";
import "./style.scss";
import MainLayout from "../../layouts/main";
import { ReactComponent as ExportIcon } from "../../assets/export.svg";
import Input from "../../components/Input";
import InputTags from "../../components/InputTags";
import CalendarInput from "../../components/Calendar";
import Button from "../../components/Button";

const AddTrade = () => {
  const [value, onChange] = useState(new Date());
  const [tags, setTags] = useState([]);
  const [side, setSide] = useState("Buy");
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [commission, setCommision] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [notes, setNotes] = useState("");

  const handleTagsChange = (newTags) => setTags(newTags);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trade = {
      value,
      tags,
      side,
      symbol,
      quantity,
      entryPrice,
      exitPrice,
      stopLoss,
      commission,
      imgUrl,
      notes,
    };
    console.log(trade);
  };

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
                handler={(e) => setQuantity(e.target.value)}
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
                handler={(e) => setEntryPrice(e.target.value)}
                required
              />
            </div>
            <div className="col-10">
              <Input
                label="Exit Price *:"
                handler={(e) => setExitPrice(e.target.value)}
                required
              />
            </div>
            <div className="col-10">
              <Input
                label="Stop Loss:"
                handler={(e) => setStopLoss(e.target.value)}
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
                label="Comission: "
                handler={(e) => setCommision(e.target.value)}
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
              <InputTags defaultTags={tags} onChange={handleTagsChange} />
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
