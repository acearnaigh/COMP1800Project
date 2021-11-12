var totalPosts;
var firstPost;
var uniqueContentID;

db.collection('posts').get().then(numPosts => {
     totalPosts = numPosts.size // will return the collection size
     console.log(totalPosts);
  });


// db.collection("posts").orderBy("time","desc").doc("063772125779.678000000XtPqNIdMX2hL9WWzrGyVr4gGgHU2").get().then(docS => {
//     console.log(docS)
// })


var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
var timeOptions = {
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false,
  };
async function getPostData(i, postContent, postTags, postDate, postTime, userName) {
    if (i == 0) {
        db.collection("posts").orderBy("time","desc").limit(1).get().then(snap => {
            var lastPost = snap.docs[snap.docs.length-1]
            localStorage.setItem('marker', lastPost);
            console.log(lastPost);
        }).then( function() {
            // console.log("Don't be here");
            db.collection("posts").orderBy("time","desc").limit(1).get().then(snap => {
                snap.docChanges().forEach(docs => {
                    // quillPlace.innerHTML = docs.doc.data().description;
                    uniqueContentID = ( docs.doc.data().userUID + docs.doc.data().time ).toString().split(".").join("") ;
                    postContent.innerHTML = docs.doc.data().description;
                    postContent.id = uniqueContentID;
                    document.getElementById("tagsHere").textContent = docs.doc.data().tags;
                    postDate.textContent = new Intl.DateTimeFormat('en-US', dateOptions).format(docs.doc.data().time.toDate());
                    postTime.textContent = new Intl.DateTimeFormat('en-US', timeOptions).format(docs.doc.data().time.toDate());
                    document.getElementById("term").textContent = `1`;
                    document.getElementById("set").textContent = `D`;
                    db.collection("users").doc(docs.doc.data().userUID).get().then (userDoc=> {
                        userName.textContent = userDoc.data().name;
                    })
                });
            })
        })
    } else {
        var marker = localStorage.getItem('marker');
        db.collection("posts").orderBy("time","desc").startAfter(marker).limit(1).get().then(snap => {
            lastPost = snap.docs[snap.docs.length-1]
            localStorage.setItem('marker', lastPost);
        }).then( function() {

            db.collection("posts").orderBy("time","desc").startAfter(marker).limit(1).get().then(snap => {
                snap.docChanges().forEach(docs => {
                    // quillPlace.innerHTML = docs.doc.data().description;
                    uniqueContentID = ( docs.doc.data().userUID + docs.doc.data().time ).toString().split(".").join("") ;
                    postContent.innerHTML = docs.doc.data().description;
                    postContent.id = uniqueContentID;
                    document.getElementById("tagsHere").textContent = docs.doc.data().tags;
                    postDate.textContent = new Intl.DateTimeFormat('en-US', dateOptions).format(docs.doc.data().time.toDate());
                    postTime.textContent = new Intl.DateTimeFormat('en-US', timeOptions).format(docs.doc.data().time.toDate());
                    document.getElementById("term").textContent = `1`;
                    document.getElementById("set").textContent = `D`;
                    db.collection("users").doc(docs.doc.data().userUID).get().then (userDoc=> {
                        userName.textContent = userDoc.data().name;
                    })
                });
            })
        })
    }
    }

async function getPostData(i, postContent, postTags, postDate, postTime, userName) {
        db.collection("posts").orderBy("time","desc").limit(5).get().then(snap => {
            var lastPost = snap.docs[snap.docs.length-1]
            // console.log(lastPost);
            // console.log("Don't be here");
            snap.docChanges().forEach(docs => {
                    // quillPlace.innerHTML = docs.doc.data().description;
                    uniqueContentID = ( docs.doc.data().userUID + docs.doc.data().time ).toString().split(".").join("") ;
                    postContent.innerHTML = docs.doc.data().description;
                    postContent.id = uniqueContentID;
                    document.getElementById("tagsHere").textContent = docs.doc.data().tags;
                    postDate.textContent = new Intl.DateTimeFormat('en-US', dateOptions).format(docs.doc.data().time.toDate());
                    postTime.textContent = new Intl.DateTimeFormat('en-US', timeOptions).format(docs.doc.data().time.toDate());
                    document.getElementById("term").textContent = `1`;
                    document.getElementById("set").textContent = `D`;
                    db.collection("users").doc(docs.doc.data().userUID).get().then (userDoc=> {
                        userName.textContent = userDoc.data().name;
                    })
                });
            })
        }

function createDiv(i) {

    var postGrid = document.createElement('div');
    postGrid.classList.add("postContainer");

    var userAvatar = document.createElement('div');
    userAvatar.classList.add("userAvatar");
    userAvatar.innerHTML = `<img src = "./Images/defaultUser.jpg" class = "userImg"/>`;
    var userName = document.createElement('div');
    userName.classList.add("userName");

    var userTerm = document.createElement('div');
    userTerm.classList.add("userTerm");
    userTerm.innerHTML = `<span>Term: </span><span id="term"></span><span> Set: </span><span id="set"></span>`

    // var userSet = document.createElement('div');
    // userSet.classList.add("userSet");

    var postDate = document.createElement('div');
    postDate.classList.add("postDate");

    var postTime = document.createElement('div');
    postTime.classList.add("postTime");

    var postTags = document.createElement('div');
    postTags.classList.add("postTags");
    postTags.innerHTML = `<span>Tags: </span><span id = "tagsHere"></span>`

    var postContent = document.createElement('div');
    postContent.classList.add("postContent");


    var getFile = document.createElement('div');
    getFile.classList.add("getFile");

    var getImage = document.createElement('div');
    getImage.classList.add("getImage");

    var postLike = document.createElement('div');
    postLike.classList.add("postLike");
    postLike.innerHTML = `<i id="thumbUp" class="material-icons">thumb_up</i>`

    var postDislike = document.createElement('div');
    postDislike.classList.add("postDislike");
    postDislike.innerHTML = `<i id="thumbDown" class="material-icons">thumb_down</i>`

    getFile.innerHTML = `<button type="button" class="btn btn-dark">View Attachments</button>`
    getImage.innerHTML = `<button type="button" class="btn btn-dark">View Images</button>`

    // var quillPlace = document.createElement("div");
    // quillPlace.setAttribute('class', 'ql-editor quillPlace');
    // quillPlace.setAttribute('data-gramm', 'false');
    // quillPlace.setAttribute('contentEditable', "false");




        document.getElementById("container").appendChild(postGrid);
        postGrid.appendChild(userAvatar);
        postGrid.appendChild(userName);
        postGrid.appendChild(userTerm);
        // postGrid.appendChild(userSet);
        postGrid.appendChild(postTime);
        postGrid.appendChild(postDate);
        postGrid.appendChild(postTags);
        postGrid.appendChild(postContent);
        // postGrid.appendChild(quillPlace);
        postGrid.appendChild(postLike);
        postGrid.appendChild(postDislike);
        postGrid.appendChild(getFile);
        postGrid.appendChild(getImage);

        getPostData(i, postContent, postTags, postDate, postTime, userName)

        let thumbUpListen = document.querySelectorAll("#thumbUp");
        let thumbDownListen = document.querySelectorAll("#thumbDown");
        for (let x = 0; x < thumbUpListen.length; x++){
            thumbUpListen[x].addEventListener("click", function() {
                this.style.color = this.style.color === 'black' ? 'green' : 'black';
            })
            thumbDownListen[x].addEventListener("click", function() {
                this.style.color = this.style.color === 'black' ? 'green' : 'black';
            })
        }

    // .then(function () {


    //     console.log(i);
    //     var quill = new Quill('.postContent', {

    //         modules: { toolbar: false },
    //         theme: 'snow'
    //     });
    //     // document.querySelector("#" + uniqueContentID + " > div").innerHTML;
    // })

}

function numDivs(x) {

        createDiv(n);
    }





