import postsTypes from "./posts.types";

export const addPostStart = (postData) => ({
  type: postsTypes.ADD_POST_START,
  payload: postData,
});

export const addPostSuccess = (post) => ({
  type: postsTypes.ADD_POST_SUCCESS,
  payload: post,
});

export const fetchPostsStart = (uid) => ({
  type: postsTypes.FETCH_POSTS_START,
  payload: uid,
});

export const fetchPostsSuccess = (posts) => ({
  type: postsTypes.FETCH_POSTS_SUCCESS,
  payload: posts,
});
