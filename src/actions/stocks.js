import database from '../firebase/firebase';

export const addStock = (stock) => {
  type: 'ADD_STOCK',
  stock
}

export const startAddStock = (stockData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().uid;
    const {
      name = '',
      value = 0
    } = stockData;
    const stock = { name, value };

    return database.ref(`users/${uid}/stocks`).push(stock).then((ref) => {
      dispatch(addStock({
        id: ref.key,
        ...stock
      }));
    });
  }
};

// Remove

// Set