import tradesTypes from "./trades.types";

const INITIAL_STATE = {
  trades: [],
  balance: {
    dates: [],
    values: [],
    balance: [],
  },
};

const tradesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case tradesTypes.ADD_TRADE_SUCCESS: {
      const balance = state.balance;
      const trade = action.payload;
      const formattedDate = `${trade.date.getFullYear()}-${
        trade.date.getMonth() + 1
      }-${trade.date.getDate()}`;
      const dateIndex = balance.dates.findIndex(
        (date) => date === formattedDate
      );
      let lastBalance = balance.balance[balance.balance.length - 1];
      if (dateIndex !== -1) {
        return {
          ...state,
          balance: {
            ...balance,
            values: balance.values.map((el, i) => {
              if (i === dateIndex)
                return parseFloat(el) + parseFloat(trade.net);
              return el;
            }),
            balance: balance.balance.map((el, i) => {
              if (i === dateIndex)
                return parseFloat(el) + parseFloat(trade.net);
              return el;
            }),
          },
        };
      } else {
        return {
          ...state,
          balance: {
            ...balance,
            dates: [...balance.dates, formattedDate],
            values: [...balance.values, trade.net],
            balance: [...balance.balance, lastBalance + trade.net],
          },
          trades: [...state.trades, action.payload],
        };
      }
    }
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
