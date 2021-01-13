import { takeLatest, put, call, all, delay } from "redux-saga/effects";
import {
  addPostToDb,
  editPost,
  fetchPosts,
  getUserId,
  deletePostInDb,
} from "../../firebase/utils";
import {
  modalError,
  clearModalState,
  triggerDone,
  triggerLoading,
} from "../Modal/modal.actions";
import {
  addPostSuccess,
  fetchPostsSuccess,
  postLoading,
  postError,
  updatePostSuccess,
  deletePostSuccess,
  showPopup,
} from "./posts.actions";
import postsTypes from "./posts.types";

export function* addPost({ payload: { post, uid } }) {
  try {
    yield put(postLoading());
    yield addPostToDb(post, uid);
    yield delay(1000);
    yield put(addPostSuccess(post));
    yield put(showPopup());
    yield delay(2000);
    yield put(showPopup());
  } catch (err) {
    yield put(postError(err.message));
  }
}

export function* onAddPostStart() {
  yield takeLatest(postsTypes.ADD_POST_START, addPost);
}

export function* getPosts({ payload: { user, dateRange, search } }) {
  try {
    const posts = yield fetchPosts(user, dateRange, search);
    yield put(fetchPostsSuccess(posts));
  } catch (err) {
    console.log(err);
  }
}

export function* onFetchPostsStart() {
  yield takeLatest(postsTypes.FETCH_POSTS_START, getPosts);
}

export function* updatePost({ payload: { post, doc } }) {
  try {
    yield put(postLoading());
    const { uid } = yield getUserId();
    yield editPost(uid, doc, post);
    yield put(updatePostSuccess({ post, doc }));
  } catch (err) {
    yield put(postError(err.message));
  }
}

export function* onUpdatePostStart() {
  yield takeLatest(postsTypes.UPDATE_POST_START, updatePost);
}

export function* deletePost({ payload: id }) {
  try {
    const { uid } = yield getUserId();
    yield put(triggerLoading());
    yield deletePostInDb(uid, id);
    yield put(deletePostSuccess(id));
    yield put(triggerDone());
    yield put(clearModalState());
  } catch (err) {
    yield put(modalError());
    yield put(triggerDone());
    yield put(clearModalState());
  }
}

export function* onDeletePostStart() {
  yield takeLatest(postsTypes.DELETE_POST_START, deletePost);
}

export default function* postsSagas() {
  yield all([
    call(onAddPostStart),
    call(onFetchPostsStart),
    call(onUpdatePostStart),
    call(onDeletePostStart),
  ]);
}
