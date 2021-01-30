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

export const fetchTradesStart = (filters) => ({
  type: tradesTypes.FETCH_TRADES_START,
  payload: filters,
});

export const fetchTradesSuccess = (trades) => ({
  type: tradesTypes.FETCH_TRADES_SUCCESS,
  payload: trades,
});

export const filterTrades = (filters) => ({
  type: tradesTypes.FILTER_TRADES,
  payload: filters,
});

export const removeTradeStart = (tradeId) => ({
  type: tradesTypes.REMOVE_TRADE_START,
  payload: tradeId,
});

export const removeTradeSuccess = (tradeId) => ({
  type: tradesTypes.REMOVE_TRADE_SUCCESS,
  payload: tradeId,
});

export const editTradeStart = (trade) => ({
  type: tradesTypes.EDIT_TRADE_START,
  payload: trade,
});

export const editTradeSuccess = (trade) => ({
  type: tradesTypes.EDIT_TRADE_SUCCESS,
  payload: trade,
});
