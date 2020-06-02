export default function getLocalStream() {
  var constraints = {
    audio: true,
    video: true
  };

  return navigator.mediaDevices
    .getUserMedia(constraints)
    .catch(e => console.log(e));
}
