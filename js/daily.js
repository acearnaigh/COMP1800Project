//we give priority information and as soon as you open this page, you’ll be given a list of classes,
//along with user-created custom tasks. A user can expand the class label to get more information about it.

// Logic behind daily.js: (steps occur in order)
// 1.      What day is today? (Monday, Tuesday, ………….) let’s say Tuesday
// 2.      Get (dayCRN => Tuesday => [array of class numbers]).
// 3.      For each [array of class numbers (CRN)]:
//      a.      Get (class number (CRN) => Tuesday => all fields of class info).then (populate T1) and append() to falseDaily.
// 4.      Go into tasks collection => for current user =>
//          If (task is due today): {
//              get (tasks).then(populate T3) and append() to falseDaily
//              }
// 5.      While we were appending and populating templates, we gave each one of them a unique ID too.
// 6.      All these tasks and classes are in random order and not ordered by timestamp.
// 7.      Store ID’s for all divs under falseDaily in an array.
//      a.      Use a sort on this array to order them w.r.t timestamp using a custom ‘compare’ function (similar to java comparable interface)
//      b.      Now, go through this sorted array of ID’s => getElementByID => append() to trueDaily and remove() from falseDaily
// 8.      After all the above steps are done, addEventListeners to ‘dropdown’ icons.
// 9.      onCLick(dropdown icon) => get (class information).then =>populate T2 and append().

//used later, but for converting milliseconds into a proper time format
var timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
};

//get today's weekday
const whatDate = new Date();
const weekday = new Array(7);
weekday[0] = 'Sunday';
weekday[1] = 'Monday';
weekday[2] = 'Tuesday';
weekday[3] = 'Wednesday';
weekday[4] = 'Thursday';
weekday[5] = 'Friday';
weekday[6] = 'Saturday';

let today = weekday[whatDate.getDay()];
console.log(today);
//====================

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

    //use the master collection to get the id of correct class collection
    db.collection('dayCRN')
        .doc(today)
        .get()
        .then((docs) => {
            const classList = docs.data().classList;
            for (const key in classList) {
                classList[key];
                // go into the class collection with the id you got from master collection
                db.collection(classList[key])
                    .doc(today)
                    .get()
                    .then((docs) => {
                        // populate template div
                        let dailyTemplate =
                            dailyContainer.content.cloneNode(true);
                        dailyTemplate.querySelector('.classCode').textContent =
                            docs.data().courseID;
                        dailyTemplate.querySelector('.classType').textContent =
                            docs.data().courseType;
                        dailyTemplate.querySelector('.classRoom').textContent =
                            docs.data().courseRoom;
                        //time options that was declared globally on top is used here
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
                        // giving each div a unique ID so we access them later
                        dailyTemplate.querySelector('.classContainer').id =
                            this.localStorage.getItem('userID') +
                            classList[key];
                        //appending divs without sorting them w.r.t timestamp
                        falseContainer.appendChild(dailyTemplate);
                    });
            }
        })
        .then(function () {
            // after populating divs with class schedule, get today's tasks and populate another template
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
                            // again, no sorting just append to a dummy placeholder
                            falseContainer.appendChild(taskTemplate);
                        }
                    }
                })
                .then(function () {
                    // now, we get the Id's for all the divs appended to our dummy placeholder falseDaily
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
                    // for each ID in the array, get the time associated with it, use a custom compare function
                    // to compare Divs based on timestamp and order them in ascending
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
                    // append the divs in a sorted order to the actual div placeholder
                    Array.prototype.forEach.call(idArr, function (elID, i) {
                        $('#' + elID).appendTo('#trueDaily');
                    });
                })
                .then(function () {
                    // add a listener to all the dropdown icons on the page
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
                                        //if the dropdown is already expanded, hide it.
                                        if (checkID != null) {
                                            $('#' + infoID).hide(
                                                'slow',
                                                function () {
                                                    $(this).remove();
                                                }
                                            );
                                        } else {
                                            //else show and populate the dropdown template
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
                                                //only show the link button if it exists in the collection
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
                                            } else {
                                                dailyInfo
                                                    .querySelector('.classLink')
                                                    .remove();
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
