import tradesTypes from "./trades.types";

const INITIAL_STATE = {
  trades: [],
  filteredTrades: [],
  balanceChanged: false,
  balance: {
    dates: [],
    values: [],
    balance: [],
    wins: 0,
    loses: 0,
    pairs: {},
  },
};

const calculateNewBalance = (values, initialBalance) => {
  const arr = [initialBalance];
  values.forEach((el, i) => {
    if (i === 0) return;
    const newBalance = parseFloat(arr[i - 1]) + parseFloat(el);
    arr.push(newBalance);
  });
  return arr;
};

const formatTradeDate = (trade) => {
  const formattedDate = `${trade.date.getFullYear()}-${
    trade.date.getMonth() + 1
  }-${trade.date.getDate()}`;
  return formattedDate;
};

const tradesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case tradesTypes.ADD_TRADE_SUCCESS: {
      const balance = state.balance;
      const trade = action.payload;
      const formattedDate = formatTradeDate(trade);
      const dateIndex = balance.dates.findIndex(
        (date) => date === formattedDate
      );
      let middleIndex = -1;
      if (dateIndex === -1)
        middleIndex = balance.dates.findIndex((date) => formattedDate < date);
      let lastBalance = balance.balance[balance.balance.length - 1];
      return {
        ...state,
        balanceChanged: true,
        balance: {
          ...balance,
          values:
            dateIndex !== -1
              ? balance.values.map((el, i) => {
                  if (i === dateIndex)
                    return parseFloat(el) + parseFloat(trade.net);
                  return el;
                })
              : middleIndex === -1
              ? [...balance.values, trade.net]
              : [
                  ...balance.values.slice(0, middleIndex),
                  trade.net,
                  ...balance.values.slice(middleIndex),
                ],
          balance:
            dateIndex !== -1
              ? balance.balance.map((el, i) => {
                  if (i === dateIndex)
                    return parseFloat(el) + parseFloat(trade.net);
                  return el;
                })
              : middleIndex === -1
              ? [
                  ...balance.balance,
                  parseFloat(lastBalance) + parseFloat(trade.net),
                ]
              : calculateNewBalance(
                  [
                    ...balance.values.slice(0, middleIndex),
                    trade.net,
                    ...balance.values.slice(middleIndex),
                  ],
                  balance.balance[0]
                ),
          dates:
            dateIndex !== -1
              ? [...balance.dates]
              : middleIndex === -1
              ? [...balance.dates, formattedDate]
              : [
                  ...balance.dates.slice(0, middleIndex),
                  formattedDate,
                  ...balance.dates.slice(middleIndex),
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
            ...balance.pairs,
            [trade.symbol]: {
              ...balance.pairs[trade.symbol],
              gain: balance.pairs[trade.symbol]
                ? parseFloat(balance.pairs[trade.symbol]?.gain) +
                  parseFloat(trade.net)
                : parseFloat(trade.net),
              quantity: balance.pairs[trade.symbol]
                ? parseFloat(balance.pairs[trade.symbol].quantity) +
                  parseFloat(trade.quantity)
                : parseFloat(trade.quantity),
            },
          },
        },
        trades: [...state.trades, action.payload],
        filteredTrades: [...state.trades, action.payload],
      };
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
      let date = new Date();
      if (start && end) {
        date.setDate(start.getDate() - 1);
      }
      return {
        ...state,
        filteredTrades: state.trades.filter((el) => {
          if (tags.length > 0 && !el.tags.some((r) => tags.indexOf(r) >= 0))
            return false;
          if ((start && end && el.date < start) || el.date > end) return false;
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
        balanceChanged: false,
        balance: {
          ...state.balance,
          ...action.payload,
        },
      };
    }

    case tradesTypes.REMOVE_TRADE_SUCCESS: {
      const trade = action.payload;
      const balance = state.balance;
      const formattedDate = formatTradeDate(trade);
      const dateId = balance.dates.findIndex((el) => el === formattedDate);
      const newValues = balance.values
        .map((el, i) => {
          if (i === dateId && el - trade.net === 0) return undefined;
          else if (i === dateId) return el - trade.net;
          else return el;
        })
        .filter((el) => el !== undefined);
      const newDates = balance.dates
        .map((el, i) => {
          if (i === dateId && balance.values[i] - trade.net === 0)
            return undefined;
          else return el;
        })
        .filter((el) => el !== undefined);

      return {
        ...state,
        balanceChanged: true,
        trades: state.trades.filter((el) => el.id !== trade.id),
        filteredTrades: state.filteredTrades.filter((el) => el.id !== trade.id),
        balance: {
          ...balance,
          values: newValues,
          dates: newDates,
          balance: calculateNewBalance(newValues, balance.balance[0]),
          wins:
            trade.net > 0
              ? parseInt(state.balance.wins) - 1
              : state.balance.wins,
          loses:
            trade.net < 0
              ? parseInt(state.balance.loses) - 1
              : state.balance.loses,
          pairs: {
            ...state.balance.pairs,
            [trade.symbol]: {
              ...state.balance.pairs[trade.symbol],
              gain:
                parseFloat(state.balance.pairs[trade.symbol]?.gain) ||
                0 - parseFloat(trade.net),
              quantity:
                parseFloat(state.balance.pairs[trade.symbol]?.quanitity) ||
                0 - parseFloat(trade.quantity),
            },
          },
        },
      };
    }
    case tradesTypes.EDIT_TRADE_SUCCESS: {
      const { trade, id } = action.payload;
      const balance = state.balance;

      const formattedDate = formatTradeDate(trade);
      const tradeIndex = balance.dates.findIndex((el) => el === formattedDate);
      const oldTrade = state.trades.find((el) => el.id === id);
      const valueDiff = trade.net - oldTrade.net;
      const newValues = balance.values.map((el, i) =>
        i === tradeIndex ? el + valueDiff : el
      );

      const newTrades = state.trades.map((el) =>
        el.id === id ? { ...trade, id } : el
      );

      return {
        ...state,
        trades: newTrades,
        filteredTrades: newTrades,
        balanceChanged: true,
        balance: {
          ...balance,
          values: newValues,
          balance: calculateNewBalance(newValues, balance.balance[0]),
          wins:
            trade.net > 0
              ? oldTrade.net > 0
                ? state.balance.wins
                : parseInt(state.balance.wins) + 1
              : state.balance.wins - 1,
          loses:
            trade.net < 0
              ? oldTrade.net < 0
                ? state.balance.loses
                : parseInt(state.balance.loses) + 1
              : state.balance.loses - 1,
          pairs: {
            ...state.balance.pairs,
            [trade.symbol]: {
              ...state.balance.pairs[trade.symbol],
              gain: parseFloat(trade.net),
              quantity: parseFloat(trade.quantity),
            },
          },
        },
      };
    }

    case tradesTypes.UPDATE_INITIAL_BALANCE: {
      const newBalance = action.payload;
      return {
        ...state,
        balance: {
          ...state.balance,
          balance: calculateNewBalance(state.balance.values, newBalance),
        },
      };
    }

    case tradesTypes.UPDATE_BALANCE_SUCCESS: {
      return {
        ...state,
        balanceChanged: false,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default tradesReducer;
