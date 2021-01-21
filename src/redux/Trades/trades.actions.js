import tradesTypes from "./trades.types";

export const addTradeStart = (trade) => ({
  type: tradesTypes.ADD_TRADE_START,
  payload: trade,
});

export const addTradeSuccess = (trade) => ({
  type: tradesTypes.ADD_TRADE_SUCCESS,
  payload: trade,
});
