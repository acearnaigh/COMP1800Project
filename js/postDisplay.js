var lastPost
var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
var timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
}
var numPostsDisplayed = 0
var morePostsDisplayed = 0

function displayPosts(i) {
    let postContainer = document.getElementById('container')
    let postParent = document.getElementById('postParent')
    var currentUser

    db.collection('posts')
        .orderBy('time', 'desc')
        .limit(i)
        .get()
        .then((snap) => {
            lastPost = snap.docs[snap.docs.length - 1]
            snap.forEach((docs) => {
                morePostsDisplayed++
                let postTemplate = postContainer.content.cloneNode(true)
                postTemplate.querySelector('.postContent').innerHTML =
                    docs.data().description
                postTemplate.querySelector('#tagsHere').textContent =
                    docs.data().tags
                postTemplate.querySelector('.postDate').textContent =
                    new Intl.DateTimeFormat('en-US', dateOptions).format(
                        docs.data().time.toDate()
                    )
                postTemplate.querySelector('.postTime').textContent =
                    new Intl.DateTimeFormat('en-US', timeOptions).format(
                        docs.data().time.toDate()
                    )
                postTemplate.querySelector('#term').textContent = `1`
                postTemplate.querySelector('#set').textContent = `D`
                postTemplate.querySelector('.userName').textContent =
                    docs.data().posterName
                postParent.appendChild(postTemplate)
            })
        })
        .then(function () {
            let thumbUpListen = document.querySelectorAll('#thumbUp')
            let thumbDownListen = document.querySelectorAll('#thumbDown')
            for (let x = 0; x < thumbUpListen.length; x++) {
                thumbUpListen[x].addEventListener('click', function () {
                    this.style.color =
                        window.getComputedStyle(thumbUpListen[x]).color ===
                        'rgb(0, 0, 0)'
                            ? 'rgb(0, 128, 0)'
                            : 'rgb(0, 0, 0)'
                })
                thumbDownListen[x].addEventListener('click', function () {
                    this.style.color =
                        window.getComputedStyle(thumbDownListen[x]).color ===
                        'rgb(0, 0, 0)'
                            ? 'rgb(0, 128, 0)'
                            : 'rgb(0, 0, 0)'
                })
            }
        })
        .then(function () {
            numPostsDisplayed += morePostsDisplayed
            morePostsDisplayed = 0
        })
}

displayPosts(5)

document.getElementById('seeMore').addEventListener('click', function () {
    let postContainer = document.getElementById('container')
    let postParent = document.getElementById('postParent')
    var currentUser

    db.collection('posts')
        .orderBy('time', 'desc')
        .startAfter(lastPost)

        .limit(3)
        .get()
        .then((snap) => {
            lastPost = snap.docs[snap.docs.length - 1]
            snap.forEach((docs) => {
                morePostsDisplayed++
                let postTemplate = postContainer.content.cloneNode(true)
                postTemplate.querySelector('.postContent').innerHTML =
                    docs.data().description
                postTemplate.querySelector('#tagsHere').textContent =
                    docs.data().tags
                postTemplate.querySelector('.postDate').textContent =
                    new Intl.DateTimeFormat('en-US', dateOptions).format(
                        docs.data().time.toDate()
                    )
                postTemplate.querySelector('.postTime').textContent =
                    new Intl.DateTimeFormat('en-US', timeOptions).format(
                        docs.data().time.toDate()
                    )
                postTemplate.querySelector('#term').textContent = `1`
                postTemplate.querySelector('#set').textContent = `D`
                postTemplate.querySelector('.userName').textContent =
                    docs.data().posterName

                postParent.appendChild(postTemplate)
            })
        })
        .then(function () {
            let thumbUpListen = document.querySelectorAll('#thumbUp')
            let thumbDownListen = document.querySelectorAll('#thumbDown')
            for (let x = numPostsDisplayed; x < thumbUpListen.length; x++) {
                thumbUpListen[x].addEventListener('click', function () {
                    this.style.color =
                        window.getComputedStyle(thumbUpListen[x]).color ===
                        'rgb(0, 0, 0)'
                            ? 'rgb(0, 128, 0)'
                            : 'rgb(0, 0, 0)'
                })
                thumbDownListen[x].addEventListener('click', function () {
                    this.style.color =
                        window.getComputedStyle(thumbDownListen[x]).color ===
                        'rgb(0, 0, 0)'
                            ? 'rgb(0, 128, 0)'
                            : 'rgb(0, 0, 0)'
                })
            }
        })
        .then(function () {
            numPostsDisplayed += morePostsDisplayed
            morePostsDisplayed = 0
        })
})
