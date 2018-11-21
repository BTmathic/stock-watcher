require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');

const bodyParser = require('body-parser');
const express = require('express');
const flash = require('connect-flash');
const passport = require('passport');
//const session = require('express-session');

const auth = require('./routes/auth.js');
const authRoutes = require('./routes/authRoutes');
const update = require('./routes/updateStocks.js');
const app = express();

const admin = require('firebase-admin');
const serviceAccount = require('../stock-watcher-fb-adminsdk.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://stock-watcher-28e02.firebaseio.com/',
  databaseAuthVariableOverride: null
});

const db = admin.database();

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

/*
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
*/

app.use(passport.initialize());
//app.use(passport.session());

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

auth(app, admin);
authRoutes(app, admin);
update(app, db);

app.listen(port, () => {
    console.log('Server is up!');
});