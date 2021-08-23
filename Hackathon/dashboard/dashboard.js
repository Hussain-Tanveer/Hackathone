var uid;
var status;
var user;

var firebaseConfig = {
  apiKey: "AIzaSyDFgoirRevsscDYcXGEN3lsmunbd9SHBbE",
  authDomain: "hackathon-bfd40.firebaseapp.com",
  projectId: "hackathon-bfd40",
  storageBucket: "hackathon-bfd40.appspot.com",
  messagingSenderId: "397309231954",
  appId: "1:397309231954:web:995b28ffdb5122d05d708b",
  measurementId: "G-7TGT3CG9LK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
    user = user;
     uid = user.uid;

     var db = firebase.firestore();

  db.collection("users").doc(user.uid).get().then((snap) => {
        
    status = snap.data().status;
     Start()
      
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
     
      // ...
      
    } else {
    location.href = "../index.html"
    }
  });
function Start(){

    if( status == "resturent"){
        location.href = "./ResturentDashboard/ResturentDash.html"
  
    }
    else if( status == "user"){
      location.href = "./UserDashboard/userdash.html"
    }
    else{
        console.log("x")
    }
}

  
