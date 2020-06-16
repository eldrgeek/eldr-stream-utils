import getLocalStream from "./getLocalStream";
import timerCanvas from "./timerCanvas";
import combineStreams from "./combineStreams";
import splitStream from "./splitStream";
import delayStream from "./delayStream";
import measureStream from "./measureStream";
const loadTime = Date.now();
const times = {};
const mark = label => (times[label] = Date.now() - loadTime);
export default async function getStreams() {
  mark("app called");
  const streams = {};
  streams.localStream = await getLocalStream();
  mark("local stream");
  streams.timerStream = await timerCanvas({ height: 15 }).captureStream();
  mark("timerstream");
  streams.combinedStream = await combineStreams(
    streams.localStream,
    streams.timerStream
  );
  mark("combinedStream");
  streams.splitStreams = [];

  streams.splitStreams = await splitStream(streams.combinedStream);
  mark("split");

  // streams.delayStream1 = await delayStream(streams.localStream, 500);
  streams.delayStream1 = await delayStream(streams.combinedStream, 100);
  mark("delay1");

  streams.delayStream2 = await delayStream(streams.combinedStream, 1000);
  mark("delay2");
  streams.delayStream3 = await delayStream(streams.combinedStream, 2000);
  mark("delay3");

  await measureStream(streams.delayStream1, "delay1");
  await measureStream(streams.delayStream2, "delay2");
  await measureStream(streams.delayStream3, "delay3");

  mark("measuring");
  console.log("times", times);
  // measureStream(await splitStream(streams.delayStream1)[1])
  return streams;
}
