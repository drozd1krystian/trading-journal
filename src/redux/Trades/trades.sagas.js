import { takeLatest, put, call, all, delay } from "redux-saga/effects";
import tradesTypes from "../Trades/trades.types";
import {
  addTradeToDb,
  fetchBalanceFromDb,
  fetchTradesFromDb,
  getCurrentUser,
  getUserId,
  updateUserBalance,
} from "../../firebase/utils";
import {
  addTradeSuccess,
  fetchBalanceSuccess,
  fetchTradesSuccess,
} from "./trades.actions";
import { isLoading } from "../User/user.actions";
import { postError, postLoading, showPopup } from "../Posts/posts.actions";

export function* addTrade({ payload: { trade } }) {
  try {
    yield put(postLoading());
    const { uid } = yield getUserId();
    const docRef = yield addTradeToDb(uid, trade);
    yield put(
      addTradeSuccess({
        id: docRef.id,
        ...trade,
      })
    );
    yield put(postLoading());
    yield put(showPopup("Trade added successfully"));
    yield delay(2000);
    yield put(showPopup(""));
  } catch (err) {
    yield put(postError(err.message));
    console.log(err.message);
  }
}

export function* onAddTradeStart() {
  yield takeLatest(tradesTypes.ADD_TRADE_START, addTrade);
}

export function* fetchBalance() {
  try {
    const { uid } = yield getUserId();
    const balance = yield fetchBalanceFromDb(uid);
    yield put(fetchBalanceSuccess(balance));
  } catch (err) {
    console.log(err.message);
  }
}

export function* onFetchBalanceStart() {
  yield takeLatest(tradesTypes.FETCH_BALANCE_START, fetchBalance);
}

export function* updateBalance({ payload: balance }) {
  try {
    const { uid } = yield getUserId();
    yield updateUserBalance(uid, balance);
  } catch (err) {
    console.log(err);
  }
}

export function* onUpdateBalanceStart() {
  yield takeLatest(tradesTypes.UPDATE_BALANCE_START, updateBalance);
}

export function* fetchTrades() {
  try {
    const { uid } = yield getUserId();

    const trades = yield fetchTradesFromDb(uid);
    yield put(fetchTradesSuccess(trades));
  } catch (err) {
    console.log(err.message);
  }
}

export function* onFetchTradesStart() {
  yield takeLatest(tradesTypes.FETCH_TRADES_START, fetchTrades);
}

export default function* tradesSagas() {
  yield all([
    call(onAddTradeStart),
    call(onFetchBalanceStart),
    call(onUpdateBalanceStart),
    call(onFetchTradesStart),
  ]);
}
