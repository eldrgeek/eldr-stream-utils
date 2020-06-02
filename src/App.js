import React, { useEffect } from "react";
import "./styles.css";
import TimerCanvas from "./streamutils/ReactTimerCanvas";
import StreamVideo from "./streamutils/StreamVideo";
import allStreams from "./streamutils/allStreams";
export default function App() {
  const [splitStreams, setSplitStreams] = React.useState([]);
  useEffect(() => {
    allStreams.splitStreams.then(streams => {
      setSplitStreams(streams);
    });
  });
  return (
    <div className="App">
      <TimerCanvas height={15} isActive={true} />
      <StreamVideo
        title="timer"
        height={15}
        stream={allStreams.timerStream}
        width={200}
      />
      <StreamVideo title="local" stream={allStreams.localStream} />
      <StreamVideo title="combined" stream={allStreams.combinedStream} />
      <StreamVideo title="split1" stream={splitStreams[0]} />
      <StreamVideo title="split2" stream={splitStreams[1]} />
    </div>
  );
}
