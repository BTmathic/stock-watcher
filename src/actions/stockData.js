import database from '../firebase/firebase';

// Add stock data
export const addStockData = (stockData) => ({
  type: 'ADD_STOCK_DATA',
  stockData
});

export const startAddStockData = ({ name, lastUpdated, closingValues, recentValues} = {}) => {
  return (dispatch) => {
    const stockData = { name, lastUpdated, closingValues, recentValues };
    
    return database.ref('stocks').push(stockData).then((ref) => {
      dispatch(addStockData({
        id: ref.key,
        ...stockData
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