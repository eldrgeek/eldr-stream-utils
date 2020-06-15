import React from "react";
import timerCanvas from "./timerCanvas";
export default function TimerCanvas({ height = 50, isActive = true }) {
  const theCanvas = timerCanvas({ height, isActive });
  return (
    <div style={{ display: "inline-block", padding: "10px" }}>
      canvas
      <div
        ref={node => {
          if (!node) return;
          while (node.firstChild) {
            //The list is LIVE so it will re-index each call
            node.removeChild(node.firstChild);
          }
          node.appendChild(theCanvas);
        }}
      />
    </div>
  );
}
