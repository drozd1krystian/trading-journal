import React, { useState, useRef, useEffect } from "react";
import "./style.scss";

import Calendar from "react-calendar";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";
import useDetectOutsideClick from "../../hooks/useDetectOutsideClick";

const CalendarInput = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  useDetectOutsideClick(inputRef, setIsOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [value]);

  return (
    <div className="calendar" ref={inputRef}>
      <div className="calendar_value" onClick={() => setIsOpen(!isOpen)}>
        <CalendarIcon className="icon-small" />
        {value.toLocaleDateString()}
      </div>
      <Calendar
        onChange={onChange}
        value={value}
        className={
          isOpen ? "calendar_input calendar_input--open" : "calendar_input"
        }
      />
    </div>
  );
};

export default CalendarInput;
