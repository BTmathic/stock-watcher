import { firebase } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = (email, hash) => {
  return () => {
    return firebase.auth().signInWithEmailAndPassword(email, hash);
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

export const startAddUser = (email, hash) => {
  return () => {
    return firebase.auth().createUserWithEmailAndPassword(email, hash).then(() => {
      const uid = firebase.auth().currentUser.uid;
      const adminRef = firebase.database().ref(`admin/${uid}`);
      adminRef.set({
        hash: hash
      });
      const userRef = firebase.database().ref(`users/${uid}`);
      userRef.child('stocks').push().set({
        name: 'GOOG',
        watching: true
      });
    }).catch((err) => {
      console.log('Problem creating account:', err.code, err.message);
    });
  }
}