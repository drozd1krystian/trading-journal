import React from "react";
import "./style.scss";
import { motion } from "framer-motion";
import { ReactComponent as CheckMark } from "../../../assets/check-mark.svg";
import { ReactComponent as ErrorIcon } from "../../../assets/error.svg";

const ResultIcon = ({ result }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal_result"
    >
      {!result ? (
        <CheckMark className="result_icon icon-small" />
      ) : (
        <ErrorIcon className="result_icon result_icon-red icon-small" />
      )}
    </motion.div>
  );
};

export default ResultIcon;
