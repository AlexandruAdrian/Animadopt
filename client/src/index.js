// System
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// Components
import App from './App';
// Store
import store from './config/configStore';
import './styles/root.css';
// Theme
import theme from './styles/theme';
import { ThemeProvider } from '@material-ui/core/styles';

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>,
  MOUNT_NODE
);
