import postsTypes from "./posts.types";
import postTypes from "./posts.types";

const INITIAL_STATE = {
  posts: [],
  errors: [],
  isLoading: false,
  showPopup: false,
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case postTypes.ADD_POST_SUCCESS:
      return {
        ...state,
        errors: [],
        posts: [...state.posts, action.payload],
        isLoading: false,
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
        errors: [],
        posts: [...clone],
        isLoading: false,
      };
    }
    case postsTypes.POST_ERROR: {
      return {
        ...state,
        errors: [...state.errors, action.payload],
        isLoading: false,
      };
    }
    case postTypes.POST_IS_LOADING: {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    }

    case postsTypes.SHOW_POPUP: {
      return {
        ...state,
        showPopup: !state.showPopup,
      };
    }

    case postTypes.DELETE_POST_SUCCESS: {
      return {
        ...state,
        posts: state.posts.filter((el) => el.id !== action.payload),
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default postReducer;
