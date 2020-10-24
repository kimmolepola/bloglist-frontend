import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import PromisePolyfill from 'promise-polyfill';

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};

if (!window.Promise) {
  window.Promise = PromisePolyfill;
};

render();
store.subscribe(render);
