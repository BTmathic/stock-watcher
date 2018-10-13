const fetch = require('node-fetch');
const schedule = require('node-schedule');
const admin = require('firebase-admin');
const serviceAccount = require('../../stock-watcher-fb-adminsdk.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://stock-watcher-28e02.firebaseio.com/',
  databaseAuthVariableOverride: null
});

const db = admin.database();
const ref = db.ref('/stocks');

const updateStock = (stock, stockId, snapshotIndex) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${stock.name}&apikey=${process.env.API_KEY}`)
        .then((resp) => resp.json())
        .then((json) => {
          const metaData = json['Meta Data'];
          const values = json['Weekly Time Series'];
          const lastUpdated = metaData['3. Last Refreshed'].split(' ')[0];
          const closingValues = Object.keys(values).map((date) => ({
            date,
            price: values[date]['4. close']
          }));
          ref.child(stockId).set({
            name: stock.name,
            lastUpdated,
            closingValues
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
rule.hour = [new schedule.Range(10, 4)]; // the NASDAQ is only open between 9:30 and 16:00
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
      if (date.getUTCDate() !== currentDate.getDate()) {
        console.log(`${stock.name} is being updated`);
        snapshotIndex++;
        updateStock(stock, stockId, snapshotIndex);
      }
    });
  });
}

updateStocks(); // run once whenever going live, in case of extended server downtime

const updateStocksJob = schedule.scheduleJob(rule, () => {
  updateStocks();
});

module.exports = (app) => {

}