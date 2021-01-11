import React from "react";
import "./style.scss";
import { motion } from "framer-motion";

const BoucingBalls = () => {
  const loadingContainer = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const loadingCricle = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  const loadingCircleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut",
  };

  return (
    <motion.div
      className="circle_wrap"
      variants={loadingContainer}
      initial="start"
      animate="end"
    >
      <motion.span
        className="load_circle"
        variants={loadingCricle}
        transition={loadingCircleTransition}
      />
      <motion.span
        className="load_circle"
        variants={loadingCricle}
        transition={loadingCircleTransition}
      />
      <motion.span
        className="load_circle"
        variants={loadingCricle}
        transition={loadingCircleTransition}
      />
    </motion.div>
  );
};

export default BoucingBalls;
