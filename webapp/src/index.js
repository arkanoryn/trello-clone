import React from 'react';
import ReactDOM from 'react-dom';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { ApolloProvider } from 'react-apollo';
import { createBrowserHistory } from 'history';

import client from './apollo/client';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import routes from './pages/routes';

/* eslint-disable */
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const history = createBrowserHistory();
const loggerMiddleware = createLogger();

const middlewares = [
  thunkMiddleware,
  loggerMiddleware,
  routerMiddleware(history),
];

const tmpReducer = (state = {}, action) => {
  switch (action.type) {
    case 'test': {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

const store = createStore(
  connectRouter(history)(combineReducers({ tmpReducer })),
  composeEnhancer(applyMiddleware(...middlewares)),
);

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <ConnectedRouter history={history}>
        {renderRoutes(routes)}
      </ConnectedRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
