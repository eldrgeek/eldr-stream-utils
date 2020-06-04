import getMediaRecorder from "./getMediaRecorder";

const delayStream = async (stream, delay) => {
  const mediaRecorder = getMediaRecorder(stream);
  let recordedBlobs = [];
  const mimeType = "video/webm;codecs=vp9";
  console.log("delay");
  // mediaRecorder.onstop = handleStop;
  // mediaRecorder.stop();
  const mediaSource = new MediaSource();
  let source = URL.createObjectURL(mediaSource);
  // source = mediaSource
  let sourceBuffer;
  mediaSource.addEventListener("sourceopen", () => {
    mediaRecorder.ondataavailable = handleDataAvailable;
    sourceBuffer = mediaSource.addSourceBuffer(mimeType);
    mediaRecorder.start(delay); // collect 10ms of data
  });
  let gotOne = false;
  function handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
      if (!gotOne) {
        gotOne = true;
        console.log("got one");
      }
      debugger;
      recordedBlobs.push(event.data);
      sourceBuffer.appendBuffer(event.data);
    }
  }
  console.log("source", source);
  return source;
};

export default delayStream;
