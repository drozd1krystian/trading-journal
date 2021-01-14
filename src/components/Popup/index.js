import React from "react";
import "./style.scss";

import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import ResultIcon from "../Loaders/ResultIcon";

const mapState = ({ posts }) => ({
  showPopup: posts.showPopup,
  errors: posts.errors,
});

const Popup = ({ message }) => {
  const { showPopup, errors } = useSelector(mapState);
  return (
    <>
      {showPopup ? (
        <AnimatePresence>
          <motion.div
            className="popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="popup_content">
              <ResultIcon result={errors.length > 0 ? true : false} />
              <span
                className={
                  errors.length > 0
                    ? "popup_message-red popup_message"
                    : "popup_message"
                }
              >
                {message}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : null}
    </>
  );
};

export default Popup;
