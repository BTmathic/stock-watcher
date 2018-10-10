const admin = require('firebase-admin');
const serviceAccount = require('../../stock-watcher-fb-adminsdk.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://stock-watcher-28e02.firebaseio.com/',
  databaseAuthVariableOverride: null
});

const db = admin.database();
const ref = db.ref('/stocks');

module.exports = (app) => {

  setInterval(() => {
    ref.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.val());
      });
    });
  }, 1000);
};