import modalTypes from "./modal.types";

const INITIAL_STATE = {
  show: false,
  loading: false,
  done: false,
  error: "",
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case modalTypes.SHOW: {
      return {
        ...state,
        show: !state.show,
      };
    }
    case modalTypes.LOADING: {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    case modalTypes.DONE: {
      return {
        ...state,
        done: !state.done,
      };
    }
    case modalTypes.MODAL_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default modalReducer;
