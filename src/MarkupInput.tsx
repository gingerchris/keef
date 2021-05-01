import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/mode/xml/xml';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

interface MarkupInputProps {
  markup: string;
  setMarkup: (markup: string) => void;
}

export const MarkupInput = ({ markup, setMarkup }: MarkupInputProps) => {
  return (
    <CodeMirror
      value={markup}
      options={{
        mode: 'xml',
        theme: 'material',
        lineNumbers: true,
        lineWrapping: true,
        tabSize: 2
      }}
      onBeforeChange={(editor, data, value) => {
        setMarkup(value);
      }}
      onChange={(editor, data, value) => {
        setMarkup(value);
      }}
    />
  );
};
