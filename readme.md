# Stock Watcher

This app provides email based accounts to track stocks any user is interested in following, both looking at specific details of one individual stock or comparing many together. There is (coming...) a section for loading in a portfolio that the app tracks and reports the status of the portfolio.

## Getting Started

To get a copy of this project up and running on your machine, you need to setup a firebase database to store all the user account information as well as the stock data. Once a database has been connected you can install the project and it is ready to go.

### Prerequisites

You will need to supply all the environment variables to run this project after installing. These include Firebase credentials, an API for the stock data as well as authentication variables for added security. All in all you should have 8 environment variables before installing the project.

### Firebase

Firstly, go to `https://firebase.google.com/` and create a Google account if needed or login with an existing account. Then click on `GO TO CONSOLE` in the top right corner and `+ Add project` and follow the instructions to create a database.

Once a database is ready to use and link, you must link it on both the client side and the server side. For the client side, go to the Authentication section and click on 'Web setup' in the top right corner to get your .env variables. You should have six values, each saved as

* FIREBASE_API_KEY
* FIREBASE_AUTH_DOMAIN
* FIREBASE_DATABASE_URL
* FIREBASE_PROJECT_ID
* FIREBASE_STORAGE_BUCKET
* FIREBASE_MESSAGING_SENDER_ID

For the server side you must create [service account credentials](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk) to connect the server to the databse and place this data in the root of the project so the .env can store this data into the root as `stock-watcher-fb-adminsdk.json` so the server loads the data via the .env file.

#### Stock data

Create a (free) API key at `https://www.alphavantage.co/`, following their instructions as necessary and save this as STOCK_API_KEY.

#### Authentication parameters

The authentication system uses Bcrypt to securely work with email and hashes for password. To add security we use a pepper as well as the salting that is done with Bcrypt, so the last required environment variable, stored as PEPPER, is your favourite random string.

### Installing

Install with yarn
```
yarn install
```

Then, to run the project locally, use
```
yarn start
```

## Built With

* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Yarn](https://yarnpkg.com/en/)
* [Parcel](https://parceljs.org/)
* [D3](https://d3js.org/) - Visualizing the stock data
* [Firebase](https://firebase.google.com/) - storing user accounts and stock data
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - for securing authentication

## Versioning

We use [SemVer](https://semver.org/) for versioning.

## License

This project is licensed under the terms of the MIT license.