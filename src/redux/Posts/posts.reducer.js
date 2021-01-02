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
    default:
      return {
        ...state,
      };
  }
};

export default postReducer;
