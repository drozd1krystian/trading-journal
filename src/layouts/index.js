import React from "react";

const MainLayout = (props) => {
  const { children, title } = props;
  return (
    <div className="container">
      <div className="page_title">
        <h3>{title}</h3>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default MainLayout;
