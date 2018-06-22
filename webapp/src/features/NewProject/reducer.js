const START_LOADING = 'NEW_PROJECT_STARTS_LOADING';
const END_LOADING = 'NEW_PROJECT_ENDS_LOADING';

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

const initialState = {
  isLoading: false,
};

const newProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case END_LOADING:
      return ({
        ...state,
        isLoading: false,
      });

    case START_LOADING:
      return ({
        ...state,
        isLoading: true,
      });

    default:
      return state;
  }
};

export default newProjectReducer;
export {
  startLoading,
  endLoading,
};
