import React from "react";
import "./style.scss";
import { motion } from "framer-motion";
import { ReactComponent as CheckMark } from "../../../assets/check-mark.svg";

const Success = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="success"
    >
      <CheckMark className="success_icon icon-small" />
    </motion.div>
  );
};

export default Success;
