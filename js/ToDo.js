$(function () {
    $('#datepicker').datepicker({
        showButtonPanel: true,
        showAnim: 'clip',
        changeMonth: true,
        changeYear: true,
        yearRange: '2021:2031',
    })
})

$('#time').bootstrapMaterialDatePicker({
    date: false,
    shortTime: false,
    format: 'HH:mm',
})

function auto_grow(element) {
    element.style.height = '10px'
    element.style.height = element.scrollHeight + 'px'
}

document.getElementById('submitToDo').addEventListener('click', function () {
    var task = document.getElementById('writeTask').value
    var date = document.getElementById('datepicker').value
    var time = document.getElementById('time').value
    var fieldID = firebase.firestore.Timestamp.fromDate(
        new Date(date + ' ' + time)
    )
    if (task == '' || date == '' || time == '') {
        alert('Empty fields detected!!')
    } else {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var currentUser = db.collection('users').doc(user.uid)
                var userUID = user.uid

                currentUser.get().then((userDoc) => {
                    db.collection('tasks').doc(userUID).set({}, { merge: true })
                })
            }
        })
    }
})

document.addEventListener('DOMContentLoaded', function () {})

window.addEventListener('load', function () {
    //disabling the button add_post after you're on the right page
    let todo = document.getElementById('todo')
    todo.getElementsByTagName('a')[0].removeAttribute('href')
    todo.getElementsByClassName('foot_icons')[0].style.color = 'black'
    todo.getElementsByClassName('centering_icon_text')[0].style.color = 'black'
    //------------------------------------------------------------------------

    let taskContainer = document.getElementById('container')
    let listContainer = document.getElementById('listContainer')

    let userTask = db
        .collection('tasks')
        .doc(this.localStorage.getItem('userID'))

    userTask.get().then((taskDoc) => {
        console.log(taskDoc.data())
    })
})
