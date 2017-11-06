import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';  
import { createLogger } from 'redux-logger';
import silentParty from './reducers';

import './main.css';
import 'tachyons';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const loggerMiddleware = createLogger()

const store = createStore(
  silentParty,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
	document.getElementById('root'));
registerServiceWorker();
