import React, { useState, useRef, useEffect } from "react";
import "./style.scss";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import useDetectOutsideClick from "../../hooks/useDetectOutsideClick";

const CalendarInput = ({ value, onChange, showDate, ...otherProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  useDetectOutsideClick(inputRef, setIsOpen);

  const transformDate = () => {
    if (Array.isArray(value) && value.length > 1) {
      if (value[0].getDay() === value[1].getDay())
        return value[0].toLocaleDateString();
      else
        return (
          value[0].toLocaleDateString() + " - " + value[1].toLocaleDateString()
        );
    } else return value.toLocaleDateString();
  };

  useEffect(() => {
    setIsOpen(false);
  }, [value]);

  return (
    <div className="calendar" ref={inputRef}>
      <div className="calendar_value" onClick={() => setIsOpen(!isOpen)}>
        <CalendarIcon className="icon-small" />
        {showDate ? transformDate() : null}
      </div>
      <Calendar
        onChange={onChange}
        value={value}
        maxDate={new Date()}
        {...otherProps}
        className={
          isOpen ? `calendar_input calendar_input--open` : "calendar_input"
        }
      />
    </div>
  );
};

export default CalendarInput;
