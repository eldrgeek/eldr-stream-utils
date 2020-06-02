import React from "react";
import "./styles.css";
import TimerCanvas from "./streamutils/TimerCanvas";
export default function App() {
  return (
    <div className="App">
      <TimerCanvas height={15} isActive={true} />
    </div>
  );
}
