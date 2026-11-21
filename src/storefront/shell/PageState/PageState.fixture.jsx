import React from 'react';
import {usePageLogic} from '../page-state.js';

export function Fixture() {
  const page = usePageLogic({}, page => {
    page.state = {count: 0};
  });
  const count = React.useRef(null);
  const report = React.useRef(null);

  function update() {
    const observations = [];
    page.setState({count: 1}, () => {
      observations.push('First callback saw DOM ' + count.current.textContent);
    });
    observations.push('Immediate state ' + page.state.count + ', DOM ' + count.current.textContent);
    page.setState(
      state => ({count: state.count + 1}),
      () => {
        observations.push('Second callback saw DOM ' + count.current.textContent);
        report.current.textContent = observations.join(' | ');
      }
    );
    observations.push('Immediate state ' + page.state.count + ', DOM ' + count.current.textContent);
  }

  return (
    <div>
      <button onClick={update}>Update twice</button>
      <span ref={count}>{page.state.count}</span>
      <output ref={report} />
    </div>
  );
}
