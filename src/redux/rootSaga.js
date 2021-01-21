import { all, call } from "redux-saga/effects";
import postsSagas from "./Posts/posts.sagas";
import userSagas from "./User/user.sagas";
import tradesSagas from "./Trades/trades.sagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(postsSagas), call(tradesSagas)]);
}
