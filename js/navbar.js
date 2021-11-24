// hide login/signup button if user logged in
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        $('#loginSignupButton').addClass('loggedIn');
        $('#logoutButton').css('display', 'inline-block');
    } else {
        $('#loginSignupButton').removeClass('loggedIn');
        $('#logoutButton').css('display', 'none');
    }
});
