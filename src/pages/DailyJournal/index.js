import React, { useState } from "react";
import "./style.scss";

// Layouts
import MainLayout from "../../layouts";

// Icons
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import { ReactComponent as AddIcon } from "../../assets/add.svg";
import { ReactComponent as JournalIcon } from "../../assets/journal.svg";

// Components
import Input from "../../components/Input";
import Button from "../../components/Button";
import CalendarInput from "../../components/Calendar";
import "react-calendar/dist/Calendar.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DailyJournal = (props) => {
  const [value, onChange] = useState(new Date());
  const [search, setSearch] = useState("");

  const journal = [];

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
          <AddIcon className="icon-small" />
          <span>Add Post</span>
        </p>
        <form action="" className="form">
          <div className="col-10">
            <div className="row">
              <Input label="Post Title" />
            </div>
          </div>
          <label className="label">Comments</label>
          <div className="col-10 ">
            <ReactQuill className="quill" />
          </div>
          <div className="col-10 mt-2">
            <label className="label">Choose a date</label>
            <CalendarInput value={value} onChange={onChange} />
          </div>
          <div className="col-3 mt-2">
            <Button type="submit" value="Create" btnStyle="btn--submit" />
          </div>
        </form>
      </section>

      <section className="section">
        <p className="section_title">
          <JournalIcon className="icon-small" />
          <span>Trading Journal</span>
        </p>
        {journal.length === 0 ? (
          <p>Your journal is empty. Add something!</p>
        ) : (
          <h1>Post 1</h1>
        )}
      </section>
    </MainLayout>
  );
};

export default DailyJournal;
