const fetch = require('node-fetch');
const admin = require('firebase-admin');
const serviceAccount = require('../../stock-watcher-fb-adminsdk.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://stock-watcher-28e02.firebaseio.com/',
  databaseAuthVariableOverride: null
});

const db = admin.database();
const ref = db.ref('/stocks');
let snapshotIndex = 1;

module.exports = (app) => {
  
  setInterval(() => {
    const currentDate = new Date().getUTCDate();
    ref.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const stock = childSnapshot.val();
        const date = new Date(stock.lastUpdated).getUTCDate();
        snapshotIndex++;
        setTimeout(() => {
          if (date !== currentDate) {
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
                ref.child(childSnapshot.key).set({
                  name: stock.name,
                  lastUpdated,
                  closingValues
                });
              });
          }
        }, 15000 * snapshotIndex);
      });
    });
  }, 2000);

};