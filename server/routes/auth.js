const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');

module.exports = (app, admin) => {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      admin.auth().getUser(username)
        .then((userRecord) => {
          if (!bcrypt.compareSync(password, userRecord.password)) {
            return done(null, false, { message: 'Incorrect username or password' });
          }
          return done(null, username);
        })
        .catch((err) => {
          console.log(err.code); // use this to check incorrect password message? Is this even a thing with tokens?
          if (err.code === 'auth/user-not-found') {
            return done(null, false, { message: 'Incorrect username or password' });
          } else {
            console.log('Error loggin in:', err);
            return done(err);
          }
        });
    }
  ));
};