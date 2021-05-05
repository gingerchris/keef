import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

interface ActiveMarkerProps {
  activeMarker?: Marker;
  tracks: TrackWithMarkers[];
  setActiveMarker: (marker: Marker) => void;
}

interface KeyframeBlockProps {
  title: string;
  keyframe: TrackKeyframe;
  percentage: number;
  activate?: () => void;
}

const ActiveMarkerWrapper = styled.div`
  flex-basis: 20vw;
  padding: 20px;
`;

const KeyframeBlock = ({
  title,
  keyframe,
  percentage,
  activate,
}: KeyframeBlockProps) => {
  const onClick: MouseEventHandler<HTMLDivElement> = () => {
    activate && activate();
  };
  return (
    <div onClick={onClick}>
      <h5>
        {title}: {percentage}%
      </h5>
      <p>{JSON.stringify(keyframe.styles)}</p>
    </div>
  );
};

export const ActiveMarker = ({
  activeMarker,
  tracks,
  setActiveMarker,
}: ActiveMarkerProps) => {
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
      <ActiveMarkerWrapper>
        {prevKeyframe && prevMarker && (
          <KeyframeBlock
            title="Previous"
            keyframe={prevKeyframe}
            percentage={prevMarker!.percentage}
            activate={() => setActiveMarker(prevMarker)}
          />
        )}
        <KeyframeBlock
          title="Selected"
          keyframe={activeKeyframe!}
          percentage={activeMarker!.percentage}
        />
        {nextKeyframe && nextMarker && (
          <KeyframeBlock
            title="Next"
            keyframe={nextKeyframe}
            percentage={nextMarker!.percentage}
            activate={() => setActiveMarker(nextMarker)}
          />
        )}
      </ActiveMarkerWrapper>
    );
  }
  return (
    <div>Select a keyframe on the timeline to view and edit it's styles</div>
  );
};
