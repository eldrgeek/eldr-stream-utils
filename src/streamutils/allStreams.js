import getLocalStream from "./getLocalStream";
import timerCanvas from "./timerCanvas";
import combineStreams from "./combineStreams";
import splitStream from "./splitStream";
import delayStream from "./delayStream";
import measureStream from "./measureStream";
export default async function getStreams() {
  const streams = {};

  streams.localStream = await getLocalStream();
  streams.timerStream = await timerCanvas({ height: 15 }).captureStream();
  streams.combinedStream = await combineStreams(
    streams.localStream,
    streams.timerStream
  );
  measureStream(streams.timerStream);
  streams.splitStreams = [];
  console.log("about to test");
  const test = new Promise(resolve => {
    console.log("ready");
    setTimeout(resolve, 1000, "stuff");
  });
  await test;
  test.then(val => console.log("Test has resolved to ", val));
  streams.splitStreams = await splitStream(streams.combinedStream);
  console.log("split", streams.splitStreams);

  streams.delayStream = await delayStream(streams.localStream, 500);
  console.log("returning", streams);
  return streams;
}
