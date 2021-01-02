import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import postsReducer from "./Posts/posts.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

export default rootReducer;
