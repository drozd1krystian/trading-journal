import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const DropDownMenu = ({ list = [] }) => {
  return (
    <ul className="list list-unstyled">
      {list.map((el, i) => (
        <li className="list_item" key={i}>
          <Link to={el.link} className="list_link" onClick={el.action}>
            {el.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default DropDownMenu;
