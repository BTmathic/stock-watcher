require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');
const cors = require('cors');

const bodyParser = require('body-parser');
const Bundler = require('parcel-bundler');
const express = require('express');

const auth = require('../server/routes/auth.js');
const update = require('../server/routes/updateStocks.js');
const bundler = new Bundler(path.join(publicPath, 'index.html'))
const app = express();

const admin = require('firebase-admin');
const serviceAccount = {
  type: process.env.FIREBASE_SDK_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_SDK_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_SDK_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_SDK_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_SDK_CLIENT_ID,
  auth_uri: process.env.FIREBASE_SDK_AUTH_URI,
  token_uri: process.env.FIREBASE_SDK_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_SDK_AUTH_PROVIDER,
  client_x509_cert_url: process.env.FIREBASE_SDK_CLIENT_CERT
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:process.env.FIREBASE_DATABASE_URL,
  databaseAuthVariableOverride: {
    uid: 'my-service-worker'
  }
});

const db = admin.database();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

auth(app, admin);
update(app, db);

app.use(bundler.middleware());

app.listen(port, () => {
    console.log('Server is up!');
});