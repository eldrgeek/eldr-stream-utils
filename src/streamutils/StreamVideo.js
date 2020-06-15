import React, { useRef, useEffect, useState } from "react";

export default function StreamVideo({
  title,
  stream,
  width = 50,
  height = 50
}) {
  if (!stream) return <div>{title}</div>;
  // console.log("Strean ", title)
  const videoRef = useRef(null);
  const [displayMode, setDisplayMode] = useState("inlineBlock");
  useEffect(() => {
    if (videoRef) {
      Promise.resolve(stream).then(stream => {
        // console.log(title + " stream", stream);
        try {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        } catch (e) {
          console.log("StreamVideo error ", stream, e.toString());
        }
      });
    }
  }, [videoRef, stream, title]);
  return (
    <div
      style={{
        padding: "10px",
        height: height + 20,
        width,
        display: displayMode
      }}
    >
      {/* <div style={{ position: "absolute" }}> */}
      {title ? title : "no title"}
      <video
        height={height}
        width={width}
        onPlaying={() => setDisplayMode("inline-block")}
        ref={videoRef}
        crossOrigin="anonymous"
        autoPlay
      />
      {/* </div>  */}
    </div>
  );
}
