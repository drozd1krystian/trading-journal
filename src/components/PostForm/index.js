import React, { useState } from "react";
import "./style.scss";
import PropTypes from "prop-types";

import ReactQuill from "react-quill";
import Input from "../../components/Input";
import CalendarInput from "../Calendar";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import InputTag from "../InputTags";

const mapState = ({ posts }) => ({
  isLoading: posts.isLoading,
  errors: posts.errors,
});

const PostForm = ({ handler, post, ...otherProps }) => {
  const { children } = otherProps;
  const { isLoading, errors } = useSelector(mapState);
  const [postTitle, setPostTitle] = useState(post.postTitle);
  const [postComments, setPostComments] = useState(post.postComments);
  const [postDate, setPostDate] = useState(post.postDate);
  const [tags, setTags] = useState(post.tags ? post.tags : []);
  const location = useLocation();

  const handleChange = (tags) => setTags(tags);

  const handleSubmit = (e) => {
    e.preventDefault();
    handler(postTitle, postComments, postDate);
    if (!isLoading && errors.length === 0) {
      if (location.pathname.includes("edit-journal")) return;
      // Clear Form
      setPostComments("");
      setPostDate(new Date());
      setPostTitle("");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="col-10">
        <Input
          label="Post Title"
          value={postTitle}
          name={postTitle}
          handler={(e) => setPostTitle(e.target.value)}
          required
        />
      </div>
      <label className="label">Comments</label>
      <div className="col-10 ">
        <ReactQuill
          className="quill"
          value={postComments}
          onChange={setPostComments}
        />
      </div>
      <div className="col-10">
        <InputTag defaultTags={tags} onChange={handleChange} />
      </div>
      <div className="col-10 mt-2">
        <label className="label">Choose a date</label>
        <CalendarInput value={postDate} onChange={setPostDate} />
      </div>
      <div className="row mt-2 ">{children}</div>
    </form>
  );
};

PostForm.defaultProps = {
  post: {
    postTitle: "",
    postComments: "",
    postDate: new Date(),
  },
};

export default PostForm;
