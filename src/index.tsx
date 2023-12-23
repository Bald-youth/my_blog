// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import AppContainer from './containers/AppContainer';

const root = document.getElementById('root');

// 直接使用 ReactDOM.render 渲染应用
ReactDOM.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>,
  root
);


