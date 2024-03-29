import React from "react";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="containerLoad">
      <div className="loader">
        <img className="title" src="icons/logo.svg" alt="logo" loading="lazy" />
      </div>
    </div>
  );
};

export default Loading;
