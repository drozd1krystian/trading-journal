import React, { useState } from "react";
import "./style.scss";

import Post from "../Post";
import { ReactComponent as JournalIcon } from "../../assets/journal.svg";
import Modal from "../Modal";

const Journal = ({ posts, title }) => {
  const [loading, isLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  const handleModal = () => setShow(true);

  const handleRemove = () => {
    isLoading(true);
    setTimeout(() => setDone(true), 2000);
    setTimeout(() => isLoading(false), 3000);
    setTimeout(() => setShow(false), 2900);
    setTimeout(() => setDone(false), 2900);
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
        posts.map((el, _) => <Post data={el} removePost={handleModal} />)
      )}
    </div>
  );
};

export default Journal;
