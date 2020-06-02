import React from "react";
import timerCanvas from "./timerCanvas";
const theCanvas = timerCanvas({});
export default function TimerCanvas() {
  return (
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
  );
}
