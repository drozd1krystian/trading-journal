import postsTypes from "./posts.types";
import postTypes from "./posts.types";

const INITIAL_STATE = {
  posts: [],
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case postTypes.ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case postsTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: [...action.payload],
      };
    default:
      return {
        ...state,
      };
  }
};

export default postReducer;
