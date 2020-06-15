import {FRAC, FREQ, DELTA} from "./timerCanvas"
export default function measureStream(stream) {
  const canvas = document.createElement("canvas");
  canvas.height = 15;
  const ctx = canvas.getContext("2d");
  const video = document.createElement("video");
  video.height = 15;
  video.autoplay = true;
  video.srcObject = stream;
  const span = document.createElement("span");
  const root = document.getElementById("test");
  root.innerHTML = "";

  root.appendChild(canvas);
  root.appendChild(video);
  root.appendChild(span);

  video.addEventListener("play", () => {
    update();
  });
  let frameNo = 0;
  const update = () => {
    frameNo++;
    ctx.drawImage(video, 0, 0, 40, 15);
    let frame = ctx.getImageData(0, 0, 10, 10).data;
    let len = frame.length;
    let colors = {};
    for (let i = 0; i < len; i += 4) {
      const color = (frame[i] * 0xff + frame[i + 1]) * 0xff + frame[i + 2];
      if (!colors[color]) colors[color] = 0;
      colors[color]++;

      // if (frameNo % 1000 === 1) console.log("Frame ", frameNo, frame);
    }
    if (frameNo % 1000 === 1) console.log("Frame ", frameNo, colors);
    requestAnimationFrame(update);
  };
}
