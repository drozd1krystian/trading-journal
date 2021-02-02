import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  userError: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.EMAIL_SIGN_IN_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
        userError: "",
      };
    }
    case userTypes.IS_LOADING: {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    }

    case userTypes.USER_ERROR: {
      return {
        ...state,
        userError: action.payload,
      };
    }

    case userTypes.UPDATE_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload,
        userError: "",
      };
    }
    case userTypes.CHANGE_USER_PASSWORD_SUCCESS: {
      return {
        ...state,
        userError: "",
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
