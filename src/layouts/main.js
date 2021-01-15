import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Menu from "../components/Menu";
import { motion } from "framer-motion";

const MainLayout = (props) => {
  const { children, title } = props;
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };
  return (
    <>
      <Header />
      <Menu />
      <motion.div
        className="container"
        animate="in"
        initial="initial"
        exit="out"
        variants={pageVariants}
      >
        <h3 className="page_title">{title}</h3>
        <div className="content">{children}</div>
      </motion.div>
      <Footer />
    </>
  );
};

export default MainLayout;
