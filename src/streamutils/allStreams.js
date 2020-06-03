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
// streams.delayStream = delayStream(streams.localStream,1000)
export default streams;
