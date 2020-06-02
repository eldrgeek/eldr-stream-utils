export default function combineStreams(stream1, stream2) {
  return Promise.all([stream1, stream2]).then(([stream1, stream2]) => {
    if (stream1 && stream2) {
      const tracks = stream2.getTracks();
      tracks.forEach(track => stream1.addTrack(track));
      return stream1;
    }
  });
  // .then((result)=>(console.log(result)));
}
