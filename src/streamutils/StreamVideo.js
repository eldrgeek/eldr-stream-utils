import React, { useRef, useEffect, useState } from "react";

export default function StreamVideo({ stream, width = 50, height = 50 }) {
  const videoRef = useRef(null);
  const [displayMode, setDisplayMode] = useState("block");
  useEffect(() => {
    if (videoRef) {
      Promise.resolve(stream).then(stream => {
        console.log("stream", stream);
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      });
    }
  }, [videoRef, stream]);
  return (
    <div style={{ height, width, display: displayMode }}>
      {/* <div style={{ position: "absolute" }}> */}
      <video
        height={height}
        width={width}
        onPlaying={() => setDisplayMode("block")}
        ref={videoRef}
        crossOrigin="anonymous"
        autoPlay
      />
      {/* </div>  */}
    </div>
  );
}
