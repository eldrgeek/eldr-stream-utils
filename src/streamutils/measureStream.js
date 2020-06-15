export default function measureStream(stream) {
  const canvas = document.createElement("canvas");
  canvas.height = 15;
  const ctx = canvas.getContext("2d");
  const video = document.createElement("video");
  video.height = 15;
  video.autoplay = true;
  video.srcObject = stream;
  setTimeout(() => {
    document.body.appendChild(canvas);
    document.body.appendChild(video);
  }, 1000);

  video.addEventListener("play", () => {
    update();
  });
  let frameNo = 0;
  const update = () => {
    if (frameNo++ > 11000) return;
    ctx.drawImage(video, 0, 0, 40, 15);
    let frame = ctx.getImageData(0, 0, 10, 10);
    let len = frame.data.length;
    let colors = {};
    for (let i = 0; i < len; i += 4) {
      const color = (frame[i] * 16 + frame[i + 1]) * 16 + frame[i + 2];
      if (!colors[color]) colors[color] = 0;
      colors[color]++;
      if (frameNo++ > 10000) console.log("Frame ", frameNo++, frame);
    }
    requestAnimationFrame(update);
  };
}
