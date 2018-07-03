const OPEN_MODAL = 'NewColumnModal/open';
const CLOSE_MODAL = 'NewColumnModal/close';

const initialState = {
  isOpen: false,
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


const newColumnActions = {
  close,
  open,
};

// export default newColumnReducer;
export { newColumnActions, newColumnReducer };
