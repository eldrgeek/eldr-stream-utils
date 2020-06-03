/*
Copyright 2017 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// "use strict";

// This code is adapted from
// https://rawgit.com/Miguelao/demos/master/mediarecorder.html

import React, { useState, useRef, useEffect } from "react";
import getMediaRecorder from "./getMediaRecorder";
const main = theStream => {
  // var mediaSource = new MediaSource();
  // mediaSource.addEventListener("sourceopen", handleSourceOpen, false);
  let myStream = null;
  var mediaRecorder;
  var recordedBlobs;
  var sourceBuffer;

  var gumVideo = document.querySelector("video#gum");
  var cloneVideo = document.querySelector("video#clone");

  var recordedVideo = document.querySelector("video#recorded");

  var recordButton = document.querySelector("button#record");
  var playButton = document.querySelector("button#play");
  var downloadButton = document.querySelector("button#download");
  recordButton.onclick = toggleRecording;
  playButton.onclick = play;
  downloadButton.onclick = download;

  // console.log(location.host);
  // // window.isSecureContext could be used for Chrome
  // var isSecureOrigin =
  //   location.protocol === "https:" || location.host.includes("localhost");
  // if (!isSecureOrigin) {
  //   alert(
  //     "getUserMedia() must be run from a secure origin: HTTPS or localhost." +
  //       "\n\nChanging protocol to HTTPS"
  //   );
  //   location.protocol = "HTTPS";
  // }

  var constraints = {
    audio: true,
    video: true
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(successCallback, errorCallback);

  function successCallback(stream) {
    window.stream = stream;
    myStream = stream;

    window.theStream = theStream;
    const getTrack = () => {
      const theTrack = theStream.getVideoTracks()[0];
      stream.addTrack(theTrack);
      gumVideo.srcObject = stream;
      window.xGV = gumVideo;
      gumVideo.onplaying = () => {
        const captureStream = gumVideo.captureStream().clone();
        captureStream.removeTrack(captureStream.getVideoTracks()[0]);
        // cloneVideo.srcObject = captureStream;
        cloneVideo.srcObject = theStream;
      };
    };
    if (theStream.active) {
      getTrack();
    } else {
      theStream.onactive = getTrack();
    }
  }
  // window.xCS = gumVideo.captureSteam()
  // cloneVideo.srcObject = gumVideo.captureSteam()//

  function errorCallback(error) {
    console.log("navigator.getUserMedia error: ", error);
  }

  function handleSourceOpen(event) {
    console.log("MediaSource opened");
    sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
    console.log("Source buffer: ", sourceBuffer);
  }

  function handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  }

  function handleStop(event) {
    console.log("Recorder stopped: ", event);
  }

  function toggleRecording() {
    if (recordButton.textContent === "Start Recording") {
      startRecording();
    } else {
      stopRecording();
      recordButton.textContent = "Start Recording";
      playButton.disabled = false;
      downloadButton.disabled = false;
    }
  }

  // The nested try blocks will be simplified when Chrome 47 moves to Stable
  function startRecording() {
    // if (theStream) window.stream = theStream;
    console.log(window.stream, myStream, window.stream === myStream);
    mediaRecorder = getMediaRecorder(myStream);
    recordedBlobs = [];
    // var options = { mimeType: "video/webm;codecs=vp9", bitsPerSecond: 100000 };
    // try {
    //   mediaRecorder = new MediaRecorder(window.stream, options);
    // } catch (e0) {
    //   console.log(
    //     "Unable to create MediaRecorder with options Object: ",
    //     options,
    //     e0
    //   );
    //   try {
    //     options = { mimeType: "video/webm;codecs=vp8", bitsPerSecond: 100000 };
    //     mediaRecorder = new MediaRecorder(window.stream, options);
    //   } catch (e1) {
    //     console.log(
    //       "Unable to create MediaRecorder with options Object: ",
    //       options,
    //       e1
    //     );
    //     try {
    //       options = "video/mp4";
    //       mediaRecorder = new MediaRecorder(window.stream, options);
    //     } catch (e2) {
    //       alert("MediaRecorder is not supported by this browser.");
    //       console.error("Exception while creating MediaRecorder:", e2);
    //       return;
    //     }
    //   }
    // }
    // debugger;
    // console.log(
    //   "Created MediaRecorder",
    //   mediaRecorder,
    //   "with options",
    //   options
    // );
    recordButton.textContent = "Stop Recording";
    playButton.disabled = true;
    downloadButton.disabled = true;
    mediaRecorder.onstop = handleStop;
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(10); // collect 10ms of data
    console.log("MediaRecorder started", mediaRecorder);
  }

  function stopRecording() {
    mediaRecorder.stop();
    console.log("Recorded Blobs: ", recordedBlobs);
    recordedVideo.controls = true;
  }

  function play() {
    var superBuffer = new Blob(recordedBlobs, { type: "video/webm" });
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
  }

  function download() {
    var blob = new Blob(recordedBlobs, { type: "video/webm" });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "test.webm";
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }
};
export default function VideoRecorder({ stream }) {
  const videoRef = useRef(null);
  const [message, setMessage] = useState("none");
  useEffect(() => {
    if (videoRef) {
      if (stream) {
        setMessage("stream");
      } else {
        setMessage("no stream");
      }
      Promise.resolve(stream).then(stream => main(stream));
      // main()
    }
  }, [videoRef, stream]);
  return (
    <div>
      {message}
      <button id="record">Start Recording</button>
      <button id="play" disabled>
        Play
      </button>
      <button id="download" disabled>
        Download
      </button>
      <video width="200" id="gum" autoPlay muted playsInline />
      <br />
      <video width="200" id="recorded" autoPlay loop playsInline />

      <video width="40" heigth="15" id="clone" autoPlay loop playsInline />

      <a
        href="https://github.com/samdutton/simpl/blob/gh-pages/mediarecorder"
        title="View source for this page on GitHub"
        id="viewSource"
      >
        View source on GitHub
      </a>
    </div>
  );
}
