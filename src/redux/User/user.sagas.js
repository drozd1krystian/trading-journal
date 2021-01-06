import { takeLatest, put, call, all } from "redux-saga/effects";
import userTypes from "./user.types";
import { isLoading, signInSuccess, signOutSuccess } from "./user.actions";
import { auth, handleUserProfile, getCurrentUser } from "../../firebase/utils";
import firebase from "firebase/app";

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  try {
    const userRef = yield call(handleUserProfile, {
      userAuth: user,
      additionalData,
    });
    const snapshot = yield userRef.get();
    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data(),
      })
    );
  } catch (err) {
    // console.log(err)
  }
}

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return auth.signInWithEmailAndPassword(email, password);
      });
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    console.log(err);
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}
export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) {
      yield put(isLoading());
      return;
    }
    yield getSnapshotFromUserAuth(userAuth);
  } catch (err) {
    // console.log(err)
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* emailSignUp({ payload: { email, password, name } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const additionaldata = { name };
    yield getSnapshotFromUserAuth(user, additionaldata);
  } catch (err) {
    console.log(err);
  }
}

export function* onSignUpUserStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_UP_START, emailSignUp);
}

export function* signOut() {
  yield auth.signOut();
  yield put(signOutSuccess());
}

export function* onSignOutStart() {
  yield takeLatest(userTypes.SIGN_OUT_START, signOut);
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignUpUserStart),
    call(onSignOutStart),
  ]);
}
