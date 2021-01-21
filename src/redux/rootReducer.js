import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import postsReducer from "./Posts/posts.reducer";
import modalReducer from "./Modal/modal.reducer";
import tradesReducer from "./Trades/trades.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  modal: modalReducer,
  trades: tradesReducer,
});

export default rootReducer;
