import React from "react";
import "./style.scss";

import MainLayout from "../../layouts/main.js";
import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import PostForm from "../../components/PostForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const mapState = ({ posts, user }) => ({
  posts: posts.posts,
  user: user.currentUser,
});

const EditJournal = (props) => {
  const { posts, user } = useSelector(mapState);
  const { id } = useParams();
  const post = posts.filter((el) => el.id === id);
  const handleSubmit = (postTitle, postComments, postDate) => {
    // Edit post in DB
  };

  return (
    <MainLayout title="Edit Your Post">
      <section className="section">
        <h4 className="section_title">
          <EditIcon className="icon-small" />
          <span>Edit Your Post {post.postTitle}</span>
        </h4>
        <PostForm handler={handleSubmit} post={post} />
      </section>
    </MainLayout>
  );
};

export default EditJournal;
