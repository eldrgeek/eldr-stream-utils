import React, { useEffect } from "react";
import "./styles.css";
import TimerCanvas from "./streamutils/ReactTimerCanvas";
import StreamVideo from "./streamutils/StreamVideo";
import getAllStreams from "./streamutils/allStreams";
import MediaRecorder from "./streamutils/MediaRecorder";
// import delayRecorder from "./streamutils/delayRecorder";
// delayRecorder();
export default function App() {
  const [splitStreams, setSplitStreams] = React.useState([]);
  const [allStreams, setallStreams] = React.useState({});
  useEffect(() => {
    const callfunc = async xsetAllStreams => {
      setallStreams(await getAllStreams());
    };
    callfunc();
  }, []);
  // });

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
      <MediaRecorder stream={allStreams.localStream} />
      {/* <StreamVideo title="live" stream={allStreams.localStream} /> */}
      "this"
      {allStreams.delayStream ? (
        <StreamVideo title="delayed" stream={allStreams.delayStream} />
      ) : null}
    </div>
  );
}
