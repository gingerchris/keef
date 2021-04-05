import React, { createRef, useEffect } from 'react';

interface PreviewProps {
  markup: string;
  tracks: Track[];
  animationStyles: string;
}

export const Preview = ({ markup, animationStyles }: PreviewProps) => {
  const iframeRef = createRef<HTMLIFrameElement>();

  useEffect(() => {
    if (iframeRef.current) {
      // iframe initialised
    }
  }, [iframeRef]);
  const srcDoc = `
    <!DOCTYPE html>
    <html lang="en" >

    <head>

    
    <style>
      ${animationStyles}
    </style>

    </head>

    <body translate="no" >
      ${markup}
    </body>
    </html>
  `;
  return <iframe sandbox="" srcDoc={srcDoc} ref={iframeRef} />;
};
