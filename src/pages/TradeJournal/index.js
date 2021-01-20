import React, { useRef, useState } from "react";
import CalendarInput from "../../components/Calendar";
import MainLayout from "../../layouts/main";
import "./style.scss";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import Button from "../../components/Button";
import InputTag from "../../components/InputTags";
import Select from "../../components/Select";

const list = ["Type", "Forex", "Crypto"];

const TradeJournal = (props) => {
  const [value, onChange] = useState([new Date(), new Date()]);
  const [tags, setTags] = useState([]);
  const [type, setType] = useState("type");

  const onTypeChange = (newType) => setType(newType);

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
          <div className="col-3">
            <CalendarInput
              value={value}
              onChange={onChange}
              selectRange={true}
              returnValue="range"
            />
          </div>
          <div className="col-3">
            <InputTag defaultTags={tags} onChange={handleTagsInput} limit={3} />
          </div>

          <div className="col-1">
            <Select list={list} handler={onTypeChange} />
          </div>
          <div className="col-3 mt-2 row">
            <Button handler={handleFilterSubmit}>Filter </Button>
            <Button btnStyle="btn--unstyled" handler={handleFiltersClear}>
              Clear
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default TradeJournal;
