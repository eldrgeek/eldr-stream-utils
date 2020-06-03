import getMediaRecorder from "./getMediaRecorder";

const delayStream = (stream, delay) => {
  const mediaRecorder = getMediaRecorder();
  let recordedBlobs = [];
  const mimeType = "video/webm;codecs=vp9";
  console.log("delay");
  // mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(delay); // collect 10ms of data
  // mediaRecorder.stop();
  const mediaSource = new MediaSource();
  const source = URL.createObjectURL(mediaSource);

  let sourceBuffer;
  mediaSource.addEventListener("sourceopen", () => {
    sourceBuffer = mediaSource.addSourceBuffer(mimeType);
  });
  let gotOne = false;
  function handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
      if (!gotOne) {
        gotOne = true;
        console.log("got one");
      }
      recordedBlobs.push(event.data);
      sourceBuffer.appendBuffer(event.data);
    }
  }
  console.log("source");
  return source;
};

export default delayStream;