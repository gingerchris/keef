import React, { useState } from 'react';

interface TracksProps {
  addNewTrack: (selectors: string[]) => void;
}

export const Tracks = ({ addNewTrack }: TracksProps) => {
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
  );
};
