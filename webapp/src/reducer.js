import { combineReducers } from 'redux';

import {
  newColumnReducer,
  newProjectReducer,
  ticketFormModalReducer,
} from './features';

const rootReducer = combineReducers({
  columns: combineReducers({
    newColumn: newColumnReducer,
  }),
  projects: combineReducers({
    newProject: newProjectReducer,
  }),
  tickets: combineReducers({
    ticketFormModal: ticketFormModalReducer,
  }),
});

export default rootReducer;
