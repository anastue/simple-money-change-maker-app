import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import utils from './utils';

import App from './components/app';

/* Import CSS */
import './css/bootstrap.css';

/*
 * TODO: Need redux?
 */

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('money_change_maker_app')
);
