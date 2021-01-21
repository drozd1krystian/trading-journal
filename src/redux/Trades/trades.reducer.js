import tradesTypes from "./trades.types";

const INITIAL_STATE = {
  trades: [],
};

const tradesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case tradesTypes.ADD_TRADE_SUCCESS:
      return {
        ...state,
        trades: [...state.trades, action.payload],
      };
    default:
      return {
        ...state,
      };
  }
};

export default tradesReducer;
