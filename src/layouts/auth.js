import React from "react";
import Footer from "../components/Footer";

import { motion } from "framer-motion";

const AuthLayout = (props) => {
  const { children } = props;

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 0,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
    },
  };

  return (
    <>
      <div className="account_pages">
        <motion.div
          className="container"
          animate="in"
          initial="initial"
          exit="out"
          variants={pageVariants}
        >
          <div className="row row-center mt-5 ">
            <div className="col-4">
              <div className="form">
                <h3 className="form_logo text-center">TradeJournal</h3>
                {children}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default AuthLayout;
