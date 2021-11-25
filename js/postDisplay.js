var lastPost; //stores a snapshot of the last document we get from query
// date and time options are used to convert milliseconds into proper date format
var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
var timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
};

//number of posts on the screen
var numPostsDisplayed = 0;
//posts added by clicking on 'see more...' button
var morePostsDisplayed = 0;

function displayPosts(i) {
    let postContainer = document.getElementById('container');
    let postParent = document.getElementById('postParent');
    var currentUser;

    //=================use this part when page is first loaded========================
    // go into collection ‘posts’ => order it by timestamp =>
    //limit the resulting queries to ‘i’ (where i = any integer) =>
    //get this query result => save a snapshot of the last document in ‘lastPost’ (more on this later) =>
    //for each document that we get from the query => populate the clone of the div and it’s children =>
    //append this whole container div to it’s parent container.
    //For now, we display 5 posts at a time. If the user wants to see more, they can click on ‘see more…’

    db.collection('posts')
        .orderBy('time', 'desc')
        .limit(i)
        .get()
        .then((snap) => {
            //snap that last document
            lastPost = snap.docs[snap.docs.length - 1];
            snap.forEach((docs) => {
                morePostsDisplayed++;
                //populate the template divs
                let postTemplate = postContainer.content.cloneNode(true);
                postTemplate.querySelector('.postContent').innerHTML =
                    docs.data().description;
                postTemplate.querySelector('#tagsHere').textContent =
                    docs.data().tags;
                postTemplate.querySelector('.postDate').textContent =
                    new Intl.DateTimeFormat('en-US', dateOptions).format(
                        docs.data().time.toDate()
                    );
                postTemplate.querySelector('.postTime').textContent =
                    new Intl.DateTimeFormat('en-US', timeOptions).format(
                        docs.data().time.toDate()
                    );
                postTemplate.querySelector('#term').textContent = `1`;
                postTemplate.querySelector('#set').textContent = `D`;
                postTemplate.querySelector('.userName').textContent =
                    docs.data().posterName;
                postParent.appendChild(postTemplate);
            });
        })
        .then(function () {
            // add listeners to all like/dislike buttons and make them interactive
            let thumbUpListen = document.querySelectorAll('#thumbUp');
            let thumbDownListen = document.querySelectorAll('#thumbDown');
            for (let x = 0; x < thumbUpListen.length; x++) {
                thumbUpListen[x].addEventListener('click', function () {
                    this.style.color =
                        window.getComputedStyle(thumbUpListen[x]).color ===
                        'rgb(0, 0, 0)'
                            ? 'rgb(0, 128, 0)'
                            : 'rgb(0, 0, 0)';
                });
                thumbDownListen[x].addEventListener('click', function () {
                    this.style.color =
                        window.getComputedStyle(thumbDownListen[x]).color ===
                        'rgb(0, 0, 0)'
                            ? 'rgb(0, 128, 0)'
                            : 'rgb(0, 0, 0)';
                });
            }
        })
        .then(function () {
            numPostsDisplayed += morePostsDisplayed;
            morePostsDisplayed = 0;
        });
}
//=================use this part when page is first loaded========================

displayPosts(5);

//==================use this when a user click on 'see more...'==========================
// After they click on see more, they get 3 more posts. This is where the snapshot of lastPost comes in handy.
// See more… => go into collection ‘posts’ => order it by timestamp =>
//start the query after the place where last query finished i.e lastPost =>
//limit the resulting queries to 3=> get this query result => update the value of lastPost =>
//populate the template clones and show them in the page.

document.getElementById('seeMore').addEventListener('click', function () {
    let postContainer = document.getElementById('container');
    let postParent = document.getElementById('postParent');
    var currentUser;

    db.collection('posts')
        .orderBy('time', 'desc')
        .startAfter(lastPost)

        .limit(3)
        .get()
        .then((snap) => {
            lastPost = snap.docs[snap.docs.length - 1];
            snap.forEach((docs) => {
                morePostsDisplayed++;
                let postTemplate = postContainer.content.cloneNode(true);
                postTemplate.querySelector('.postContent').innerHTML =
                    docs.data().description;
                postTemplate.querySelector('#tagsHere').textContent =
                    docs.data().tags;
                postTemplate.querySelector('.postDate').textContent =
                    new Intl.DateTimeFormat('en-US', dateOptions).format(
                        docs.data().time.toDate()
                    );
                postTemplate.querySelector('.postTime').textContent =
                    new Intl.DateTimeFormat('en-US', timeOptions).format(
                        docs.data().time.toDate()
                    );
                postTemplate.querySelector('#term').textContent = `1`;
                postTemplate.querySelector('#set').textContent = `D`;
                postTemplate.querySelector('.userName').textContent =
                    docs.data().posterName;

                postParent.appendChild(postTemplate);
            });
        })
        .then(function () {
            let thumbUpListen = document.querySelectorAll('#thumbUp');
            let thumbDownListen = document.querySelectorAll('#thumbDown');
            for (let x = numPostsDisplayed; x < thumbUpListen.length; x++) {
                thumbUpListen[x].addEventListener('click', function () {
                    this.style.color =
                        window.getComputedStyle(thumbUpListen[x]).color ===
                        'rgb(0, 0, 0)'
                            ? 'rgb(0, 128, 0)'
                            : 'rgb(0, 0, 0)';
                });
                thumbDownListen[x].addEventListener('click', function () {
                    this.style.color =
                        window.getComputedStyle(thumbDownListen[x]).color ===
                        'rgb(0, 0, 0)'
                            ? 'rgb(0, 128, 0)'
                            : 'rgb(0, 0, 0)';
                });
            }
        })
        .then(function () {
            numPostsDisplayed += morePostsDisplayed;
            morePostsDisplayed = 0;
        });
});
//==================use this when a user click on 'see more...'==========================
