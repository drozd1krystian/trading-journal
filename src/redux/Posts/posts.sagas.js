import { takeLatest, put, call, all } from "redux-saga/effects";
import { addPostToDb, fetchPosts } from "../../firebase/utils";
import { addPostSuccess, fetchPostsSuccess } from "./posts.actions";
import postsTypes from "./posts.types";

export function* addPost({ payload: { post, uid } }) {
  try {
    yield addPostToDb(post, uid);
    yield put(addPostSuccess(post));
  } catch (err) {
    console.log(err);
  }
}

export function* onAddPostStart() {
  yield takeLatest(postsTypes.ADD_POST_START, addPost);
}

export function* getPosts({ payload: uid }) {
  try {
    const posts = yield fetchPosts(uid);
    yield put(fetchPostsSuccess(posts));
  } catch (err) {
    console.log(err);
  }
}

export function* onFetchPostsStart() {
  yield takeLatest(postsTypes.FETCH_POSTS_START, getPosts);
}

export default function* postsSagas() {
  yield all([call(onAddPostStart), call(onFetchPostsStart)]);
}
