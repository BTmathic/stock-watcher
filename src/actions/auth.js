import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};

export const startAddUser = (email, hash, salt) => {
  return () => {
    return firebase.auth().createUserWithEmailAndPassword(email, hash).then(() => {
      const uid = firebase.auth().currentUser.uid;
      const userRef = firebase.database().ref(`users/${uid}`);
      userRef.set({
        email: email,
        hash: hash,
        salt: salt,
      });
      userRef.child('stocks').push().set({
        name: 'GOOG',
        watching: true
      });
    }).catch((err) => {
      console.log('Problem creating account:', err.code, err.message);
    });
  }
}