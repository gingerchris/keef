import React, { useState, createRef, useEffect } from 'react';
import styled from 'styled-components';
import { Track } from './Track';

interface TracksProps {
  tracks: TrackWithMarkers[];
  addNewTrack: (selectors: string[]) => void;
  setActiveMarker: (marker: Marker) => void;
  updateKeyframe: (
    trackId: number,
    keyframeId: number,
    percentages: number[] | null,
    styles: string | null
  ) => void;
}

const TracksContainer = styled.div`
  flex-grow: 1;
`;

export const Tracks = ({
  addNewTrack,
  tracks,
  setActiveMarker,
  updateKeyframe
}: TracksProps) => {
  const [width, setWidth] = useState<number>(0);
  const [newSelector, setNewSelector] = useState<string>('');
  const [draggedMarker, setDraggedMarker] = useState<MarkerWithIndex | null>(null);

  const containerRef = createRef<HTMLDivElement>();

  const clearDraggedMarker = () => setDraggedMarker(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.getBoundingClientRect().width);
      }
    };



    updateWidth();
    window.addEventListener('resize', updateWidth);
    window.addEventListener('mouseup', clearDraggedMarker);

    return () => {
      window.removeEventListener('resize', updateWidth);
      window.removeEventListener('mouseup', clearDraggedMarker);
    };
  }, [containerRef]);

  const onAddNewTrack = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const selectors = newSelector.split(',').map((sel) => sel.trim());
    addNewTrack(selectors);
    setNewSelector('');
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const xPercentage = ((e.clientX / width) * 100);
    if (draggedMarker) {
      const { trackId, keyframeId, percentageIndex } = draggedMarker;
      const track = tracks.find(({ id }) => id == trackId);
      const keyframe = track!.keyframes.find(({ id }) => id == keyframeId);
      const percentages = keyframe!.percentages.map((percentage, index) => {
        if (index == percentageIndex) return xPercentage;
        return percentage;
      });

      updateKeyframe(
        draggedMarker.trackId,
        draggedMarker.keyframeId,
        percentages,
        null
      );
    }
  };

  return (
    <TracksContainer ref={containerRef} onMouseMove={onMouseMove}>
      {tracks.map((track) => (
        <Track
          track={track}
          width={width}
          setDraggedMarker={setDraggedMarker}
          setActiveMarker={setActiveMarker}
          key={track.id}
        />
      ))}
      <form>
        <label htmlFor="selectors">Selectors (separated by ,)</label>
        <input
          type="text"
          id="selectors"
          onInput={(e) => setNewSelector(e.currentTarget.value)}
          value={newSelector}
        />
        <button onClick={onAddNewTrack}>Add new track</button>
      </form>
    </TracksContainer>
  );
};
