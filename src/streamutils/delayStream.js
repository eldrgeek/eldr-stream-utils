import getMediaRecorder from "./getMediaRecorder";
import defer from "./defer";

export default function delayStream(stream, delay = 200, video) {
  if (!video) {
    video = document.createElement("video");
    // video3 = document.querySelector("#video3");
    video.autoplay = video.playsinline = video.controls = true;
  }
  const mediaSource = new MediaSource();
  video.src = window.URL.createObjectURL(mediaSource);
  const recorder = getMediaRecorder(stream);
  mediaSource.onsourceopen = async function() {
    console.log("Added source buffer", mediaSource.sourceBuffers.length);
    let sourceBuffer3 = mediaSource.addSourceBuffer(
      // 'video/webm; codecs="vorbis,vp8"'
      "video/webm;codecs=vp9,opus"
    ); //
    // document.querySelector("#video3").src = delayStream
    let deferred = null;
    //called when the filereader has laoded
    //Called when the next chnuk is added to the source buffer
    recorder.onstop = async () => {
      mediaSource.onsourceopen = () => {};
      await deferred.promise;
      console.log("recorder stop");
      mediaSource.endOfStream();
    };
    // let block = 0;
    recorder.ondataavailable = async e => {
      // console.log("data", ++block);
      deferred = defer();
      let buffer = await e.data.arrayBuffer();
      try {
        sourceBuffer3.appendBuffer(new Uint8Array(buffer));
      } catch (e) {
        console.log("error ondatavailable ", e.toString());
      }
      await deferred.promise;
      // if(block <= N_BLOCKS) recorder.resume()
    };
    sourceBuffer3.onupdateend = () => {
      deferred.resolve();
    };
    // fillBuffer(sourceBuffer3, mediaSource)
    if (stream.getTracks().length !== 0) {
      recorder.start(delay);
    } else {
      stream.onaddtrack = () => {
        recorder.start(delay);
        stream.onaddtrack = () => {};
      };
    }
  };
  return video.captureStream();
}
