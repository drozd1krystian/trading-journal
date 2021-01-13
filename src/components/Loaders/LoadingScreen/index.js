import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const mapState = ({ posts }) => ({
  loading: posts.isLoading,
});

const LoadingScreen = () => {
  const { loading } = useSelector(mapState);

  return (
    <>
      {loading ? (
        <div className="loading">
          <span className="loading_bar"></span>
        </div>
      ) : null}
    </>
  );
};

export default LoadingScreen;
