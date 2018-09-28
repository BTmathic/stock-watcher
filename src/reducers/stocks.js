const stocksReducerDefaultState = [];

export default (state = stocksReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_STOCK':
      return [
        ...state,
        action.stock
      ];
    // case 'REMOVE_STOCK
    // case 'SET_STOCK
    default:
      return state;
  }
}