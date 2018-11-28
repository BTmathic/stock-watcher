const fetch = require('node-fetch');
const schedule = require('node-schedule');

module.exports = (app, db) => {
  const ref = db.ref('stocks');

  const updateStock = (stock, stockId, snapshotIndex) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        console.log(`${stock.name} is being updated`);
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock.name}&apikey=${process.env.STOCK_API_KEY}`)
          .then((resp) => resp.json())
          .then((json) => {
            const metaData = json['Meta Data'];
            const lastUpdated = metaData['3. Last Refreshed'].split(' ')[0];
            const values = json['Time Series (Daily)'];
            const dailyValues = Object.keys(values).map((date) => ({
              date,
              open: values[date]['1. open'],
              high: values[date]['2. high'],
              low: values[date]['3. low'],
              close: values[date]['4. close'],
              volume: values[date]['5. volume']
            }));
            const closingValues = dailyValues.map((value) => ({
              date: value.date,
              price: value.close
            }));
            let recentValues = [];
            for (let i = 0; i < 7; i++) {
              recentValues.push(dailyValues[i]);
            };
            ref.child(stockId).set({
              name: stock.name,
              lastUpdated,
              closingValues,
              recentValues
            });
          })
          .catch((err) => {
            console.log(err);
            console.log(`Error fetching data for ${stock.name}`);
          });
      }, 15000 * snapshotIndex);
    });
  };

  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [1, new schedule.Range(2, 5)]; // stocks only trade Monday through Friday
  rule.hour = [10, new schedule.Range(11, 16)]; // the NASDAQ is only open between 9:30 and 16:00
  rule.minute = 5;

  const updateStocks = () => {
    console.log('Starting stock update check/process');
    let snapshotIndex = 0;
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 4); // the NASDAQ operates on EST
    ref.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const stockId = childSnapshot.key;
        const stock = childSnapshot.val();
        const date = new Date(stock.lastUpdated);
        //if (date.getUTCDate() !== currentDate.getDate()) {
        // testing just doing it at regular intervals instead
        snapshotIndex++;
        updateStock(stock, stockId, snapshotIndex);
        //}
      });
    });
  }

  // run update (check) immediately when going live, in case of unplanned server downtime
  updateStocks();

  const updateStocksJob = schedule.scheduleJob(rule, () => {
    updateStocks();
  });
}