import * as firebase from 'firebase/app';
 
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBa5g4Ce9bpxrXArDm6KU7LSfg1nMJfVfg",
  authDomain: "tracker-619d6.firebaseapp.com",
  databaseURL: "https://tracker-619d6.firebaseio.com",
  projectId: "tracker-619d6",
  storageBucket: "tracker-619d6.appspot.com",
  messagingSenderId: "1074784658036"
};

export default class StateService {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.authProvider = new firebase.auth.GithubAuthProvider();
    this.db = firebase.database;
  }

  signin() {
    firebase.auth().signInWithRedirect(authProvider);
  }

  async getUser() {
    try {
      await firebase.auth().getRedirectResult();
      this.user = await firebase.auth().currentUser;
      return this.user;
    } catch (error) {
      console.log('ERROR')
      console.error(`${error.code}: ${error.message}`);
      console.error(`${error.credential}`);  
    }
  }

  subscribe(callback) {
    this.db.ref(`users/${this.user.uid}`).on('value', (history) => {
      callback(history.val());
    });
  }

  async track(thing) {
    const today = (new Date()).toDateString();
    const uid = this.user.uid;

    const snapshot = await this.db.ref(`users/${uid}/${today}/${thing}`).once('value');
    const count = snapshot.val();

    await this.db.ref(`users/${uid}/${today}`).set({ [thing]: count + 1 })

  }
}

