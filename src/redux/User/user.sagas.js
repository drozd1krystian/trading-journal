import { takeLatest, put, call, all, delay } from "redux-saga/effects";
import userTypes from "./user.types";
import {
  isLoading,
  resetStore,
  signInSuccess,
  signOutSuccess,
  updateUserProfileSuccess,
  userError,
} from "./user.actions";
import {
  auth,
  handleUserProfile,
  getCurrentUser,
  updateUserInDb,
} from "../../firebase/utils";
import firebase from "firebase/app";
import { fetchBalanceStart } from "../Trades/trades.actions";
import { postError, postLoading, showPopup } from "../Posts/posts.actions";

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
    yield put(fetchBalanceStart());
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
    yield put(fetchBalanceStart());
    yield getSnapshotFromUserAuth(userAuth);
  } catch (err) {
    // console.log(err)
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* emailSignUp({
  payload: { email, password, firstName, lastName },
}) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const additionaldata = { firstName, lastName };
    yield getSnapshotFromUserAuth(user, additionaldata);
    yield put(fetchBalanceStart());
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
  yield put(resetStore());
}

export function* onSignOutStart() {
  yield takeLatest(userTypes.SIGN_OUT_START, signOut);
}

export function* updateUser({ payload: { user, id } }) {
  try {
    yield put(postLoading());
    yield updateUserInDb(user, id);
    yield put(updateUserProfileSuccess({ ...user, id }));
    yield put(postLoading());
    yield put(showPopup("User updated successfully"));
    yield delay(2000);
    yield put(showPopup(""));
  } catch (err) {
    yield put(postError(err.message));
    yield put(userError(err.message));
    console.log(err);
  }
}

export function* onUpdateUserProfileStart() {
  yield takeLatest(userTypes.UPDATE_USER_PROFILE_START, updateUser);
}

export function* changePassword({ payload: userCredentials }) {
  try {
    const { oldPass, newPass } = userCredentials;
    yield put(postLoading());
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield auth.signInWithEmailAndPassword(userAuth.email, oldPass);
    yield userAuth.updatePassword(newPass);
    yield put(postLoading());
    yield put(showPopup("Password changed successfully"));
    yield delay(2000);
    yield put(showPopup(""));
  } catch (err) {
    yield put(postError(err.message));
    yield put(userError(err.message));
    console.log(err);
  }
}

export function* onChangePasswordStart() {
  yield takeLatest(userTypes.CHANGE_USER_PASSWORD_START, changePassword);
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignUpUserStart),
    call(onSignOutStart),
    call(onUpdateUserProfileStart),
    call(onChangePasswordStart),
  ]);
}
