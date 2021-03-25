import firebase from 'firebase';

const db = firebase.firestore();

export function saveTest(qdata) {
    console.log('saving test');
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("Logged in")
            /*
            var user_id = user.uid;
            var qdata = JSON.parse(sessionStorage.mc_qdata);
            const test_name = qdata["test_name"];
            const testsDoc = db.doc("users/"+user_id+"/tests/"+test_name);
            testsDoc.set({
                data: qdata
            }).then(function() {
                console.log("saved successfully");
                document.getElementById("save-btn").textContent = "Saved";
            }).catch(function (error) {
                console.log("save test error: "+error);
            });
            */
        } else {
            console.log("Failed to save: not logged in.")
        }
    });
}

export function getTest() {
    console.log('getting data');
    return 'data from firestore';
}

export function getMytests(callback) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var user_id = user.uid;
      const testsCol = db.collection("users/"+user_id+"/tests");
      testsCol.get().then(function (tests) {
        var numt = 0;
        var tdata = {};
        tests.forEach(function(test) {
            var qdata = test.data()["data"];
            numt++;
            tdata["t"+numt] = qdata;
        });
        tdata["numt"] = numt;
        
        sessionStorage.mc_tdata = JSON.stringify(tdata);
        callback(tdata);
      }).catch(function(error) {
        console.log("get user tests error: "+error);
      });
    } else {
      console.log("Failed to get tests: not logged in.");
    }
  });
}