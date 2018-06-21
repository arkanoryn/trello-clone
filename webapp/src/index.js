import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProjectsPage } from './pages';
// import { AppLayout }                    from './Layouts/App';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

const loggerMiddleware = createLogger();
const store = createStore(combineReducers({}), applyMiddleware(thunkMiddleware, loggerMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ProjectsPage />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
