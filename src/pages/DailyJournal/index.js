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
      <section className="section">
        <p className="section_title">
          <CalendarIcon className="icon-small" />
          <span>Filter</span>
        </p>
        <div className="section_content">
          <CalendarInput value={value} onChange={onChange} />
          <div className="col-3">
            <Input
              value={search}
              placeholder="Search your journal"
              onChange={(e) => setSearch(e.value)}
            />
          </div>
          <Button value="Filter" />
          <Button
            value="Clear"
            btnStyle="btn--unstyled"
            handler={handleFiltersClear}
          />
        </div>
      </section>

      <section className="section">
        <p className="section_title">
          <span>Add Post</span>
        </p>
        <form action="" className="form">
          <div className="col-10">
            <div className="row">
              <Input label="Post Title" />
            </div>
          </div>
          <label className="label">Comments</label>
          <div className="col-10">
            <CalendarInput value={value} onChange={onChange} />
          </div>
          <div className="col-3 mt-2">
            <Button type="submit" value="Create" btnStyle="btn--submit" />
          </div>
        </form>
      </section>
    </MainLayout>
  );
};

export default DailyJournal;
