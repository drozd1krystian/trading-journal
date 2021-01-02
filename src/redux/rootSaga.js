import { all, call } from "redux-saga/effects";
import postsSagas from "./Posts/posts.sagas";
import userSagas from "./User/user.sagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(postsSagas)]);
}
