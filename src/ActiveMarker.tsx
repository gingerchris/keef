import React from 'react';

interface ActiveMarkerProps {
  activeKeyframe: TrackKeyframe;
  activePercentage: number;
  prevKeyframe?: TrackKeyframe;
  prevPercentage: number;
  nextKeyframe?: TrackKeyframe;
  nextPercentage: number;
}

export const ActiveMarker = ({
  activeKeyframe,
  activePercentage,
  prevKeyframe,
  prevPercentage,
  nextKeyframe,
  nextPercentage,
}: ActiveMarkerProps) => {
  return (
    <div>
      {prevKeyframe && (
        <div>
          <h5>{prevPercentage}</h5>
          <p>{JSON.stringify(prevKeyframe.styles)}</p>
        </div>
      )}
    </div>
  );
};
