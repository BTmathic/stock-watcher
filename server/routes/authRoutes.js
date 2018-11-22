const passport = require('passport');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');

module.exports = (app, admin) => {
  app.post('/login', (req, res) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        return res.json(401, { error: 'message' })
      }

      const token = jwt.encode({ email: 'some data' }, process.env.TOKEN_SECRET);
      res.json({ token: token });
    })(req, res, next);

    res.send({ user: req.body.email });
  });

  app.route('/register')
    .post((req, res) => {
      let email = req.body.email;
      let error = '';
      admin.auth().getUserByEmail(email)
        .then(() => {
          error = 'Email already in use';
        })
        .catch((err) => {
          if (err.code !== 'auth/user-not-found') {
            console.log(email);
            console.log('Error fetching:', err);
            error = 'Something went wrong on our end...'
          }
        });

      if (!error) { // email not found, make the account
        const salt = uuid();
        const hash = bcrypt.hashSync(salt + req.body.password + process.env.pepper, 12);
        let uid = '';
        admin.auth().createUser({
          email: email,
          password: hash
        }).then((userRecord) => {
          uid = userRecord.uid;
          const usersRef = admin.database().ref('users');
          usersRef.child(uid).set({
            email: email,
            password: hash,
            salt: salt
          });
          // load some data for initial tutorial
        /*
        usersRef.push().set({
          name: 'GOOG',
          watching: true
        });
        */
        }).catch((err) => {
          console.log('Error creating account:', err.code, err.message);
        });
        res.send({ email: email, hash: hash, uid: uid });
        //res.send({ email: email, token: jwt.encode({ email: 'some data' }, process.env.TOKEN_SECRET)})
      }
      if (error !== '') {
        res.send({ error: error });
      }
    }),
    passport.authenticate('local', (req, res) => {
      res.redirect('/dashboard');
    })
}