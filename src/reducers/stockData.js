const stockDataReducerDefaultState = [];

export default (state = stockDataReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_STOCK_DATA':
      return [
        ...state,
        action.stockData
      ];
    case 'SET_STOCK_DATA':
      return action.stockData;
    default:
      return state;
  }
}