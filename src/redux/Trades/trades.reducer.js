import tradesTypes from "./trades.types";

const INITIAL_STATE = {
  trades: [],
  balance: {
    dates: [],
    values: [],
    balance: [],
  },
  pairs: {
    EURUSD: {
      gain: 5000,
      quanitity: 10000,
    },
    GBUPSD: {
      gain: -1000,
      quanitity: 1000,
    },
    AUDUSD: {
      gain: -500,
      quanitity: 1000,
    },
    GBPJPY: {
      gain: 7000,
      quanitity: 100000,
    },
    GBPAUD: {
      gain: 3000,
      quanitity: 100,
    },
    GBPCAD: {
      gain: -100,
      quanitity: 1,
    },
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
          pairs: {
            ...state.pairs,
            [trade.symbol]: {
              ...state.pairs[trade.symbol],
              gain: (state.pairs[trade.symbol].gain += parseFloat(trade.net)),
            },
          },
        };
      } else {
        return {
          ...state,
          balance: {
            ...balance,
            dates: [...balance.dates, formattedDate],
            values: [...balance.values, trade.net],
            balance: [
              ...balance.balance,
              parseFloat(lastBalance) + parseFloat(trade.net),
            ],
          },
          trades: [...state.trades, action.payload],
          pairs: {
            ...state.pairs,
            [trade.symbol]: (state.pairs[trade.symbol] += trade.net),
          },
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
