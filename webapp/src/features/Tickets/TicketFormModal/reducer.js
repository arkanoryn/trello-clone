const OPEN_MODAL = 'TicketFormModal/open';
const CLOSE_MODAL = 'TicketFormModal/close';
const START_LOADING = 'TicketFormModal/startsLoading';
const END_LOADING = 'TicketFormModal/endsLoading';

const initialState = {
  isOpen:    false,
  isLoading: false,
  ticket:    {},
  columnId:  -1,
};

const ticketFormModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return ({
        ...state,
        isOpen:   true,
        ticket:   action.ticket,
        columnId: parseInt(action.columnId, 0),
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

const open = (columnId, ticket = {}) => {
  return {
    type: OPEN_MODAL,
    ticket,
    columnId,
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
