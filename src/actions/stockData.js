import database from '../firebase/firebase';

// Add stock data
export const addStockData = (stock) => ({
  type: 'ADD_STOCK_DATA',
  stock
});

export const startAddStockData = (stockData = {}) => {
  return (dispatch) => {
    const {
      name = '',
      lastUpdated = new Date(),
      closingValues = 0
    } = stockData;
    const stock = { name, lastUpdated, closingValues };

    return database.ref('stocks').push(stock).then((ref) => {
      dispatch(addStockData({
        id: ref.key,
        ...stock
      }));
    });
  }
};

// Set stock data
export const setStockData = (stockData) => ({
  type: 'SET_STOCK_DATA',
  stockData
});

export const startSetStockData = () => {
  return (dispatch) => {
    return database.ref('stocks').once('value').then((snapshot) => {
      const stockData = [];
      snapshot.forEach((childSnapshot) => {
        stockData.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(setStockData(stockData));
    });
  }
}