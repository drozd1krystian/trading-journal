import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import postsReducer from "./Posts/posts.reducer";
import modalReducer from "./Modal/modal.reducer";
import tradesReducer from "./Trades/trades.reducer";

const appReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  modal: modalReducer,
  trades: tradesReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
