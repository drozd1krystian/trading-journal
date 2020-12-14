import React, { useState } from "react";
import "./style.scss";

import MainLayout from "../../layouts";
import "react-calendar/dist/Calendar.css";
import CalendarInput from "../../components/Calendar";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";

const DailyJournal = (props) => {
  const [value, onChange] = useState(new Date());
  const [search, setSearch] = useState("");

  const handleFiltersClear = () => {
    onChange(new Date());
    setSearch("");
  };

  return (
    <MainLayout title="Daily Journal">
      <div className="filters">
        <p className="section_title">
          <CalendarIcon className="icon-small" />
          <span>Filter</span>
        </p>
        <div className="filters_options">
          <CalendarInput value={value} onChange={onChange} />
          <Input value={search} onChange={(e) => setSearch(e.value)} />
          <Button value="Filter" />
          <Button
            value="Clear"
            btnStyle="btn--unstyled"
            handler={handleFiltersClear}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default DailyJournal;
