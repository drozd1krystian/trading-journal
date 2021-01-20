import React, { useState, useRef } from "react";
import "./style.scss";
import { ReactComponent as ArrowDown } from "../../assets/arrow-down.svg";
import useDetectOutsideClick from "../../hooks/useDetectOutsideClick";

const Select = ({ list, handler }) => {
  const [selected, setSelected] = useState("Type");
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const optionsRef = useRef(null);
  useDetectOutsideClick(selectRef, setIsOpen);

  const handleSelected = (value) => {
    setSelected(value);
    handler(value);
  };

  return (
    <div
      className="select input"
      onClick={() => setIsOpen(!isOpen)}
      ref={selectRef}
    >
      <div className="select_wrapper">
        <span className="select_title">{selected}</span>
        <ArrowDown className="icon-small" />
      </div>
      <ul
        className={isOpen ? "select_list select_list--open" : "select_list"}
        ref={optionsRef}
      >
        {list.map((el, id) => (
          <li
            className={
              selected === el ? "list_item list_item--active" : "list_item"
            }
            key={id}
            onClick={() => handleSelected(el)}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
