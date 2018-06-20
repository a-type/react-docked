import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';

import Home from './pages/index';

injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

:root {
  --color-white: #ffffff;
  --color-light: #f6f6f6;
  --color-primary: #ffb400;
  --color-primary-dark: #af7400;
  --color-secondary: #ea5455;
  --color-dark: #2d4059;
}
html, body {
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  background: var(--color-light);
  color: var(--color-dark);
  font-size: 16px;
}

* {
  box-sizing: border-box;
}
`;

ReactDOM.render(<Home />, document.getElementById('main'));
