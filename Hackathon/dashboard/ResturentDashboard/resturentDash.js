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
    start(uid)
    console.log("1")
      
     
    } 
    else {
        location.href = "../../index.html"
        
    }



})

function start(uid){

    var docRef = firebase.firestore().collection("pending").where("status", "==", "panding")
    docRef.get()
    .then(function(snapshot){
        
        snapshot.forEach(function(data, index){
         
            var obj = data.data()
                console.log(obj)
            
            

            
                
                document.getElementById("div").innerHTML += `
                <div class="col col py-3 px-lg-5" style="border: solid 1px black; border-radius: 10px;" >

                <span class="titel" style="display: block; font-weight: bolder;">${obj.titel}</span>
                <span class="titel" style="display: block; ">Cetegery : ${obj.cetegory}</span>
                <span class="titel" style="display: block; ">Deleviery : ${obj.delivery}</span>
                <span class="titel" style="display: block; font-weight: bolder;">price : ${obj.price}</span>

                
                
                <button class="btn btn-sm btn-warning " style="float: right;" id="${data.id}" onclick="del(this)"> Accept</button>

            </div>

           `
            
             


            })


    })
}

function del (i){
    var db = firebase.firestore();

db.collection("pending").doc(i.id).update({status: "accepted"});
swal({
    titel: "good Job",
    text: "please refresh",
    icon: "success",
    button: "next",
})

    
    
}
