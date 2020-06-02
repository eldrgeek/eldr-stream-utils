export default function splitStream(stream) {
  console.log("Enter split with ", stream);
  return Promise.resolve(stream).then(stream => {
    console.log("split resolves to the stream", stream);
    const audioTracks = stream.getAudioTracks();
    const videoTracks = stream.getVideoTracks();
    // return [0, 1].map(index => new MediaStream([audioTracks[0], videoTracks[1]]));
    const splits = [0, 1].map(index => {
      const tracks = [];
      const pushTrack = track => {
        if (track) tracks.push(track);
      };
      pushTrack(audioTracks[index]);
      pushTrack(videoTracks[index]);
      return new MediaStream(tracks);
    });
    console.log("splits", splits);
    return splits;
  });
}
