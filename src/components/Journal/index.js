import React, { useState } from "react";
import "./style.scss";

import Post from "../Post";
import { ReactComponent as JournalIcon } from "../../assets/journal.svg";
import Modal from "../Modal";
import { useDispatch } from "react-redux";
import { deletePostSuccess } from "../../redux/Posts/posts.actions";
import { deletePostInDb } from "../../firebase/utils";

const Journal = ({ user, posts, title }) => {
  const [loading, isLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const [postId, setPostId] = useState(null);
  const dispatch = useDispatch();

  const handleModal = (id) => {
    setShow(true);
    setPostId(id);
  };

  const handleRemove = async () => {
    isLoading(true);
    try {
      await deletePostInDb(user.id, postId);
      setDone(true);
      dispatch(deletePostSuccess(postId));
      setTimeout(() => isLoading(false), 1000);
      setTimeout(() => setShow(false), 900);
      setTimeout(() => setDone(false), 900);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="journal_wrap">
      <Modal
        show={show}
        loading={loading}
        confirm={handleRemove}
        done={done}
        cancel={() => setShow(false)}
      />
      {posts.length === 0 ? (
        <section className="section">
          <h4 className="section_title">
            <JournalIcon className="icon-small" />
            <span>{title}</span>
          </h4>
          <p>Your journal is empty. Add something!</p>
        </section>
      ) : (
        posts.map((el, _) => (
          <Post data={el} removePost={() => handleModal(el.id)} key={el.id} />
        ))
      )}
    </div>
  );
};

export default Journal;
