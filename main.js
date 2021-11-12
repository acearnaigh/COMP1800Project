function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("logout successful");
      window.location.assign("index.html");
    })
    .catch(function (error) {
      console.log(error);
    });
}

// hide login/signup button if user logged in
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    $("#loginSignupButton").toggleClass("loggedIn");
  } else {
    $("#loginSignupButton").toggleClass("loggedIn");
  }
});
