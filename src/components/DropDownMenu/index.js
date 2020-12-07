import React from "react";
import "./style.scss";

const DropDownMenu = ({ list = [] }) => {
  return (
    <ul className="list">
      {list.map((el, i) => (
        <li className="list_item" key={i}>
          <a className="list_link" href={el.link}>
            {el.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default DropDownMenu;
