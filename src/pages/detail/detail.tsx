import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import Router from './Router/index';
import store from '../../Models/dva';

ReactDom.render(
  <Provider store={store}>
    <Router></Router>
  </Provider>,
  document.getElementById('root')
);
