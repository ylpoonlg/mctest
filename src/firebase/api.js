import firebase from 'firebase';

console.log("FIREBASE INIT");
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDGPaPjjwjBSmjbjsBDQBKVNOTII9PeLqs",
    authDomain: "mctest-ylpoonlg.firebaseapp.com",
    projectId: "mctest-ylpoonlg",
    storageBucket: "mctest-ylpoonlg.appspot.com",
    messagingSenderId: "378298033632",
    appId: "1:378298033632:web:a273db6c76635ed2bbb785",
    measurementId: "G-2YJKZJRK84"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();