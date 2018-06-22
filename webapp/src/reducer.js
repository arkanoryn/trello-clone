import { combineReducers } from 'redux';

import { newProjectReducer } from './features';

const rootReducer = combineReducers({
  projects: combineReducers({
    newProject: newProjectReducer,
  }),
});

export default rootReducer;
