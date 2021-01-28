import tradesTypes from "./trades.types";

const INITIAL_STATE = {
  trades: [],
  filteredTrades: [],
  balance: {
    dates: [],
    values: [],
    balance: [],
    wins: 0,
    loses: 0,
    pairs: {
      // EURUSD: {
      //   gain: 5000,
      //   quanitity: 10000,
      // },
      // GBPUSD: {
      //   gain: -1000,
      //   quanitity: 1000,
      // },
      // AUDUSD: {
      //   gain: -500,
      //   quanitity: 1000,
      // },
      // GBPJPY: {
      //   gain: 7000,
      //   quanitity: 100000,
      // },
      // GBPAUD: {
      //   gain: 3000,
      //   quanitity: 100,
      // },
      // GBPCAD: {
      //   gain: -100,
      //   quanitity: 1,
      // },
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
            wins:
              trade.net > 0
                ? parseInt(state.balance.wins) + 1
                : state.balance.wins,
            loses:
              trade.net < 0
                ? parseInt(state.balance.loses) + 1
                : state.balance.loses,
            pairs: {
              ...state.balance.pairs,
              [trade.symbol]: {
                ...state.balance.pairs[trade.symbol],
                gain:
                  parseFloat(state.balance.pairs[trade.symbol]?.gain) ||
                  0 + parseFloat(trade.net),
                quanitity: parseFloat(trade.quantity),
              },
            },
            trades: [...state.trades, action.payload],
            filteredTrades: [...state.trades, action.payload],
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
            wins:
              trade.net > 0
                ? parseInt(state.balance.wins) + 1
                : state.balance.wins,
            loses:
              trade.net < 0
                ? parseInt(state.balance.loses) + 1
                : state.balance.loses,
            pairs: {
              ...state.balance.pairs,
              [trade.symbol]: {
                ...state.balance.pairs[trade.symbol],
                gain:
                  parseFloat(state.balance.pairs[trade.symbol]?.gain) ||
                  0 + parseFloat(trade.net),
                quanitity: parseFloat(trade.quantity),
              },
            },
          },
          trades: [...state.trades, action.payload],
          filteredTrades: [...state.trades, action.payload],
        };
      }
    }
    case tradesTypes.FETCH_TRADES_SUCCESS: {
      return {
        ...state,
        trades: [...action.payload],
        filteredTrades: [...action.payload],
      };
    }

    case tradesTypes.FILTER_TRADES: {
      const {
        tags,
        date: [start, end],
        type,
        side,
        symbol,
      } = action.payload;
      const date = new Date();
      console.log(action.payload);
      date.setDate(start.getDate() - 1);
      return {
        ...state,
        filteredTrades: state.trades.filter((el) => {
          if (tags.length > 0 && !el.tags.some((r) => tags.indexOf(r) >= 0))
            return false;
          if (el.date < date || el.date > end) return false;
          if (type && el.type !== type) return false;
          if (side && el.side !== side) return false;
          if (symbol && el.symbol !== symbol) return false;
          return true;
        }),
      };
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
