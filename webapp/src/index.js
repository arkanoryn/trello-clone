import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { BrowserRouter as Router } from 'react-router-dom';

// import { AppLayout }                    from './Layouts/App';
import { ProjectsPage } from './pages';

const loggerMiddleware = createLogger();
let store = createStore(combineReducers({}),
    applyMiddleware(thunkMiddleware, loggerMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ProjectsPage />
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
