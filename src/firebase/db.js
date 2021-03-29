import firebase from 'firebase';

const db = firebase.firestore();

export function saveTest(callback) {
  console.log('saving test');
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("Logged in");
      let user_id = user.uid;
      let qdata = JSON.parse(sessionStorage.mc_qdata);
      const test_id = qdata.test_name;
      const testsDoc = db.doc("users/"+user_id+"/tests/"+test_id);
      testsDoc.set({
          data: qdata
      }).then(function() {
        callback(true);
      }).catch(function (error) {
        console.log("Failed to save: "+error);
        callback(false);
      });
    } else {
      console.log("Failed to save: not logged in.");
      callback(false);
    }
  });
}

export function getMytests(callback) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      let user_id = user.uid;
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
        callback(null);
      });
    } else {
      console.log("Failed to get tests: not logged in.");
      callback(null);
    }
  });
}

export function deleteTest(test_id, callback) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      var user_id = user.uid;
      const testsDoc = db.doc("users/"+user_id+"/tests/"+test_id);
      testsDoc.delete().then(function() {
        callback(true);
      }).catch(function (error) {
        console.log("Failed to delete: "+error);
        callback(false);
      });
    } else {
      console.log("Failed to delete test: not logged in.");
      callback(false);
    }
  });
}

export function convertVersion() {
  //localStorage.mc_backup = "{}";
  const userCol = db.collection("users");
  userCol.get().then((users) => {
    users.forEach((user) => {
      console.log("User: "+JSON.stringify(user.data()));
      let user_id = user.id;
      let testCol = db.collection("users/"+user_id+"/tests");
      testCol.get().then((tests) => {
        tests.forEach((test) => {
          /*
          let test_id = test.id;
          let qdata = test.data()["data"];
          // Process Data
          saveData(user_id, test_id, qdata);
          */
        });
      })
    })
  }).catch(function(error) {
    console.log("Convert error: "+error);
  });
}

function saveData(user_id, test_id, qdata) {
  const testsDoc = db.doc("users/"+user_id+"/tests/"+test_id);
  testsDoc.set({
      data: qdata
  }).then(function() {
    console.log(test_id+" saved successfully");
  }).catch(function (error) {
    console.log("Failed to save: "+error);
  });
}