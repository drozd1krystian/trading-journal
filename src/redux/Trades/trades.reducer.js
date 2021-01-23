import tradesTypes from "./trades.types";

const INITIAL_STATE = {
  trades: [],
  balance: {
    dates: [],
    values: [],
  },
};

const tradesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case tradesTypes.ADD_TRADE_SUCCESS:
      return {
        ...state,
        trades: [...state.trades, action.payload],
      };
    case tradesTypes.FETCH_BALANCE_SUCCESS: {
      return {
        ...state,
        balance: {
          ...state.balance,
          ...action.payload,
        },
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default tradesReducer;
