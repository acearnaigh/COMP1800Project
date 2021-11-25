function getWeeklySchedule() {
    firebase.auth().onAuthStateChanged(async (user) => {
        // Check if user is signed in:
        if (user) {
            const testSchedule = db.collection('fixedSchedule');

            const daysSnapShot = await testSchedule.get();

            const daysMap = {
                Monday: 0,
                Tuesday: 1,
                Wednesday: 2,
                Thursday: 3,
                Friday: 4,
            };

            const daysOrderMap = [];
            const daysContainingCourses = daysSnapShot.docs.map(
                (daySnapShot, index) => {
                    if (daySnapShot.exists) {
                        daysOrderMap.push(daysSnapShot.docs[index].id);
                        // Monday - Friday Documents
                        const dayRef = db.doc(daySnapShot.ref.path);
                        const comp1510 = dayRef.collection('1510');
                        const comp1113 = dayRef.collection('1113');
                        const comp1800 = dayRef.collection('1800');
                        const comp1712 = dayRef.collection('1712');
                        const comp1100 = dayRef.collection('1100');
                        const comp1537 = dayRef.collection('1537');
                        const comm1116 = dayRef.collection('1116');

                        return [
                            comp1510,
                            comp1113,
                            comp1800,
                            comp1712,
                            comp1100,
                            comp1537,
                            comm1116,
                        ];
                    }
                }
            );

            const weeklyScheduleDayContents = $('.weeklyScheduleDayContent');
            const daysDOM = {};
            const selectorMap = {};
            daysOrderMap.forEach((day, index) => {
                daysDOM[day] = weeklyScheduleDayContents[daysMap[day]];
                selectorMap[index] = daysDOM[day];
            });

            for (let i = 0; i < 5; i++) {
                daysContainingCourses[i].forEach(async (courseCollection) => {
                    // Inside of the course collection
                    const coursesSnapShot = await courseCollection.get();

                    if (coursesSnapShot.docs.length > 0) {
                        const cardBorder = $('<div class="card body"></div>');
                        const cardBody = $('<div class="card-body"></div>');
                        const courseId = $('<h5 class="card-title"></h5>');
                        const courseName = $(
                            '<h6 class="card-subtitle mb-2 text-muted"></h6>'
                        );
                        const courseTime = $(
                            '<h6 class="card-subtitle mb-2 text-muted"></h6>'
                        );
                        const workName = $('<p></p>');
                        const workDueTime = $(
                            '<h6 class="card-subtitle mb-2 text-muted"></h6>'
                        );
                        const quizName = $('<p></p>');
                        const quizDueTime = $(
                            '<h6 class="card-subtitle mb-2 text-muted"></h6>'
                        );
                        cardBorder.append(cardBody);
                        cardBody
                            .append(courseId)
                            .append(courseName)
                            .append(courseTime)
                            .append(workName)
                            .append(workDueTime)
                            .append(quizName)
                            .append(quizDueTime);

                        // Show course ID
                        courseId.html(
                            courseCollection.id == 1116
                                ? `COMM ${courseCollection.id}`
                                : `COMP ${courseCollection.id}`
                        );

                        $(selectorMap[i]).prepend(cardBorder);
                        // daysDOM[courseCollection.id].prepend(cardBorder);

                        // weeklyScheduleDayContents.eq(i).prepend(cardBorder);
                        coursesSnapShot.docs.forEach((itemSnapShot) => {
                            // Inside course details documents
                            if (itemSnapShot.exists) {
                                switch (itemSnapShot.id) {
                                    case 'ID':
                                        courseName.html(
                                            itemSnapShot.data().courseName
                                        );
                                        break;
                                    case 'time':
                                        courseTime.html(
                                            itemSnapShot.data().time
                                        );
                                        break;
                                    case 'type':
                                        courseName.html(
                                            `${courseName.html()} - ${
                                                itemSnapShot.data().type
                                            }`
                                        );
                                        break;
                                    case 'Assignments':
                                        workName.html(itemSnapShot.id);
                                        workDueTime.html(
                                            formatTimestamp(
                                                itemSnapShot.data().assDeadline
                                            )
                                        );
                                        break;
                                    case 'Quiz':
                                        quizName.html(itemSnapShot.id);
                                        quizDueTime.html(
                                            formatTimestamp(
                                                itemSnapShot.data().deadline
                                            )
                                        );
                                        break;
                                }
                            }
                        });
                    }
                });
            }
        } else {
            console.log('No user is signed in');
        }
    });
}

getWeeklySchedule();

// format timestamp
function formatTimestamp(timestamp) {
    const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const date = new Intl.DateTimeFormat('en-US', dateOptions).format(
        timestamp
    );
    const time = new Intl.DateTimeFormat('en-US', timeOptions).format(
        timestamp
    );

    return `${date} - ${time}`;
}

window.addEventListener('load', function () {
    let weekly = document.getElementById('weekly');
    weekly.getElementsByTagName('a')[0].removeAttribute('href');
    weekly.getElementsByClassName('foot_icons')[0].style.color = 'black';
    weekly.getElementsByClassName('centering_icon_text')[0].style.color =
        'black';
});
