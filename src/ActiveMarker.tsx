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
          <h5>Previous keframe: {prevPercentage}%</h5>
          <p>{JSON.stringify(prevKeyframe.styles)}</p>
          <h5>Current keyframe: {activePercentage}%</h5>
          <p>{JSON.stringify(activeKeyframe.styles)}</p>
          <h5>Next Keyframe: {nextPercentage}%</h5>
          <p>{JSON.stringify(nextKeyframe?.styles)}</p>
        </div>
      )}
    </div>
  );
};
