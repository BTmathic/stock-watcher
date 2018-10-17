const stocksReducerDefaultState = [];

export default (state = stocksReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_STOCK':
      return [
        ...state,
        action.stock
      ];
    case 'REMOVE_STOCK':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_STOCK':
      return state.map((stock) => {
        if (stock.id === action.stock.id) {
          return {
            ...stock,
            watching: false
          }
        } else {
          return stock;
        }
      });
    case 'SET_STOCKS':
      return action.stocks;
    default:
      return state;
  }
}