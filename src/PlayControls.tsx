import React from 'react';
import styled from 'styled-components';
import {
  PlayStates,
  useAnimationManager,
} from './context/AnimationManagerContext';

const ControlsContainer = styled.div`
  display: flex;
`;

const ControlButton = styled.button`
  flex: 1 1 auto;
`;

export const PlayControls = () => {
  const {
    pause,
    resume,
    stepForward,
    stepBackward,
    playState,
  } = useAnimationManager();

  const playPauseButton =
    playState === PlayStates.playing ? (
      <ControlButton onClick={pause}>⏸</ControlButton>
    ) : (
      <ControlButton onClick={resume}>▶</ControlButton>
    );

  return (
    <ControlsContainer>
      <ControlButton onClick={stepBackward}>⏮️</ControlButton>
      {playPauseButton}
      <ControlButton onClick={stepForward}>⏭️</ControlButton>
    </ControlsContainer>
  );
};
