import React from 'react';

interface PreviewProps {
  markup: string;
  animationStyles: string;
}

export const Preview = ({ markup, animationStyles }: PreviewProps) => {
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
  return <iframe sandbox="allow-same-origin" srcDoc={srcDoc} />;
};
