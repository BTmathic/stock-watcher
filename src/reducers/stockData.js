const stockDataReducerDefaultState = [];

export default (state = stockDataReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_STOCK_DATA':
      return [
        ...state,
        action.stock
      ];
    case 'SET_STOCK_DATA':
      return action.stockData;
    default:
      return state;
  }
}