import React, { useEffect, useState } from "react";
import "./Loading.scss";

const Loading = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshData = () => {
    const randomKey = Math.random();
    setRefreshKey(randomKey);
  };

  useEffect(() => {
    refreshData();
    const refreshInterval = setInterval(refreshData, 60);
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="containerLoad">
      <div className="loader">
        <img className="title" src="icons/logo.svg" alt="logo" />
      </div>
      <iframe
        title="refresh-iframe"
        style={{ display: "none" }}
        src={`?${refreshKey}`}
      />
    </div>
  );
};

export default Loading;
