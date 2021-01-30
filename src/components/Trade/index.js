import React, { useState } from "react";
import "./style.scss";
import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import Note from "../Note";
import { Link } from "react-router-dom";

const Trade = ({ trade, handler, ...otherProps }) => {
  const [showTags, setShowTags] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  return (
    <tr className="table_row" key={trade.id} {...otherProps}>
      <td className="table_cell">{trade.date.toLocaleDateString()}</td>
      <td className="table_cell">{trade.symbol}</td>
      <td className="table_cell">{trade.type}</td>
      <td className="table_cell">{trade.side}</td>
      <td className="table_cell">{trade.quantity}</td>
      <td className="table_cell">${trade.entryPrice}</td>
      <td className="table_cell">${trade.stopLoss || ""}</td>
      <td
        className="table_cell pointer"
        onClick={() => setShowNotes(!showNotes)}
      >
        <Note
          title="Notes"
          show={showNotes}
          handler={() => setShowNotes(!showNotes)}
        >
          {trade.notes}
        </Note>
        {trade.notes.length > 20
          ? `${trade.notes.split("").splice(0, 20).join("")}...`
          : trade.notes}
      </td>
      <td
        className="table_cell trade_tags pointer"
        onClick={() => setShowTags(!showTags)}
      >
        <Note
          title="Tags"
          show={showTags}
          handler={() => setShowTags(!showTags)}
        >
          {trade.tags?.map((el) => (
            <span className="tag" key={el}>
              {el}
            </span>
          ))}
        </Note>
        {trade.tags.slice(0, 2).map((el) => (
          <span className="tag" key={el}>
            {el}
          </span>
        ))}
        {trade.tags.length > 2 ? <span>...</span> : null}
      </td>
      <td
        className={"table_cell " + (trade.net > 0 ? "text-green" : "text-red")}
      >
        {trade.net}$
      </td>
      <td className="table_cell">
        <Link to={{ pathname: `import/${trade.id}` }} data-tip="Edit Trade">
          <EditIcon className="icon-small icon-btn" />
        </Link>
        <DeleteIcon
          className="icon-small icon-btn"
          onClick={handler}
          data-tip="Delete Trade"
        />
      </td>
    </tr>
  );
};
export default Trade;
