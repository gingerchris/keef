import React, { useState } from 'react';
import styled from 'styled-components';

interface TrackProps {
  track: TrackWithMarkers;
  width: number;
  setActiveMarker: (marker: Marker) => void;
  setDraggedMarker: (marker: MarkerWithIndex | null) => void;
}

interface MarkerProps {
  x: number;
  id: number;
}

const Marker = styled.path`
  cursor: pointer;
`;

export const Track = ({ track, width, setDraggedMarker, setActiveMarker }: TrackProps) => {
  const setTransform = (width: number, percentage: number) => {
    const x = (width / 100) * percentage;
    return `translate(${x} 0)`;
  }

  return (
    <div>
      <h4>{track.selectors.join(',')}</h4>
      <svg width="100%" height="40">
        <line x1={0} y1="20" x2="100%" y2="20" stroke="black" />
        {track.markers.map((marker, index) => {
          return (
            <Marker
              key={`${marker.percentage}:${track.id}`}
              d="M 0 20 L 10 40 L -10 40 Z"
              transform={setTransform(width, marker.percentage)}
              tabIndex={0}
              onClick={() => {
                setActiveMarker(marker);
              }}
              onMouseDown={() => {
                setDraggedMarker(Object.assign({percentageIndex: index}, marker));
              }}
              onMouseUp={() => {
                setDraggedMarker(null);
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};
