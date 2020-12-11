import React, { useState } from "react";
import "./style.scss";

import MainLayout from "../../layouts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";

const DailyJournal = (props) => {
  const [value, onChange] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <MainLayout title="Daily Journal">
      <div className="filters">
        <p className="section_title">
          <CalendarIcon className="icon-small" />
          <span>Filter</span>
        </p>
        <div className="filters_options">
          <div className="calendar">
            <div
              className="calendar_value"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <CalendarIcon className="icon-small" />
              {value.toLocaleDateString()}
            </div>
            {showCalendar ? (
              <Calendar
                onChange={onChange}
                value={value}
                className="calendar_input"
              />
            ) : null}
          </div>
          <input
            type="text"
            className="input"
            placeholder="Search your journal"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default DailyJournal;
