import React from 'react';
import { configure, addDecorator } from '@storybook/react';

const Center = storyFn => (
  <div style={{ display: 'flex', width: '100%', height: '100%' }}>
    <style>{`body, html, #root { margin: 0; width: 100%; height: 100%; } * { box-sizing: border-box; }`}</style>
    <div style={{ margin: 'auto' }}>
      {storyFn()}
    </div> 
  </div>
);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  addDecorator(Center);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
