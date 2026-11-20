import React from 'react';
import {CodeInput} from './CodeInput.jsx';

export function Fixture() {
  const [code, setCode] = React.useState('');
  const [completed, setCompleted] = React.useState('');
  return (
    <div>
      <CodeInput id="code" label="Code" value={code} onChange={setCode} onComplete={setCompleted} />
      <output data-test="code">{code}</output>
      <output data-test="completed">{completed}</output>
    </div>
  );
}
