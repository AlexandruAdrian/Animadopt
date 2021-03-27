// System
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// Components
import App from './App';
import Loading from './components/Loading';
import { ToastContainer, Slide } from 'react-toastify';
// Store
import store from './config/configStore';
import './styles/root.css';
// Theme
import theme from './styles/theme';
import { ThemeProvider } from '@material-ui/core/styles';
// Toastify styles
import 'react-toastify/dist/ReactToastify.min.css';

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    <ToastContainer
      transition={Slide}
      autoClose={2500}
      draggablePercent={40}
      draggable={true}
      position={'bottom-left'}
      limit={4}
    />
  </Provider>,
  MOUNT_NODE
);
