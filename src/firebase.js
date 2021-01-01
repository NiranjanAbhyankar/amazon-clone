// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAGWSEEel2fTzRPvf_lBACeyV0UftV4LkI",
    authDomain: "clone-a95db.firebaseapp.com",
    projectId: "clone-a95db",
    storageBucket: "clone-a95db.appspot.com",
    messagingSenderId: "268490575246",
    appId: "1:268490575246:web:060b1a1a38ec26733768df",
    measurementId: "G-CHCDP6KT0X"
};

//Initialize the app
const firebaseApp = firebase.initializeApp(firebaseConfig);

//Initialize database
const db = firebaseApp.firestore();

//Initialize auth handle for accessing authentication
const auth = firebase.auth();

export {db, auth};
