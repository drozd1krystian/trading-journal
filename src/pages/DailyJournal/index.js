import React, { useState } from "react";
import "./style.scss";

import MainLayout from "../../layouts";
import "react-calendar/dist/Calendar.css";
import CalendarInput from "../../components/Calendar";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";

const DailyJournal = (props) => {
  return (
    <MainLayout title="Daily Journal">
      <div className="filters">
        <p className="section_title">
          <CalendarIcon className="icon-small" />
          <span>Filter</span>
        </p>
        <div className="filters_options">
          <CalendarInput />
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
