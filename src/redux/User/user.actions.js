import userTypes from "./user.types";

export const emailSignInStart = (userCredentials) => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const signInSuccess = (user) => ({
  type: userTypes.EMAIL_SIGN_IN_SUCCESS,
  payload: user,
});

export const checkUserSession = (user) => ({
  type: userTypes.CHECK_USER_SESSION,
});

export const emailSignUpStart = (userCredentials) => ({
  type: userTypes.EMAIL_SIGN_UP_START,
  payload: userCredentials,
});

export const signOutStart = () => ({
  type: userTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: userTypes.SIGN_OUT_SUCCESS,
});
