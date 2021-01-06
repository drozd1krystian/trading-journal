import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.EMAIL_SIGN_IN_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    }
    case userTypes.IS_LOADING: {
      return {
        isLoading: !state.isLoading,
      };
    }
    case userTypes.SIGN_OUT_SUCCESS: {
      return {
        state: { ...INITIAL_STATE },
      };
    }

    default:
      return state;
  }
};

export default userReducer;
