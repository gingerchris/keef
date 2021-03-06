import React, { createRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAnimationManager } from './context/AnimationManagerContext';

interface PlayheadProps {
  width: number;
}

const Playbar = styled.div`
  position: absolute;
  height: 100%;
  width: 0;
  border-left: 1px solid blue;
`;

export const Playhead = ({ width }: PlayheadProps) => {
  const playheadRef = createRef<HTMLDivElement>();
  const { addAnimation } = useAnimationManager();

  const playheadKeyframes = [
    { transform: 'none' },
    { transform: `translateX(${width}px)` },
  ];

  useEffect(() => {
    if (playheadRef.current) {
      addAnimation(playheadRef.current, playheadKeyframes);
    }
  }, [playheadRef]);

  return <Playbar ref={playheadRef} />;
};
