import postsTypes from "./posts.types";

export const addPostStart = (postData) => ({
  type: postsTypes.ADD_POST_START,
  payload: postData,
});

export const addPostSuccess = (post) => ({
  type: postsTypes.ADD_POST_SUCCESS,
  payload: post,
});

export const fetchPostsStart = (filters) => ({
  type: postsTypes.FETCH_POSTS_START,
  payload: filters,
});

export const fetchPostsSuccess = (posts) => ({
  type: postsTypes.FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const updatePostStart = (post) => ({
  type: postsTypes.UPDATE_POST_START,
  payload: post,
});

export const updatePostSuccess = (postData) => ({
  type: postsTypes.UPDATE_POST_SUCCESS,
  payload: postData,
});

export const postError = (message) => ({
  type: postsTypes.POST_ERROR,
  payload: message,
});

export const postLoading = () => ({
  type: postsTypes.POST_IS_LOADING,
});

export const showPopup = (message) => ({
  type: postsTypes.SHOW_POPUP,
  payload: message,
});

export const deletePostStart = (id) => ({
  type: postsTypes.DELETE_POST_START,
  payload: id,
});

export const deletePostSuccess = (id) => ({
  type: postsTypes.DELETE_POST_SUCCESS,
  payload: id,
});
