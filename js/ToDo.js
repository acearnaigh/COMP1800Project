var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
var timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
};

$(function () {
    $('#datepicker').datepicker({
        showButtonPanel: true,
        showAnim: 'clip',
        changeMonth: true,
        changeYear: true,
        yearRange: '2021:2031',
    });
});

$('#time').bootstrapMaterialDatePicker({
    date: false,
    shortTime: false,
    format: 'HH:mm',
});

function auto_grow(element) {
    element.style.height = '10px';
    element.style.height = element.scrollHeight + 'px';
}

document.getElementById('submitToDo').addEventListener('click', function () {
    var task = document.getElementById('writeTask').value;
    var date = document.getElementById('datepicker').value;
    var time = document.getElementById('time').value;
    var fieldID = new Date(date + ' ' + time);
    fieldID = fieldID.getTime();
    if (task == '' || date == '' || time == '') {
        alert('Empty fields detected!!');
    } else {
        document.getElementById('writeTask').value = '';
        document.getElementById('datepicker').value = '';
        document.getElementById('time').value = '';
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var currentUser = db.collection('users').doc(user.uid);
                var userUID = user.uid;

                currentUser
                    .get()
                    .then((userDoc) => {
                        db.collection('tasks')
                            .doc(userUID)
                            .set(
                                {
                                    [user.uid + fieldID]: task,
                                },
                                { merge: true }
                            );
                    })
                    .then(function () {
                        let taskContainer =
                            document.getElementById('container');
                        let listContainer =
                            document.getElementById('listContainer');

                        let taskTemplate =
                            taskContainer.content.cloneNode(true);
                        taskTemplate.querySelector('.readToDo').innerHTML =
                            task;
                        taskTemplate.querySelector('.readDate').textContent =
                            new Intl.DateTimeFormat(
                                'en-US',
                                dateOptions
                            ).format(fieldID);
                        taskTemplate.querySelector('.readTime').textContent =
                            new Intl.DateTimeFormat(
                                'en-US',
                                timeOptions
                            ).format(fieldID);
                        taskTemplate.querySelector('.todoContainer').id =
                            localStorage.getItem('userID') + fieldID;
                        listContainer.appendChild(taskTemplate);
                    })
                    .then(function () {
                        let completeListen = document
                            .querySelector(
                                '#' + localStorage.getItem('userID') + fieldID
                            )
                            .querySelector('#doneAll');
                        let removeListen = document
                            .querySelector(
                                '#' + localStorage.getItem('userID') + fieldID
                            )
                            .querySelector('#delete');
                        let undoListen = document
                            .querySelector(
                                '#' + localStorage.getItem('userID') + fieldID
                            )
                            .querySelector('#undo');

                        completeListen.addEventListener('click', function () {
                            let taskContent =
                                this.parentNode.parentNode.querySelector(
                                    '.readToDo'
                                ).textContent;
                            console.log(taskContent);
                            this.parentNode.parentNode.querySelector(
                                '.readToDo'
                            ).innerHTML = '<s>' + taskContent + '</s>';
                            let constructTaskID =
                                localStorage.getItem('userID') +
                                new Date(
                                    this.parentNode.parentNode.querySelector(
                                        '.readDate'
                                    ).textContent +
                                        ' ' +
                                        this.parentNode.parentNode.querySelector(
                                            '.readTime'
                                        ).textContent
                                ).getTime();

                            console.log(constructTaskID);
                            db.collection('tasks')
                                .doc(localStorage.getItem('userID'))
                                .update({
                                    [constructTaskID]:
                                        this.parentNode.parentNode.querySelector(
                                            '.readToDo'
                                        ).innerHTML,
                                });

                            // this.style.color =
                            //     window.getComputedStyle(completeListen[x]).color ===
                            //     'rgb(0, 0, 0)' ? 'rgb(0, 128, 0)'
                            //         : 'rgb(0, 0, 0)';
                        });
                        removeListen.addEventListener('click', function () {
                            let constructRemoveTaskID =
                                localStorage.getItem('userID') +
                                new Date(
                                    this.parentNode.parentNode.querySelector(
                                        '.readDate'
                                    ).textContent +
                                        ' ' +
                                        this.parentNode.parentNode.querySelector(
                                            '.readTime'
                                        ).textContent
                                ).getTime();
                            console.log(constructRemoveTaskID);
                            db.collection('tasks')
                                .doc(localStorage.getItem('userID'))
                                .update({
                                    [constructRemoveTaskID]:
                                        firebase.firestore.FieldValue.delete(),
                                });
                            this.parentNode.parentNode.remove();
                        });

                        undoListen.addEventListener('click', function () {
                            let unStrikeTaskContent =
                                this.parentNode.parentNode.querySelector(
                                    '.readToDo'
                                ).textContent;
                            this.parentNode.parentNode.querySelector(
                                '.readToDo'
                            ).innerHTML = unStrikeTaskContent;
                            let constructUndoTaskID =
                                localStorage.getItem('userID') +
                                new Date(
                                    this.parentNode.parentNode.querySelector(
                                        '.readDate'
                                    ).textContent +
                                        ' ' +
                                        this.parentNode.parentNode.querySelector(
                                            '.readTime'
                                        ).textContent
                                ).getTime();

                            console.log(constructUndoTaskID);
                            db.collection('tasks')
                                .doc(localStorage.getItem('userID'))
                                .update({
                                    [constructUndoTaskID]:
                                        this.parentNode.parentNode.querySelector(
                                            '.readToDo'
                                        ).innerHTML,
                                });
                        });
                    });
            }
        });
    }
});

window.addEventListener('load', function () {
    //disabling the button add_post after you're on the right page
    let todo = document.getElementById('todo');
    todo.getElementsByTagName('a')[0].removeAttribute('href');
    todo.getElementsByClassName('foot_icons')[0].style.color = 'black';
    todo.getElementsByClassName('centering_icon_text')[0].style.color = 'black';
    //------------------------------------------------------------------------

    let taskContainer = document.getElementById('container');
    let listContainer = document.getElementById('listContainer');

    let userTask = db
        .collection('tasks')
        .doc(this.localStorage.getItem('userID'));

    userTask
        .get()
        .then((taskDoc) => {
            const taskData = taskDoc.data();
            for (const key in taskData) {
                const value = taskData[key];
                // console.log(key);
                // console.log(value);
                var milliseconds = key
                    .split(localStorage.getItem('userID'))
                    .pop();
                console.log(milliseconds);
                let taskTemplate = taskContainer.content.cloneNode(true);
                taskTemplate.querySelector('.readToDo').innerHTML = value;
                taskTemplate.querySelector('.readDate').textContent =
                    new Intl.DateTimeFormat('en-US', dateOptions).format(
                        milliseconds
                    );
                taskTemplate.querySelector('.readTime').textContent =
                    new Intl.DateTimeFormat('en-US', timeOptions).format(
                        milliseconds
                    );
                listContainer.appendChild(taskTemplate);
            }
        })
        .then(function () {
            let completeListen = document.querySelectorAll('#doneAll');
            let removeListen = document.querySelectorAll('#delete');
            let undoListen = document.querySelectorAll('#undo');
            for (let x = 0; x < completeListen.length; x++) {
                completeListen[x].addEventListener('click', function () {
                    let taskContent =
                        this.parentNode.parentNode.querySelector(
                            '.readToDo'
                        ).textContent;
                    console.log(taskContent);
                    this.parentNode.parentNode.querySelector(
                        '.readToDo'
                    ).innerHTML = '<s>' + taskContent + '</s>';
                    let constructTaskID =
                        localStorage.getItem('userID') +
                        new Date(
                            this.parentNode.parentNode.querySelector(
                                '.readDate'
                            ).textContent +
                                ' ' +
                                this.parentNode.parentNode.querySelector(
                                    '.readTime'
                                ).textContent
                        ).getTime();

                    console.log(constructTaskID);
                    db.collection('tasks')
                        .doc(localStorage.getItem('userID'))
                        .update({
                            [constructTaskID]:
                                this.parentNode.parentNode.querySelector(
                                    '.readToDo'
                                ).innerHTML,
                        });

                    // this.style.color =
                    //     window.getComputedStyle(completeListen[x]).color ===
                    //     'rgb(0, 0, 0)' ? 'rgb(0, 128, 0)'
                    //         : 'rgb(0, 0, 0)';
                });
                removeListen[x].addEventListener('click', function () {
                    let constructRemoveTaskID =
                        localStorage.getItem('userID') +
                        new Date(
                            this.parentNode.parentNode.querySelector(
                                '.readDate'
                            ).textContent +
                                ' ' +
                                this.parentNode.parentNode.querySelector(
                                    '.readTime'
                                ).textContent
                        ).getTime();
                    console.log(constructRemoveTaskID);
                    db.collection('tasks')
                        .doc(localStorage.getItem('userID'))
                        .update({
                            [constructRemoveTaskID]:
                                firebase.firestore.FieldValue.delete(),
                        });
                    this.parentNode.parentNode.remove();
                });

                undoListen[x].addEventListener('click', function () {
                    let unStrikeTaskContent =
                        this.parentNode.parentNode.querySelector(
                            '.readToDo'
                        ).textContent;
                    this.parentNode.parentNode.querySelector(
                        '.readToDo'
                    ).innerHTML = unStrikeTaskContent;
                    let constructUndoTaskID =
                        localStorage.getItem('userID') +
                        new Date(
                            this.parentNode.parentNode.querySelector(
                                '.readDate'
                            ).textContent +
                                ' ' +
                                this.parentNode.parentNode.querySelector(
                                    '.readTime'
                                ).textContent
                        ).getTime();

                    console.log(constructUndoTaskID);
                    db.collection('tasks')
                        .doc(localStorage.getItem('userID'))
                        .update({
                            [constructUndoTaskID]:
                                this.parentNode.parentNode.querySelector(
                                    '.readToDo'
                                ).innerHTML,
                        });
                });
            }
        });
});
