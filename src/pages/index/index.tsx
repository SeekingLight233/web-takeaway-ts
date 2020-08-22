import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../Models/dva';
import Router from './Router/index';

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  ReactDom.hydrate(
    <Provider store={store}>
      <Router></Router>
    </Provider>,
    rootElement
  );
} else {
  ReactDom.render(
    <Provider store={store}>
      <Router></Router>
    </Provider>,
    rootElement
  );
}
