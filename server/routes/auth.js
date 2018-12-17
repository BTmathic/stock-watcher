const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (app, admin) => {
  app.route('/login')
    .post((req, res) => {
      const email = req.body.email;
      let error = '';
      admin.auth().getUserByEmail(email)
        .then((userRecord) => {
          const uid = userRecord.uid;
          const userRef = admin.database().ref(`admin/${uid}`)
          userRef.once('value', (snapshot) => {
            const snap = snapshot.val();
            bcrypt.compare(req.body.password + process.env.PEPPER, snap.hash, (err, success) => {
              if (err) {
                console.log('Error checking password', err);
              }
              if (success) {
                res.send({ email: email, hash: snap.hash });
              } else {
                res.send({ error: 'Incorrect credentials provided' })
              }
            });
          });
        })
        .catch((err) => {
          console.log('Error', err);
        });
  });

  app.route('/register')
    .post((req, res) => {
      const email = req.body.email;
      let error = '';
      admin.auth().getUserByEmail(email)
        .then(() => {
          error = 'Email already in use';
          res.send({ error: error });
        })
        .catch((err) => {
          if (err.code !== 'auth/user-not-found') {
            console.log('Error fetching:', err);
            error = 'Something went wrong on our end...'
            res.send({ error: error });
          } else { // new email, make the account
            bcrypt.genSalt(saltRounds, (err, salt) => {
              if (err) {
                console.log('Error hashing', err);
              }
              bcrypt.hash(req.body.password + process.env.PEPPER, salt, (err, hash) => {
                if (err) {
                  console.log('Error generating hash', err);
                }
                res.send({ email: email, hash: hash });
              })
            });
          }
        });
     })
}