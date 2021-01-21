import { takeLatest, put, call, all, delay } from "redux-saga/effects";
import tradesTypes from "../Trades/trades.types";
import { addTradeToDb, getUserId } from "../../firebase/utils";
import { addTradeSuccess } from "./trades.actions";

export function* addTrade({ payload: trade }) {
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

export default function* tradesSagas() {
  yield all([call(onAddTradeStart)]);
}
