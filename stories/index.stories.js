import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import ipsum from 'lorem-ipsum';

import Docked from '../src/Docked';

const DemoAnchor = ({ innerRef }) => (
  <div
    ref={innerRef}
    style={{ width: '600px', height: '40px', background: 'gray' }}
  />
);
const DemoContent = ({ lines = 1 }) => (
  <div style={{ background: 'lightgray', padding: '10px' }}>
    {ipsum({ count: lines })}
  </div>
);

storiesOf('Docked', module)
  .add('bottom stretch', () => (
    <Docked attachment="bottom" alignment="stretch">
      {({ anchorRef, renderDocked }) => (
        <div>
          <DemoAnchor innerRef={anchorRef} />
          {renderDocked(<DemoContent />)}
        </div>
      )}
    </Docked>
  ))
  .add('bottom center', () => (
    <Docked attachment="bottom" alignment="center">
      {({ anchorRef, renderDocked }) => (
        <div>
          <DemoAnchor innerRef={anchorRef} />
          {renderDocked(<DemoContent />)}
        </div>
      )}
    </Docked>
  ))
  .add('bottom start', () => (
    <Docked attachment="bottom" alignment="start">
      {({ anchorRef, renderDocked }) => (
        <div>
          <DemoAnchor innerRef={anchorRef} />
          {renderDocked(<DemoContent />)}
        </div>
      )}
    </Docked>
  ))
  .add('bottom end', () => (
    <Docked attachment="bottom" alignment="end">
      {({ anchorRef, renderDocked }) => (
        <div>
          <DemoAnchor innerRef={anchorRef} />
          {renderDocked(<DemoContent />)}
        </div>
      )}
    </Docked>
  ));
