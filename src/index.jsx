import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer, module, render } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import App from './app.jsx';

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>
  , document.getElementById('app') );

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app', () => {
    render(App)
  });
}
