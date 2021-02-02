import { takeLatest, put, call, all, delay } from "redux-saga/effects";
import tradesTypes from "../Trades/trades.types";
import {
  addTradeToDb,
  editTradeInDb,
  fetchBalanceFromDb,
  fetchTradesFromDb,
  getUserId,
  removeTradeFromDb,
  updateUserBalance,
} from "../../firebase/utils";
import {
  addTradeSuccess,
  editTradeSuccess,
  fetchBalanceSuccess,
  fetchTradesSuccess,
  removeTradeSuccess,
  updateBalanceSuccess,
} from "./trades.actions";
import { postError, postLoading, showPopup } from "../Posts/posts.actions";
import {
  clearModalState,
  modalError,
  triggerDone,
  triggerLoading,
} from "../Modal/modal.actions";

export function* addTrade({ payload: { trade, id } }) {
  try {
    yield put(postLoading());
    const { uid } = yield getUserId();
    const docRef = yield addTradeToDb(uid, trade, id);
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
    yield put(updateBalanceSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* onUpdateBalanceStart() {
  yield takeLatest(tradesTypes.UPDATE_BALANCE_START, updateBalance);
}

export function* fetchTrades({ payload: filters }) {
  try {
    const { uid } = yield getUserId();

    const trades = yield fetchTradesFromDb(uid, filters);
    yield put(fetchTradesSuccess(trades));
  } catch (err) {
    console.log(err.message);
  }
}

export function* onFetchTradesStart() {
  yield takeLatest(tradesTypes.FETCH_TRADES_START, fetchTrades);
}

export function* removeTrade({ payload: trade }) {
  try {
    const { uid } = yield getUserId();
    yield put(triggerLoading());
    yield removeTradeFromDb(uid, trade.id);
    yield put(removeTradeSuccess(trade));
    yield put(triggerDone());
    yield put(clearModalState());
  } catch (err) {
    yield put(modalError());
    yield put(triggerDone());
    yield put(clearModalState());
  }
}

export function* onRemoveTradeStart() {
  yield takeLatest(tradesTypes.REMOVE_TRADE_START, removeTrade);
}

export function* editTrade({ payload: { trade, id } }) {
  try {
    yield put(postLoading());
    const { uid } = yield getUserId();
    yield editTradeInDb(uid, trade, id);
    yield put(editTradeSuccess({ trade, id }));
    yield put(postLoading());
    yield put(showPopup("Trade edited successfully"));
    yield delay(2000);
    yield put(showPopup(""));
  } catch (err) {
    yield put(postError(err.message));
    console.log(err.message);
  }
}

export function* onEditTradeStart() {
  yield takeLatest(tradesTypes.EDIT_TRADE_START, editTrade);
}

export default function* tradesSagas() {
  yield all([
    call(onAddTradeStart),
    call(onFetchBalanceStart),
    call(onUpdateBalanceStart),
    call(onFetchTradesStart),
    call(onRemoveTradeStart),
    call(onEditTradeStart),
  ]);
}
