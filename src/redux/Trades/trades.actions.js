import tradesTypes from "./trades.types";

export const addTradeStart = (data) => ({
  type: tradesTypes.ADD_TRADE_START,
  payload: data,
});

export const addTradeSuccess = (data) => ({
  type: tradesTypes.ADD_TRADE_SUCCESS,
  payload: data,
});

export const fetchBalanceStart = () => ({
  type: tradesTypes.FETCH_BALANCE_START,
});

export const fetchBalanceSuccess = (balance) => ({
  type: tradesTypes.FETCH_BALANCE_SUCCESS,
  payload: balance,
});

export const updateBalanceStart = (balance) => ({
  type: tradesTypes.UPDATE_BALANCE_START,
  payload: balance,
});

export const fetchTradesStart = () => ({
  type: tradesTypes.FETCH_TRADES_START,
});

export const fetchTradesSuccess = (trades) => ({
  type: tradesTypes.FETCH_TRADES_SUCCESS,
  payload: trades,
});
