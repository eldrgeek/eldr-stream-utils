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
  
  // streams.delayStream1 = await delayStream(streams.localStream, 500);
  streams.delayStream1 = await delayStream(streams.combinedStream, 500);
  
  // streams.delayStream2 = await delayStream(streams.combinedStream, 1000);
  // streams.delayStream3 = await delayStream(streams.combinedStream, 250);
  console.log("returning", streams);
  measureStream(await streams.timerStream)
  // measureStream(await splitStream(streams.delayStream1)[1])
  return streams;
}
