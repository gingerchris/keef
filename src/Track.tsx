import React, { useState } from 'react';
import styled from 'styled-components';

interface TrackProps {
  track: TrackWithMarkers;
  width: number;
  setActiveMarker: (marker: Marker) => void;
}

interface MarkerProps {
  x: number;
  id: number;
}

const Marker = styled.path`
  cursor: pointer;
`;

export const Track = ({ track, width, setActiveMarker }: TrackProps) => {
  return (
    <div>
      <h4>{track.selectors.join(',')}</h4>
      <svg width="100%" height="40">
        <line x1={0} y1="20" x2="100%" y2="20" stroke="black" />
        {track.markers.map((marker) => {
          const x = (width / 100) * marker.percentage;
          return (
            <Marker
              key={`${marker.percentage}:${track.id}`}
              d="M 0 20 L 10 40 L -10 40 Z"
              transform={`translate(${x} 0)`}
              tabIndex={0}
              onClick={() => {
                setActiveMarker(marker);
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};
