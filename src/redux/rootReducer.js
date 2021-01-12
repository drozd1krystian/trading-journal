import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import postsReducer from "./Posts/posts.reducer";
import modalReducer from "./Modal/modal.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  modal: modalReducer,
});

export default rootReducer;
