import React, { createRef } from 'react';
import styled from 'styled-components';
import { useAnimationManager } from './context/AnimationManagerContext';
import { PlayControls } from './PlayControls';

interface PreviewProps {
  markup: string;
  tracks: Track[];
}

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Preview = ({ markup, tracks }: PreviewProps) => {
  const iframeRef = createRef<HTMLIFrameElement>();
  const { addAnimation } = useAnimationManager();

  const onIframeLoad = () => {
    const { contentWindow } = iframeRef.current!;

    tracks.forEach((track) => {
      const keyframes = track.keyframes
        .reduce((keyframes: Keyframe[], keyframe: TrackKeyframe) => {
          const frames = keyframe.percentages.map((percentage) => ({
            ...keyframe.styles,
            offset: percentage / 100,
          }));
          return [...keyframes, ...frames];
        }, [])
        .sort((a, b) => a.offset! - b.offset!);

      const elements = track.selectors.flatMap((selector) => {
        return Array.from(contentWindow!.document.querySelectorAll(selector));
      });

      elements.forEach((element) => addAnimation(element, keyframes));
    });
  };

  const srcDoc = `
    <!DOCTYPE html>
    <html lang="en" >
      <body>
        ${markup}
      </body>
    </html>
  `;
  return (
    <PreviewContainer>
      <iframe
        sandbox="allow-same-origin"
        srcDoc={srcDoc}
        ref={iframeRef}
        onLoad={onIframeLoad}
      />
      <PlayControls />
    </PreviewContainer>
  );
};
