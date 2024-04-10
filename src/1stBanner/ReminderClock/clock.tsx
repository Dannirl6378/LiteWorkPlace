import * as React from "react";
import { useState } from "react";

export default function Clock() {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const [currentTime, setCurrentTime] = useState(time);
  const updateTime = () => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setCurrentTime(time);
  };

  setInterval(updateTime, 500);

  return <div className="clock"><h2>{currentTime}</h2></div>;
}
