import { takeLatest, put, call, all } from "redux-saga/effects";
import { addPostToDb, getCurrentUser } from "../../firebase/utils";
import { addPostSuccess } from "./posts.actions";
import postsTypes from "./posts.types";

export function* addPost({ payload: post }) {
  try {
    const user = getCurrentUser();
    yield addPostToDb(post, user.uid);
    yield put(addPostSuccess(post));
  } catch (err) {
    console.log(err);
  }
}

export function* onAddPostStart() {
  yield takeLatest(postsTypes.ADD_POST_START, addPost);
}

export default function* postsSagas() {
  yield all([call(onAddPostStart)]);
}
