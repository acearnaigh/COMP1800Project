//logout
const logout = document.querySelector('#')

document.getElementById("logout").addEventListener("click", function () {
    firebase.auth().signOut()
        .then(function () {
            console.log("logout successful")
        })
        .catch(function (error) {
            console.log(error)
        })
})