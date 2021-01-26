import { takeLatest, put, call, all, delay } from "redux-saga/effects";
import tradesTypes from "../Trades/trades.types";
import {
  addTradeToDb,
  fetchBalanceFromDb,
  getUserId,
  updateUserBalance,
} from "../../firebase/utils";
import { addTradeSuccess, fetchBalanceSuccess } from "./trades.actions";

export function* addTrade({ payload: { trade, balance } }) {
  try {
    const { uid } = yield getUserId();
    const docRef = yield addTradeToDb(uid, trade);
    yield put(
      addTradeSuccess({
        id: docRef.id,
        ...trade,
      })
    );
  } catch (err) {
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

export default function* tradesSagas() {
  yield all([
    call(onAddTradeStart),
    call(onFetchBalanceStart),
    call(onUpdateBalanceStart),
  ]);
}
