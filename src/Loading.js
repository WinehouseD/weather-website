import React from "react";

const Loading = () => {
  return (
    <div className="containerLoad">
      <div className="loader">
        <img className="title" src="icons/logo.svg" alt="logo"></img>
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
        <div className="dot dot4"></div>
      </div>
    </div>
  );
};

export default Loading;
