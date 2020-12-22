import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Menu from "../components/Menu";

const MainLayout = (props) => {
  const { children, title } = props;
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <h3 className="page_title">{title}</h3>
        <div className="content">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
