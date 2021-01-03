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
    case postsTypes.UPDATE_POST_SUCCESS: {
      const clone = [...state.posts];
      const { post, doc } = action.payload;
      const id = clone.findIndex((el) => el.id === doc);
      clone[id] = { ...post, id: doc };
      return {
        ...state,
        posts: [...clone],
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default postReducer;
