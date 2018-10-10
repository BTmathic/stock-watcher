import database from '../firebase/firebase';

// Add stock to user portfolio
export const addStock = (stock) => ({
  type: 'ADD_STOCK',
  stock
});

export const startAddStock = (name = '') => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`users/${uid}/stocks`).push(name).then((ref) => {
      dispatch(addStock({
        id: ref.key,
        name
      }));
    });
  };
}

// Remove stock from user portfolio
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

// Set stocks from user portfolio
export const setStocks = (stocks) => ({
  type: 'SET_STOCKS',
  stocks
});

export const startSetStocks = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/stocks`).once('value').then((snapshot) => {
      const stocks = [];
      snapshot.forEach((childSnapshot) => {
        stocks.push({
          id: childSnapshot.key,
          name: childSnapshot.val()
        });
      });
      dispatch(setStocks(stocks));
    });
  };
};