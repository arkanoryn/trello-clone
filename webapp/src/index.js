import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { renderRoutes } from 'react-router-config';

import client from './apollo/client';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import routes from './pages/routes';

const loggerMiddleware = createLogger();
const middlewares = [thunkMiddleware, loggerMiddleware];
const store = createStore(combineReducers({}), applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Router>
        {renderRoutes(routes)}
      </Router>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
