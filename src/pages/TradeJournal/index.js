import React, { useRef, useState } from "react";
import CalendarInput from "../../components/Calendar";
import MainLayout from "../../layouts/main";
import "./style.scss";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import Button from "../../components/Button";
import InputTag from "../../components/InputTags";
import Select from "../../components/Select";
import Input from "../../components/Input";

const list = ["Type", "Forex", "Crypto"];

const MyTrades = (props) => {
  const [value, onChange] = useState([new Date(), new Date()]);
  const [tags, setTags] = useState([]);
  const [type, setType] = useState("type");
  const [direction, setDirection] = useState("");

  const onTypeChange = (newType) => setType(newType);
  const onDirectionChange = (newDirection) => setDirection(newDirection);

  const handleTagsInput = (arr) => setTags(arr);

  const handleFilterSubmit = () => {};

  const handleFiltersClear = () => {
    onChange([new Date(), new Date()]);
    setTags([]);
  };

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
          <div className="col-2">
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
              handler={onDirectionChange}
              defaultPick="Side"
            />
          </div>
          <div className="col-2">
            <Input placeholder="Symbol (eg. GBPUSD)" />
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
                <th className="table_header">Time</th>
                <th className="table_header">Symbol</th>
                <th className="table_header">Side</th>
                <th className="table_header">Qty</th>
                <th className="table_header">Price</th>
                <th className="table_header">Net</th>
                <th className="table_header">Commision</th>
                <th className="table_header">Fees</th>
                <th className="table_header">Notes</th>
                <th className="table_header">Tags</th>
                <th className="table_header">Pct %</th>
                <th className="table_header">Stop Loss</th>
                <th className="table_header">Profit Target</th>
                <th className="table_header">Options</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table_row">
                <td className="table_cell">2020-12-18</td>
                <td className="table_cell">12:51:53</td>
                <td className="table_cell">GBPUSD</td>
                <td className="table_cell">SELL</td>
                <td className="table_cell">1</td>
                <td className="table_cell">$1.3282</td>
                <td className="table_cell">$0</td>
                <td className="table_cell">$0</td>
                <td className="table_cell">2</td>
                <td className="table_cell">This is s...</td>
                <td className="table_cell">#ez, #ezboi ...</td>
                <td className="table_cell">1.58%</td>
                <td className="table_cell">0</td>
                <td className="table_cell">0</td>
                <td className="table_cell"></td>
              </tr>
              <tr className="table_row">
                <td className="table_cell">2020-12-18</td>
                <td className="table_cell">12:51:53</td>
                <td className="table_cell">GBPUSD</td>
                <td className="table_cell">SELL</td>
                <td className="table_cell">1</td>
                <td className="table_cell">$1.3282</td>
                <td className="table_cell">$0</td>
                <td className="table_cell">$0</td>
                <td className="table_cell">2</td>
                <td className="table_cell">This is s...</td>
                <td className="table_cell">#ez, #ezboi ...</td>
                <td className="table_cell">1.58%</td>
                <td className="table_cell">0</td>
                <td className="table_cell">0</td>
                <td className="table_cell"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </MainLayout>
  );
};

export default MyTrades;
