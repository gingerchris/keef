import React from 'react';

interface ActiveMarkerProps {
  activeMarker?: Marker;
  tracks: TrackWithMarkers[];
}

interface KeyframeBlockProps {
  title: string;
  keyframe: TrackKeyframe;
  percentage: number;
  active?: boolean;
}

const KeyframeBlock = ({ title, keyframe, percentage }: KeyframeBlockProps) => {
  return (
    <div>
      <h5>
        {title}: {percentage}%
      </h5>
      <p>{JSON.stringify(keyframe.styles)}</p>
    </div>
  );
};

export const ActiveMarker = ({ activeMarker, tracks }: ActiveMarkerProps) => {
  if (activeMarker) {
    const activeTrack = tracks.find(
      (track) => track.id === activeMarker?.trackId
    );

    const activeMarkerIndex = activeTrack!.markers.findIndex(
      (marker) => marker === activeMarker
    );

    const prevMarker = activeTrack?.markers[activeMarkerIndex - 1];
    const nextMarker = activeTrack?.markers[activeMarkerIndex + 1];

    const prevKeyframe =
      prevMarker &&
      activeTrack!.keyframes.find((kf) => kf.id === prevMarker.keyframeId);
    const nextKeyframe =
      nextMarker &&
      activeTrack!.keyframes.find((kf) => kf.id === nextMarker.keyframeId);
    const activeKeyframe = activeTrack?.keyframes.find(
      (kf) => kf.id === activeMarker?.keyframeId
    );
    return (
      <div>
        {prevKeyframe && (
          <KeyframeBlock
            title="Previous"
            keyframe={prevKeyframe}
            percentage={prevMarker!.percentage}
          />
        )}
        <KeyframeBlock
          title="Selected"
          keyframe={activeKeyframe!}
          percentage={activeMarker!.percentage}
          active
        />
        {nextKeyframe && (
          <KeyframeBlock
            title="Next"
            keyframe={nextKeyframe}
            percentage={nextMarker!.percentage}
          />
        )}
      </div>
    );
  }
  return (
    <div>Select a keyframe on the timeline to view and edit it's styles</div>
  );
};
