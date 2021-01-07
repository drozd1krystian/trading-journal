import React from "react";
import "./style.scss";

import parse from "html-react-parser";

import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { Link } from "react-router-dom";

const Post = ({ title, comments, date, removePost, id }) => {
  return (
    <section className="section">
      <p className="section_title">
        <span>{date + " - " + title}</span>
      </p>
      <div className="message">{parse(comments)}</div>

      <div className="col-10 mt-3 controls">
        <Link to={{ pathname: `/edit-journal/${id}` }}>
          <EditIcon className="icon-small icon-btn" />
        </Link>
        <DeleteIcon
          className="icon-small icon-btn"
          onClick={() => removePost(id)}
        />
      </div>
    </section>
  );
};

export default Post;
