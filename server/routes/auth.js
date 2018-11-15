const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');

module.exports = (app, db) => {
  const ref = db.ref('users');

  //console.log(ref);
}