var uid;
var fileName;
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

function start(){
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        
        uid = user.uid;
         star(uid)
        
       
      } 
      else {
          location.href = "../../index.html"
          
      }
  
  })

}

function star(uid){

  var name = document.getElementById("name").value
  var price = document.getElementById("price").value
  var cetegory = document.getElementById("cetegory").value
  var delivery = document.getElementById("delivery").value

  var dishobj = {
    name: name,
    price: price,
    cetegory: cetegory,
    delivery: delivery,
    resuid: uid,
    filename: fileName,
  }
  


  var db = firebase.firestore().collection(`dishes`);
    db.add(dishobj)
        .then(() => {
            console.log('todo added!');
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}
function upload(){
  var img = document.getElementById("file").files[0];
  fileName = img.name
  
  var storageref = firebase.storage().ref("dish/"+fileName)

  storageref.put(img);
  start()
}


function logout(){
  firebase.auth().signOut()
        .then(function() {
            location.href = "./login.html"
        })
        .catch(function(er) {
            console.log(er);
        })
}


