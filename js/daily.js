// db.collection('testSchedule')
//     .doc('Monday')
//     .listCollections()
//     .then((subCollections) => {
//         subCollections.forEach((subCollection) => {
//             subCollection.get().then((array) => {
//                 array.docs.forEach((doc) => {
//                     console.log(doc.data())
//                 })
//             })
//         })
//     })
const whatDate = new Date();
const weekday = new Array(7);
weekday[0] = 'Sunday';
weekday[1] = 'Monday';
weekday[2] = 'Tuesday';
weekday[3] = 'Wednesday';
weekday[4] = 'Thursday';
weekday[5] = 'Friday';
weekday[6] = 'Saturday';

var timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
};

let today = weekday[whatDate.getDay()];
console.log(today);
window.addEventListener('load', function () {
    document.getElementById('whatIsToday').textContent = today;
    //disabling the button add_post after you're on the right page
    let daily = document.getElementById('daily');
    daily.getElementsByTagName('a')[0].removeAttribute('href');
    daily.getElementsByClassName('foot_icons')[0].style.color = 'black';
    daily.getElementsByClassName('centering_icon_text')[0].style.color =
        'black';
    //------------------------------------------------------------------------
    let dailyContainer = document.getElementById('dailyContainer');
    let falseContainer = document.getElementById('falseDaily');
    let trueContainer = document.getElementById('trueDaily');

    db.collection('dayCRN')
        .doc(today)
        .get()
        .then((docs) => {
            const classList = docs.data().classList;
            for (const key in classList) {
                classList[key];
                db.collection(classList[key])
                    .doc(today)
                    .get()
                    .then((docs) => {
                        let dailyTemplate =
                            dailyContainer.content.cloneNode(true);
                        dailyTemplate.querySelector('.classCode').textContent =
                            docs.data().courseID;
                        dailyTemplate.querySelector('.classType').textContent =
                            docs.data().courseType;
                        dailyTemplate.querySelector('.classRoom').textContent =
                            docs.data().courseRoom;
                        dailyTemplate.querySelector('.classStart').textContent =
                            new Intl.DateTimeFormat(
                                'en-US',
                                timeOptions
                            ).format(docs.data().courseStartTime.toDate());
                        dailyTemplate.querySelector('.classEnd').textContent =
                            new Intl.DateTimeFormat(
                                'en-US',
                                timeOptions
                            ).format(docs.data().courseEndTime.toDate());
                        dailyTemplate.querySelector('.classContainer').id =
                            this.localStorage.getItem('userID') +
                            classList[key];
                        falseContainer.appendChild(dailyTemplate);
                    });
            }
        })
        .then(function () {
            let taskContainer = document.getElementById('dailyTaskContainer');
            db.collection('tasks')
                .doc(this.localStorage.getItem('userID'))
                .get()
                .then((taskDoc) => {
                    const taskData = taskDoc.data();
                    for (const key in taskData) {
                        const value = taskData[key];

                        var milliseconds = key
                            .split(this.localStorage.getItem('userID'))
                            .pop();
                        let taskDate = new Date(
                            parseInt(milliseconds, 10)
                        ).setHours(0, 0, 0, 0);
                        let justDailyDate = whatDate.setHours(0, 0, 0, 0);
                        console.log(milliseconds);
                        if (taskDate.valueOf() === justDailyDate.valueOf()) {
                            console.log(taskDate);
                            console.log(justDailyDate);
                            let taskTemplate =
                                taskContainer.content.cloneNode(true);
                            taskTemplate.querySelector('.readToDo').innerHTML =
                                value;
                            taskTemplate.querySelector(
                                '.readTime'
                            ).textContent = new Intl.DateTimeFormat(
                                'en-US',
                                timeOptions
                            ).format(milliseconds);
                            taskTemplate.querySelector('.todoContainer').id =
                                localStorage.getItem('userID') + milliseconds;
                            falseContainer.appendChild(taskTemplate);
                        }
                    }
                })
                .then(function () {
                    let idArr = [];
                    let elementWithId = document
                        .getElementById('falseDaily')
                        .querySelectorAll('*[id]:not([id="unfold"])');
                    Array.prototype.forEach.call(
                        elementWithId,
                        function (el, i) {
                            // "el" is your element
                            console.log(el.id); // log the ID
                            idArr.push(el.id);
                        }
                    );

                    console.log(idArr);
                    idArr.sort(function compareDatesbyID(id1, id2) {
                        let dateID1 = new Date(
                            'Sun Jan 1 2021 ' +
                                document
                                    .getElementById(id1)
                                    .querySelector('.readTime').textContent
                        );
                        let dateID2 = new Date(
                            'Sun Jan 1 2021 ' +
                                document
                                    .getElementById(id2)
                                    .querySelector('.readTime').textContent
                        );

                        if (dateID1.valueOf() < dateID2.valueOf()) {
                            return -1;
                        }
                        if (dateID1.valueOf() > dateID2.valueOf()) {
                            return 1;
                        }
                        if (dateID1.valueOf() === dateID2.valueOf()) {
                            return 0;
                        }
                    });
                    console.log(idArr);
                    Array.prototype.forEach.call(idArr, function (elID, i) {
                        $('#' + elID).appendTo('#trueDaily');
                    });
                })
                .then(function () {
                    moreInfoListen = document.querySelectorAll('#unfold');
                    let dailyClassInfo =
                        document.getElementById('dailyClassInfo');

                    for (let x = 0; x < moreInfoListen.length; x++) {
                        moreInfoListen[x].addEventListener(
                            'click',
                            function () {
                                let collectionName =
                                    this.parentNode.parentNode.id
                                        .split(localStorage.getItem('userID'))
                                        .pop();
                                console.log(collectionName);
                                db.collection(collectionName)
                                    .doc(today)
                                    .get()
                                    .then((docs) => {
                                        let dailyInfo =
                                            dailyClassInfo.content.cloneNode(
                                                true
                                            );
                                        let infoID =
                                            'Info' +
                                            localStorage.getItem('userID') +
                                            collectionName;
                                        let checkID =
                                            document.getElementById(infoID);
                                        if (checkID != null) {
                                            $('#' + infoID).hide('slow');
                                        } else {
                                            dailyInfo.querySelector(
                                                '.classInfo'
                                            ).id = infoID;
                                            dailyInfo.querySelector(
                                                '.classInfo'
                                            ).id = infoID;
                                            dailyInfo.querySelector(
                                                '.className'
                                            ).textContent =
                                                'Name: ' +
                                                docs.data().courseName;
                                            dailyInfo.querySelector(
                                                '.classDelivery'
                                            ).textContent =
                                                'Delivery Method: ' +
                                                docs.data().courseDelivery;
                                            dailyInfo.querySelector(
                                                '.classInstructor'
                                            ).textContent =
                                                'Instrctor: ' +
                                                docs.data().courseInstructor;
                                            dailyInfo.querySelector(
                                                '.instructorEmail'
                                            ).textContent =
                                                'Instructor Email: ' +
                                                docs.data().instructorEmail;
                                            if (
                                                docs.data().courseLink != null
                                            ) {
                                                dailyInfo
                                                    .querySelector('.classLink')
                                                    .getElementsByTagName(
                                                        'a'
                                                    )[0]
                                                    .setAttribute(
                                                        'href',
                                                        docs.data().courseLink
                                                    );
                                                dailyInfo
                                                    .querySelector('.classLink')
                                                    .getElementsByTagName(
                                                        'a'
                                                    )[0]
                                                    .setAttribute(
                                                        'target',
                                                        '_blank'
                                                    );
                                            }
                                            $(dailyInfo).insertAfter(
                                                this.parentNode.parentNode
                                            );

                                            $('#' + infoID).show('slow');

                                            document.getElementById(
                                                infoID
                                            ).style.display = 'grid';
                                        }
                                    });
                            }
                        );
                    }
                });
        });
});
