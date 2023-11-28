// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import AppContainer from './containers/AppContainer';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>,
  document.getElementById('root')
);

// ... (保留其余部分)
