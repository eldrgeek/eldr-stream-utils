import getLocalStream from "./getLocalStream";
import timerCanvas from "./timerCanvas";
import combineStreams from "./combineStreams";
import splitStream from "./splitStream";
const streams = {};
streams.localStream = getLocalStream();
streams.timerStream = timerCanvas({ height: 15 }).captureStream();
streams.combinedStream = combineStreams(
  streams.localStream,
  streams.timerStream
);
streams.splitStreams = splitStream(streams.combinedStream);
export default streams;
