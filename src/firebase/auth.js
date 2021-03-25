import firebase from 'firebase';

const db = firebase.firestore();

export function getUser(callback) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            callback(user);
        }
    });
}

export function googleSignin(callback) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            afterSignedIn(result, callback);
        })
        .catch((error) => {
            console.log("Failed to log in with google: "+JSON.stringify(error));
        });
}

export function afterSignedIn(result, callback) {
    //var credential = result.credential;
    var user = result.user;
    console.log("Logged-in successfully as "+user.displayName);
    console.log("Email: "+user.email);
    console.log("ID: "+user.uid);

    if (result.additionalUserInfo.isNewUser) {
        console.log("New user");
        // create profile
        const userDoc = db.doc("/users/"+user.uid);
        userDoc.set({
            role: "user", // error if try to set roles other than "user" when not logged in as admin
            email: user.email, // error if try to change email
            name: user.displayName
        }).then(() => {
            console.log("Updated Profile");
            callback();
        }).catch((error) => {
            console.log("Failed to update profile: "+error);
        });
    } else {
        callback();
    }
}

export function signout(callback) {
    firebase.auth().signOut()
    .then(() => {
        console.log("User signed out.")
        callback();
    })
    .catch((error) => {
        console.log("Failed to sign out: "+error.message);
    });
}