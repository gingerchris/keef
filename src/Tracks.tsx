import React, { useState, createRef, useEffect } from 'react';
import { Track } from './Track';

interface TracksProps {
  tracks: TrackWithMarkers[];
  addNewTrack: (selectors: string[]) => void;
  setActiveMarker: (marker: Marker) => void;
}

export const Tracks = ({
  addNewTrack,
  tracks,
  setActiveMarker,
}: TracksProps) => {
  const [width, setWidth] = useState<number>(0);
  const containerRef = createRef<HTMLDivElement>();
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.getBoundingClientRect().width);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [containerRef]);

  const [newSelector, setNewSelector] = useState<string>('');
  const onAddNewTrack = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const selectors = newSelector.split(',').map((sel) => sel.trim());
    addNewTrack(selectors);
    setNewSelector('');
  };

  return (
    <div ref={containerRef}>
      {tracks.map((track) => (
        <Track track={track} width={width} setActiveMarker={setActiveMarker} key={track.id} />
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
    </div>
  );
};
