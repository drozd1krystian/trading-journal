import React from "react";
import "./style.scss";

import MainLayout from "../../layouts/main.js";
import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import PostForm from "../../components/PostForm";

const EditJournal = (props) => {
  const postTitle = "Post 1";

  const handleSubmit = (postTitle, postComments, postDate) => {
    // Edit post in DB
  };
  return (
    <MainLayout title="Edit Your Post">
      <section className="section">
        <h4 className="section_title">
          <EditIcon className="icon-small" />
          <span>Edit Your Post {postTitle}</span>
        </h4>
        <PostForm
          handler={handleSubmit}
          postTitle={"Post 1"}
          postComments={""}
          postDate={new Date()}
        />
      </section>
    </MainLayout>
  );
};

export default EditJournal;
