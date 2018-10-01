import database from '../firebase/firebase';

export const addStock = (stock) => ({
  type: 'ADD_STOCK',
  stock
});

export const startAddStock = (stockData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      name = '',
      lastUpdated = new Date(),
      closingValues = 0
    } = stockData;
    const stock = { name, lastUpdated, closingValues };

    return database.ref(`users/${uid}/stocks`).push(stock).then((ref) => {
      dispatch(addStock({
        id: ref.key,
        ...stock
      }));
    });
  }
};

// Remove
export const removeStock = (id = '') => ({
  type: 'REMOVE_STOCK',
  id
});

export const startRemoveStock = (id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/stocks/${id}`).remove().then(() => {
      dispatch(removeStock(id));
    });
  };
};

// Set
export const setStocks = (stocks) => ({
  type: 'SET_STOCKS',
  stocks
});

export const startSetStocks = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/stocks`).once('value')
      .then((snapshot) => {
        const stocks = [];
        snapshot.forEach((childSnapshot) => {
          stocks.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setStocks(stocks));
      });
  };
};