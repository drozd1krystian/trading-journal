import React from "react";
import "./style.scss";

import parse from "html-react-parser";

import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Post = ({ data, removePost, ...otherProps }) => {
  return (
    <motion.section
      className="section"
      {...otherProps}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <p className="section_title">
        <span>
          {data.postDate.toLocaleDateString() + " - " + data.postTitle}
        </span>
      </p>
      <div className="message">{parse(data.postComments)}</div>

      <div className="col-10 mt-3 controls">
        <Link to={{ pathname: `/edit-journal/${data.id}` }}>
          <EditIcon className="icon-small icon-btn" />
        </Link>
        <DeleteIcon
          className="icon-small icon-btn"
          onClick={() => removePost(data.id)}
        />
      </div>
    </motion.section>
  );
};

export default Post;
