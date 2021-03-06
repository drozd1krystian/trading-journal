import React, { useState } from "react";
import "./style.scss";

import Post from "../Post";
import { ReactComponent as JournalIcon } from "../../assets/journal.svg";
import Modal from "../Modal";
import { useDispatch } from "react-redux";
import { deletePostStart } from "../../redux/Posts/posts.actions";
import { showModal } from "../../redux/Modal/modal.actions";
import useModal from "../../hooks/useModal";
import { AnimatePresence } from "framer-motion";

const Journal = ({ posts, title, otherProps, journalRef }) => {
  const [postId, setPostId] = useState(null);
  const dispatch = useDispatch();
  const { show, loading, done, error } = useModal();

  const handleModal = (id) => {
    dispatch(showModal());
    setPostId(id);
  };

  const handleRemove = () => dispatch(deletePostStart(postId));

  return (
    <div className="journal_wrap" ref={journalRef}>
      <Modal
        show={show}
        loading={loading}
        confirm={handleRemove}
        done={done}
        error={error}
        cancel={() => dispatch(showModal())}
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
        <AnimatePresence>
          {posts.map((el, _) => (
            <Post data={el} removePost={() => handleModal(el.id)} key={el.id} />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Journal;
