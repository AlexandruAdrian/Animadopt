// System
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// Components
import App from './App';
// Store
import store from './config/configStore';

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  MOUNT_NODE
);
