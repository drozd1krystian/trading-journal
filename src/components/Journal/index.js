import React, { useState } from "react";
import "./style.scss";

import Post from "../Post";

import { ReactComponent as JournalIcon } from "../../assets/journal.svg";

const Journal = ({ posts, title, removePost }) => {
  return (
    <>
      {posts.length === 0 ? (
        <section className="section">
          <h4 className="section_title">
            <JournalIcon className="icon-small" />
            <span>{title}</span>
          </h4>
          <p>Your journal is empty. Add something!</p>
        </section>
      ) : (
        posts.map((el, i) => (
          <Post
            title={el.postTitle}
            comments={el.postComments}
            key={el.id}
            id={el.id}
            removePost={removePost}
          />
        ))
      )}
    </>
  );
};

export default Journal;
