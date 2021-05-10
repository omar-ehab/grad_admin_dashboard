import actions from './actions';

const initState = {
  markets: [],
  selected_market_id: "",
  selected_market: {},
  error: "",
  insert_errors: {},
  insert_market_modal: false,
  edit_market_modal: false,
};

 
export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.GET_ALL_MARKETS_SUCCESS:
      const markets = payload.markets.map(mart => {
        return {
          id: mart.id,
          key: mart.id,
          market_name: mart.name,
          market_balance: `${mart.balance} LE`
        }
      })
      return {
        ...state,
        markets
      };
    case actions.GET_ALL_MARKETS_ERROR:
      return {
        ...state,
        error: payload.message
      };
    case actions.RESET_MARKET_BALANCE:
      const updatedMarkets = state.markets.map(mart => {
        if(mart.id === payload.marketId){
          return {
            id: mart.id,
            key: mart.id,
            market_name: mart.market_name,
            market_balance: `0 LE`
          }
        } else {
          return mart
        }
      })
      return {
        ...state,
        markets: updatedMarkets
      };
    case actions.UPDATE_SELECTED_MARKET_FORM:
      return {
        ...state,
        selected_market: {
          ...state.selected_market,
          [payload.key]: payload.value
        }
      };
    case actions.OPEN_INSERT_MARKET_MODAL:
      return {
        ...state,
        insert_market_modal: true,
        edit_market_modal: false,
      };
    case actions.CLOSE_INSERT_MARKET_MODAL:
      return {
        ...state,
        selected_market: {},
        insert_market_modal: false,
        edit_market_modal: false,
      };
    case actions.STORE_NEW_MARKET_SUCCESS:
      const newMarket = {
        id: payload.market.id,
        key: payload.market.id,
        market_name: payload.market.name,
        market_balance: `${payload.market.balance} LE`
      }
      return {
        ...state,
        markets: [newMarket, ...state.markets]
      };
    case actions.STORE_NEW_MARKET_ERROR:
      return {
        ...state,
        insert_errors: payload.error
      };
    case actions.OPEN_EDIT_MARKET_MODAL:
      const market = state.markets.filter(mrk => {
        return mrk.id === payload.market_id
      })
      return {
        ...state,
        selected_market_id: market[0].id,
        selected_market: market[0],
        edit_market_modal: true,
        insert_market_modal: false
      };
    case actions.CLOSE_EDIT_MARKET_MODAL:
      return {
        ...state,
        selected_market_id: "",
        selected_market: {},
        insert_market_modal: false,
        edit_market_modal: false,
      };
    case actions.EDIT_MARKET_SUCCESS:
      const editedMarket = {
        id: payload.market.id,
        key: payload.market.id,
        market_name: payload.market.name,
        market_balance: `${payload.market.balance} LE`
      }
      const newMarketsList = state.markets.map(mrk => {
        if(mrk.id === editedMarket.id){
          return editedMarket
        }
        return mrk;
      });
      return {
        ...state,
        markets: newMarketsList
      };
    default:
      return state;
  }
}
