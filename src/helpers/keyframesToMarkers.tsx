export const keyframesToMarkers = (track: Track) => {
  const markers = track.keyframes
    .reduce((markers: Marker[], keyframe) => {
      keyframe.percentages.forEach((percentage) =>
        markers.push({ keyframeId: keyframe.id, trackId: track.id, percentage })
      );
      return markers;
    }, [])
    .sort((a, b) => a.percentage - b.percentage);

  return markers;
};
