import React from "react";
import "./style.scss";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";
import BoucingBalls from "../Loaders/BoucingBalls";
import Success from "../Loaders/Success";

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
                <div className="col-12">
                  <h3 className="text-center">
                    Are you sure you want to delete this post?
                  </h3>
                </div>
                <div className="row">
                  <Button handler={cancel}>No</Button>
                  <Button handler={confirm}>Yes</Button>
                </div>
              </div>
            ) : (
              <div className="modal_content">
                <span className="load_text">Deleting </span>
                <div className="circle">
                  {!done ? <BoucingBalls /> : <Success />}
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
