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

export const startRemoveStock = (props) => {
  console.log(props); // need props.id or props.data.id
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/stocks/${id}`).remove().then(() => {
      dispatch(removeExpense(id));
    });
  };
};

// Set