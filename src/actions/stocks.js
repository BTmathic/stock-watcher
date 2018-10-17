import database from '../firebase/firebase';

// Add stock to user portfolio
export const addStock = (stock) => ({
  type: 'ADD_STOCK',
  stock
});

export const startAddStock = ({ name, watching } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const stock = { name, watching };

    return database.ref(`users/${uid}/stocks`).push(stock).then((ref) => {
      dispatch(addStock({
        id: ref.key,
        ...stock
      }));
    });
  };
};

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

// Toggle stock visibility in user chart
export const editStock = (stock = {}) => ({
  type: 'EDIT_STOCK',
  stock
});

export const startEditStock = (id = '', watching) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/stocks/${id}`).update({
      watching
    }).then(() => {
      const stock = getState().stocks.filter((stock) => stock.id === id)[0];
      stock.watching = watching;
      dispatch(editStock(stock));
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
          ...childSnapshot.val()
        });
      });
      dispatch(setStocks(stocks));
    });
  };
};