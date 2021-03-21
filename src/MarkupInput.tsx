import React from 'react';

interface MarkupInputProps {
  markup: string;
  setMarkup: (markup: string) => void;
}

export const MarkupInput = ({ markup, setMarkup }: MarkupInputProps) => {
  return (
    <pre>
      <code>{markup}</code>
    </pre>
  );
};
