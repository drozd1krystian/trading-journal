import React from "react";
import "./style.scss";

import { ReactComponent as CheckMark } from "../../assets/check-mark.svg";
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
            <p className="popup_content">
              <ResultIcon result={errors.length > 0 ? true : false} />
              <span className="popup_message">{message}</span>
            </p>
          </motion.div>
        </AnimatePresence>
      ) : null}
    </>
  );
};

export default Popup;
