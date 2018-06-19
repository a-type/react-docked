import React from 'react';

import { storiesOf } from '@storybook/react';
import Draggable from 'react-draggable';

import ipsum from 'lorem-ipsum';

import Docked from '../src/Docked';
import balloon from '../src/middleware/balloon';

const colors = ['#ffb400', '#ea5455'];
const dark = '#2d4059';
const white = '#f6f6f6';

const DemoAnchor = ({ innerRef, children }) => (
  <div
    ref={innerRef}
    style={{ width: '33.3333vw', height: '33.3333vw', background: dark, color: white }}
  >{children || 'anchor'}</div>
);
const DemoContent = ({ lines = 1, background = colors[0], color = white }) => (
  <div style={{ background, padding: '10px', width: '100%', height: '100%' }}>
    {ipsum({ count: lines })}
  </div>
);

['bottom', 'top', 'left', 'right'].forEach(attachment => {
  const stories = storiesOf(attachment, module);

  ['stretch', 'center', 'start', 'end'].forEach(alignment => {
    stories.add(alignment, () => (
      <Docked attachment={attachment} alignment={alignment}>
        {({ anchorRef, renderDocked }) => (
          <div>
            <DemoAnchor innerRef={anchorRef} />
            {renderDocked(<DemoContent />)}
          </div>
        )}
      </Docked>
    ));
    stories.add(`${alignment} + balloon`, () => (
      <Docked attachment={attachment} alignment={alignment} middleware={balloon({ color: colors[Math.floor(Math.random() * 2)]})}>
        {({ anchorRef, renderDocked }) => (
          <div>
            <DemoAnchor innerRef={anchorRef} />
            {renderDocked(<DemoContent background="transparent" />)}
          </div>
        )}
      </Docked>
    ));
  });
});
