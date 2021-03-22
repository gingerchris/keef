import React from 'react';

interface MarkupInputProps {
  markup: string;
  setMarkup: (markup: string) => void;
}

export const MarkupInput = ({ markup, setMarkup }: MarkupInputProps) => {
  return (
    <pre style={{ overflow: 'auto' }}>
      <code>{markup}</code>
    </pre>
  );
};
