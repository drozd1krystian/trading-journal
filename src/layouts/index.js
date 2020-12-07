import React from "react";

const MainLayout = (props) => {
  const { children } = props;
  return <div className="container">{children}</div>;
};

export default MainLayout;
