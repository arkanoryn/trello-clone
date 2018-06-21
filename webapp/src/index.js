import React from 'react';
import ReactDOM from 'react-dom';
// import thunkMiddleware from 'redux-thunk';
// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import { createLogger } from 'redux-logger';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import { ProjectsPage } from './pages';
// import { AppLayout }                    from './Layouts/App';
import client from './apollo/client';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// const loggerMiddleware = createLogger();
// const store = createStore(combineReducers({}), applyMiddleware(thunkMiddleware, loggerMiddleware));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <ProjectsPage />
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
