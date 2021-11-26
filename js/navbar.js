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

function goToLoginPage() {
    window.location.href = './Login.html';
}

function logout() {
    firebase
        .auth()
        .signOut()
        .then(function () {
            console.log('logout successful');
            window.location.assign('index.html');
        })
        .catch(function (error) {
            console.log(error);
        });
}
