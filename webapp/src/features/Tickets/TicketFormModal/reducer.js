const OPEN_MODAL = 'TicketFormModal/open';
const CLOSE_MODAL = 'TicketFormModal/close';
const START_LOADING = 'TicketFormModal/startsLoading';
const END_LOADING = 'TicketFormModal/endsLoading';

const initialState = {
  isOpen:    false,
  isLoading: false,
};

const ticketFormModalReducer = (state = initialState, action) => {
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


const ticketFormModalActions = {
  close,
  open,
  startLoading,
  endLoading,
};

// export default newColumnReducer;
export {
  ticketFormModalActions,
  ticketFormModalReducer,
};
