let interval = null;
export default function timerCanvas({ height = 15, width = 40 }) {
  let fillStyle = 0;
  let ctx = null;

  function clearCanvas() {
    // clear canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, width, height);
  }
  function fillRect() {
    const f = "#" + ("000000" + fillStyle.toString(16).toUpperCase()).slice(-6);
    ctx.fillStyle = f;
    fillStyle += 0x10;
    ctx.fillRect(0, 0, 10, 10);
  }
  const FRAC = 10;
  const FREQ = 1000;
  let seconds = 0;
  const draw = cnt => {
    let whole = Math.floor(cnt / FRAC);
    let part = cnt - whole * FRAC;
    clearCanvas();
    ctx.scale(1, 1);
    ctx.fillStyle = "black";
    ctx.font = "10px serif";
    ctx.fillText(`${whole}:${part}`, 15, 10);
    fillRect();
  };
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext("2d");
  // if (window.Xinterval) clearInterval(window.Xinterval);
  interval = setInterval(() => {
    seconds++;
    draw(seconds);
  }, FREQ);
  return canvas;
}

// if (module.hot) {
//   module.hot.accept();
//   module.hot.dispose(data => {
//     console.log("dispose", interval);
//     clearInterval(interval);
//   });
//   if(module.hot.data ){
//   }
// }
