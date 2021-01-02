import postsTypes from "./posts.types";

export const addPostStart = (post) => ({
  type: postsTypes.ADD_POST_START,
  payload: post,
});

export const addPostSuccess = (post) => ({
  type: postsTypes.ADD_POST_SUCCESS,
  payload: post,
});
