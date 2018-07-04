const OPEN_MODAL = 'NewColumnModal/open';
const CLOSE_MODAL = 'NewColumnModal/close';
const START_LOADING = 'NewColumnModal/startsLoading';
const END_LOADING = 'NewColumnModal/endsLoading';

const initialState = {
  isOpen: false,
  isLoading: false,
};

const newColumnReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return ({
        ...state,
        isOpen: true,
      });

    case CLOSE_MODAL:
      return ({
        ...state,
        isOpen: false,
      });

    case START_LOADING:
      return ({
        ...state,
        isLoading: true,
      });

    case END_LOADING:
      return ({
        ...state,
        isLoading: false,
      });

    default:
      return state;
  }
};

/** ************************************************
 **************************************************
 *****                                        *****
 *****              A C T I O N S             *****
 *****                                        *****
 **************************************************
 ************************************************ */

const open = () => {
  return {
    type: OPEN_MODAL,
  };
};

const close = () => {
  return {
    type: CLOSE_MODAL,
  };
};

const startLoading = () => {
  return {
    type: START_LOADING,
  };
};

const endLoading = () => {
  return {
    type: END_LOADING,
  };
};


const newColumnActions = {
  close,
  open,
  startLoading,
  endLoading,
};

// export default newColumnReducer;
export { newColumnActions, newColumnReducer };
