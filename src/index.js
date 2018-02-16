import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import App from './Shared/containers/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import './index.css';

const Router = window.matchMedia('(display-mode: standalone)').matches
  ? HashRouter
  : BrowserRouter;

const theme = createMuiTheme();

localStorage.token = `O7UlK9QkLiM4AqSTV8m6EOp17GYiNV`;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
