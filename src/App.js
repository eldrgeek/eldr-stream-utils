import React from "react";
import "./styles.css";
import TimerCanvas from "./streamutils/ReactTimerCanvas";
import StreamVideo from "./streamutils/StreamVideo";
import allStreams from "./streamutils/allStreams";
export default function App() {
  return (
    <div className="App">
      <StreamVideo stream={allStreams.timerStream} width={200} />
      <TimerCanvas height={15} isActive={true} />
      <StreamVideo stream={allStreams.localStream} />
    </div>
  );
}
