import getLocalStream from "./getLocalStream";
import timerCanvas from "./timerCanvas";
const streams = {};
streams.localStream = getLocalStream();
streams.timerStream = timerCanvas({ height: 15 }).captureStream();
export default streams;
