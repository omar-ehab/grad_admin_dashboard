const actions = {
  GET_MARKET_REQUEST: 'GET_MARKET_REQUEST',
  GET_MARKET_SUCCESS: 'GET_MARKET_SUCCESS',
  GET_MARKET_ERROR: 'GET_MARKET_ERROR',

  GET_MARKET_TRANSACTIONS_REQUEST: 'GET_MARKET_TRANSACTIONS_REQUEST',
  GET_MARKET_TRANSACTIONS_SUCCESS: 'GET_MARKET_TRANSACTIONS_SUCCESS',
  GET_MARKET_TRANSACTIONS_ERROR: 'GET_MARKET_TRANSACTIONS_ERROR',

  fetchMarket: (market_id) => ({
    type: actions.GET_MARKET_REQUEST,
    payload: {market_id}
  }),

  getMarketTransactions: (market_id) => ({
    type: actions.GET_MARKET_TRANSACTIONS_REQUEST,
    payload: {market_id}
  })
};
export default actions;
