firebase.auth().onAuthStateChanged(function(user) {
  console.log(JSON.stringify(user,null,2));
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
}


function signup(){

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
      // ...
    });
}

function logout(){
  firebase.auth().signOut();
}

function getUsers() {
  var xmlHttp = new XMLHttpRequest();
  firebase.auth().currentUser.getIdToken(true)
    .then((idToken)=> {
      xmlHttp.open( "GET", "/users/" + ((firebase.auth().currentUser) ? idToken : 12)  , false ); // false for synchronous request
      xmlHttp.setRequestHeader("idToken",idToken);
      xmlHttp.send( null );
      return xmlHttp.responseText;
    })
    .catch((e) => {
      alert(e);
    });

}

