import React, { useState } from 'react';
import styled from 'styled-components';
import { Tracks } from './Tracks';
import * as defaults from './defaults';
import { MarkupInput } from './MarkupInput';
import { Preview } from './Preview';
import { tracksToStyles } from './helpers/tracksToStyles';

const generateId = () => Date.now();

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Previews = styled.div`
  display: flex;
  height: 40vh;
`;

export const App = () => {
  const [
    animationProperties,
    setAnimationProperties,
  ] = useState<AnimationProperties>(defaults.properties);
  const [tracks, setTracks] = useState<Track[]>(defaults.tracks);
  const [markup, setMarkup] = useState<string>(defaults.markup);

  const addNewTrack = (selectors: string[]) => {
    const newTrack: Track = {
      id: generateId(),
      selectors,
      keyframes: [],
    };
    setTracks([...tracks, newTrack]);
  };

  const removeTrack = (trackId: number) => {
    const filteredTracks = tracks.filter(({ id }) => id !== trackId);
    setTracks(filteredTracks);
  };

  const addKeyframe = (trackId: number, percentage: number, styles: string) => {
    const newKeyframe = {
      id: generateId(),
      percentages: [percentage],
      styles,
    };

    const track = tracks.find(({ id }) => id === trackId);
    if (!track) {
      throw new Error('Attempt to add a keyframe to non-existant track');
    }

    const keyframes = [...track.keyframes, newKeyframe];
    const updatedTrack = Object.assign({}, track, { keyframes });
    const updatedTracks = tracks.map((t) =>
      t.id === trackId ? updatedTrack : t
    );
    setTracks(updatedTracks);
  };

  const removeKeyframe = (trackId: number, keyframeId: number) => {
    const track = tracks.find(({ id }) => id === trackId);
    if (!track) {
      throw new Error('Attempt to remove a keyframe from non-existant track');
    }
    const filteredKeyframes = track.keyframes.filter(
      ({ id }) => id !== keyframeId
    );

    const updatedTrack = Object.assign({}, track, {
      keyframes: filteredKeyframes,
    });
    const updatedTracks = tracks.map((t) =>
      t.id === trackId ? updatedTrack : t
    );
    setTracks(updatedTracks);
  };

  const updateKeyframe = (
    trackId: number,
    keyframeId: number,
    percentages: number[],
    styles: string
  ) => {
    const track = tracks.find(({ id }) => id === trackId);
    if (!track) {
      throw new Error('Attempt to update a keyframe on non-existant track');
    }

    const keyframe = track.keyframes.find(({ id }) => id === keyframeId);
    if (!keyframe) {
      throw new Error('Attempt to update a non-existant keyframe');
    }

    const updatedKeyframe = Object.assign({}, keyframe, {
      percentages: percentages || keyframe.percentages,
      styles: styles || keyframe.styles,
    });

    const updatedKeyframes = track.keyframes.map((keyframe) =>
      keyframe.id === keyframeId ? updatedKeyframe : keyframe
    );

    const updatedTrack = Object.assign({}, track, {
      keyframes: updatedKeyframes,
    });

    const updatedTracks = tracks.map((t) =>
      t.id === trackId ? updatedTrack : t
    );
    setTracks(updatedTracks);
  };

  return (
    <AppWrapper>
      <Previews>
        <MarkupInput markup={markup} setMarkup={setMarkup} />
        <Preview
          markup={markup}
          animationStyles={tracksToStyles(tracks, animationProperties)}
        />
      </Previews>
      <pre>{JSON.stringify(tracks, null, 2)}</pre>
      <Tracks addNewTrack={addNewTrack} />
    </AppWrapper>
  );
};
