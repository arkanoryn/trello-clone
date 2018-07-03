import { combineReducers } from 'redux';

import {
  newColumnReducer,
  newProjectReducer,
} from './features';

const rootReducer = combineReducers({
  projects: combineReducers({
    newProject: newProjectReducer,
  }),
  columns: combineReducers({
    newColumn: newColumnReducer,
  }),
});

export default rootReducer;
