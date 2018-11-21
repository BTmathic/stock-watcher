const passport = require('passport');
const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');

module.exports = (app, admin) => {
  app.post('/login', (req, res) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        return res.json(401, { error: 'message' })
      }

      const token = jwt.encode({ username: 'some data' }, tokenSecret);
      res.json({ token: token });
    })(req, res, next);

    res.send({ user: req.body.username });
  });

  app.route('/register')
    .post((req, res) => {
    let username = req.body.username;
    let error = '';
    admin.auth().getUser(username)
      .then(() => {
        error = 'Username unavailable, please pick another';
      })
      .catch((err) => {
        if (err.code !== 'auth/user-not-found') {
          console.log('Error fetching:', err);
          error = 'Something went wrong on our end...'
        }
      });

    if (!error) { // username not found, make the account
      const salt = uuid();
      const hash = bcrypt.hashSync(salt + req.body.password + process.env.pepper, 12)
      admin.auth().createUser({
        uid: username,
        password: hash
      });
      res.send({ username: username, salt: salt, hash: hash});
    }
    res.send({ error: error });
  }),
  passport.authenticate('local', (req, res) => {
    res.redirect('/dashboard');
  })
}