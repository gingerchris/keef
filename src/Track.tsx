import React from 'react';

interface TrackProps {
  track: Track;
  width: number;
}

interface MarkerProps {
  x: number;
  id: number;
}

const Marker = ({ x }: MarkerProps) => {
  return <path d="M 0 20 L 10 40 L -10 40 Z" transform={`translate(${x} 0)`} />;
};

export const Track = ({ track, width }: TrackProps) => {
  const markers = track.keyframes.reduce((markers: MarkerProps[], keyframe) => {
    keyframe.percentages.forEach((percentage) =>
      markers.push({ id: keyframe.id, x: (width / 100) * percentage })
    );
    return markers;
  }, []);
  console.log(markers);
  return (
    <div>
      <h4>{track.selectors.join(',')}</h4>
      <svg width="100%" height="40">
        <line x1={0} y1="20" x2="100%" y2="20" stroke="black" />
        {markers.map((marker) => (
          <Marker {...marker} key={marker.x} />
        ))}
      </svg>
    </div>
  );
};
