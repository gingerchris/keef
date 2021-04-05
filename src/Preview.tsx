import React, { createRef } from 'react';
import { useAnimationManager } from './context/AnimationManagerContext';

interface PreviewProps {
  markup: string;
  tracks: Track[];
}

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
    <iframe
      sandbox="allow-same-origin"
      srcDoc={srcDoc}
      ref={iframeRef}
      onLoad={onIframeLoad}
    />
  );
};
