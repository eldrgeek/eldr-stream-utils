import getLocalStream from "./getLocalStream";
import timerCanvas from "./timerCanvas";
import combineStreams from "./combineStreams";
import splitStream from "./splitStream";
import delayStream from "./delayStream";

export default async function getStreams() {
  const streams = {};

  streams.localStream = await getLocalStream();
  streams.timerStream = await timerCanvas({ height: 15 }).captureStream();
  streams.combinedStream = await combineStreams(
    streams.localStream,
    streams.timerStream
  );
  //   console.log("local", streams.localStream);

  //   streams.splitStreams = await splitStream(streams.combinedStream);

  //   streams.delayStream = await delayStream(streams.localStream, 500);
  console.log("got stream", streams.timerStream);
  return streams;
}
