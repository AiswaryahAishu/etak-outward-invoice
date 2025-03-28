import React, { useState, useEffect } from "react";
import "../StatusBar.css";

const StatusBar: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="status-bar">
      <span>Status Bar</span>
      <div className="status-indicator">
        <span>{isOnline ? "Online" : "No Internet"}</span>
        <div className={`status-dot ${isOnline ? "online" : "offline"}`}></div>
      </div>
    </div>
  );
};

export default StatusBar;
