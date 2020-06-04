import getLocalStream from "./getLocalStream";
import timerCanvas from "./timerCanvas";
import combineStreams from "./combineStreams";
import splitStream from "./splitStream";
import delayStream from "./delayStream";

const streams = {};
streams.localStream = getLocalStream();
streams.timerStream = timerCanvas({ height: 15 }).captureStream();
streams.combinedStream = combineStreams(
  streams.localStream,
  streams.timerStream
);

streams.splitStreams = splitStream(streams.combinedStream);
Promise.resolve(streams.localStream).then(async stream => {
  console.log(stream);
  console.log("timed out");
  streams.delayStream = await delayStream(stream, 1000);
});
export default streams;
