import actions from './actions';
import moment from 'moment';

const initState = {
  market: {},
  transactions: [],
  error: "",
  transaction_error: "",
};

 
export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.GET_MARKET_SUCCESS:
      return {
        ...state,
        market: {
          id: payload.market.id,
          name: payload.market.name,
          balance: `${payload.market.balance} LE`,
        }
      };
    case actions.GET_MARKET_ERROR:
      return {
        ...state,
        error: payload.error
      };
    case actions.GET_MARKET_TRANSACTIONS_SUCCESS:
      const transactions = payload.transactions.map(transaction => {
        return {
          id: transaction.id,
          accepted_at: moment(transaction.accepted_at).format('ddd DD-MMM-YYYY, hh:mm A'),
          amount: `${transaction.amount} LE`,
          type: transaction.type,
        }
      });
      return {
        ...state,
        transactions
      };
    case actions.GET_MARKET_TRANSACTIONS_ERROR:
      return {
        ...state,
        error: payload.error
      };
    default:
      return state;
  }
}
