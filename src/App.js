import React from "react";
import "./styles.css";
import TimerCanvas from "./streamutils/TimerCanvas";
export default function App() {
  console.log("render appp");
  return (
    <div className="App">
      <TimerCanvas />
    </div>
  );
}
