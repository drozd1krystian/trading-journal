import React from "react";
import "./style.scss";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";
import BoucingBalls from "../Loaders/BoucingBalls";
import { ReactComponent as CancelIcon } from "../../assets/cancel.svg";
import ResultIcon from "../Loaders/ResultIcon";

const Modal = ({ show, loading, done, confirm, cancel, error }) => {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal"
        >
          <div className="modal_content">
            <div className="modal_header">
              <h3>Delete Post</h3>
              <Button
                className="modal_exit"
                onClick={cancel}
                disabled={loading}
              >
                <CancelIcon className="icon-small" />
              </Button>
            </div>
            <div className="modal_body">
              {!loading ? (
                <motion.span>
                  Are you sure you want to delete this post?
                </motion.span>
              ) : (
                <>
                  <span className="load_text">Please wait </span>
                  <div className="circle">
                    {!done ? <BoucingBalls /> : <ResultIcon result={error} />}
                  </div>
                </>
              )}
            </div>
            <div className="modal_footer">
              <Button
                handler={cancel}
                btnStyle="btn--unstyled"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button handler={confirm} disabled={loading}>
                Delete Post
              </Button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;
