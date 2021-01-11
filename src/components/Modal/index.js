import React from "react";
import "./style.scss";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";
import BoucingBalls from "../Loaders/BoucingBalls";
import Success from "../Loaders/Success";
import { ReactComponent as CancelIcon } from "../../assets/cancel.svg";

const Modal = ({ show, loading, done, confirm, cancel }) => {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal"
        >
          <div className="modal">
            {!loading ? (
              <div className="modal_content">
                <div className="modal_header">
                  <h3>Delete Post</h3>
                  <div className="modal_exit" onClick={cancel}>
                    <CancelIcon className="icon-small" />
                  </div>
                </div>
                <div className="modal_body">
                  Are you sure you want to delete this post?
                </div>
                <div className="modal_footer">
                  <Button handler={cancel} btnStyle="btn--unstyled">
                    Cancel
                  </Button>
                  <Button handler={confirm}>Delete Post</Button>
                </div>
              </div>
            ) : (
              <div className="modal_content">
                <div className="modal_body">
                  <span className="load_text">Deleting </span>
                  <div className="circle">
                    {!done ? <BoucingBalls /> : <Success />}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;
