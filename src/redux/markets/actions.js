const actions = {
  GET_ALL_MARKETS_REQUEST: 'GET_ALL_MARKETS_REQUEST',
  GET_ALL_MARKETS_SUCCESS: 'GET_ALL_MARKETS_SUCCESS',
  GET_ALL_MARKETS_ERROR: 'GET_ALL_MARKETS_ERROR',
  RESET_MARKET_BALANCE: "RESET_MARKET_BALANCE",


  UPDATE_SELECTED_MARKET_FORM: "UPDATE_SELECTED_MARKET_FORM",


  OPEN_INSERT_MARKET_MODAL: "OPEN_INSERT_MARKET_MODAL",
  CLOSE_INSERT_MARKET_MODAL: "CLOSE_INSERT_MARKET_MODAL",

  OPEN_EDIT_MARKET_MODAL: "OPEN_EDIT_MARKET_MODAL",
  CLOSE_EDIT_MARKET_MODAL: "CLOSE_EDIT_MARKET_MODAL",


  STORE_NEW_MARKET_REQUEST: "STORE_NEW_MARKET_REQUEST",
  STORE_NEW_MARKET_SUCCESS: "STORE_NEW_MARKET_SUCCESS",
  STORE_NEW_MARKET_ERROR: "STORE_NEW_MARKET_ERROR",

  EDIT_MARKET_REQUEST: "EDIT_MARKET_REQUEST",
  EDIT_MARKET_SUCCESS: "EDIT_MARKET_SUCCESS",
  EDIT_MARKET_ERROR: "EDIT_MARKET_ERROR",


  fetchMarkets: () => ({
    type: actions.GET_ALL_MARKETS_REQUEST
  }),

  resetMarketBalance: (marketId) => ({
    type: actions.RESET_MARKET_BALANCE,
    payload: { marketId }
  }),

  storeNewMarket: () => ({
    type: actions.STORE_NEW_MARKET_REQUEST
  }),

  editMarket: (market_id) => ({
    type: actions.EDIT_MARKET_REQUEST,
    payload: { market_id }
  }),

  updateSelectedMarketForm: (key, value) => ({
    type: actions.UPDATE_SELECTED_MARKET_FORM,
    payload: {key, value}
  }),

  openInsertMarketModal: () => ({
    type: actions.OPEN_INSERT_MARKET_MODAL,
  }),

  closeInsertMarketModal: () => ({
    type: actions.CLOSE_INSERT_MARKET_MODAL,
  }),

  openEditMarketModal: (market_id) => ({
    type: actions.OPEN_EDIT_MARKET_MODAL,
    payload: { market_id }
  }),

  closeEditMarketModal: () => ({
    type: actions.CLOSE_EDIT_MARKET_MODAL
  })
};
export default actions;
