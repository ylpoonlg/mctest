import firebase from 'firebase';

const db = firebase.firestore();

export function saveTest(data) {
    console.log('saving '+data);
}

export function getTest() {
    console.log('getting data');
    return 'data from firestore';
}