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
  var pok;
  var uid;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      
      uid = user.uid;
       
      render(uid)
     
    } 
    else {
        location.href = "../../index.html"
        
    }

})
function render(uid){


    firebase.firestore().collection("dishes").get()
        .then(function(snapshot){
            snapshot.forEach(function(data){
                var obj = data.data()
                var src = obj.filename;
                
                var storage = firebase.storage();

                var storageRef = storage.ref();
                storageRef.child('dish/'+src).getDownloadURL()
                .then((url) => {
                    
                    document.getElementById("div").innerHTML += `
                    <div class="card" style="width: 18rem;">
                        <img src="${url}" class="card-img-top">
                        <div class="card-body">
                        <h5 class="card-title">${obj.name}</h5>
                        <p class="card-text text-success" style="font-weight: 500; margin: -1%;">Price: ${obj.price}</p>
                        <p class="card-text" style=" margin: -1%;" >Cetegory: ${obj.cetegory}</p>
                        <p class="card-text" style=" margin: -1%;" >Delivery Type : ${obj.delivery}</p>
                        <button  class="btn btn-success" style="float: right;" id="${data.id}" onclick="order(this)">Order</button>
                        </div>
                    </div>
   
               `
   
                 })


                })


        })
 }
 var newobj;
 function order(t){

    var docRef = firebase.firestore().collection("dishes").doc(t.id);
    docRef.get().then((doc) => {
        if (doc.exists) {
            var data = doc.data()
            newobj = {
                status: "panding",
                titel: data.name,
                price: data.price,
                cetegory: data.cetegory,
                delivery: data.delivery,
                userUid: uid,
                resUid: data.resuid,
                
                

            }
            console.log(newobj)
            var db = firebase.firestore().collection("pending");
            db.add(newobj)
            .then(
                () =>{
                    swal({
                        titel: "good Job",
                        icon: "success",
                        button: "next",
                    })
                }
            )
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
                
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}