//listener event for after DOMContentLoaded
window.addEventListener('load', function () {
    //disabling the button add_post after you're on the right page
    addPost = document.getElementById('add_post')
    addPost.getElementsByTagName('a')[0].removeAttribute('href')
    addPost.getElementsByClassName('foot_icons')[0].style.color = 'black'
    addPost.getElementsByClassName('centering_icon_text')[0].style.color =
        'black'
    //------------------------------------------------------------------------

    // quill editor doesn't work on textarea, so a workaorund using divs and hiding textarea
    // workaround is basically: for every quill-editor class it finds,it will create a div after the textarea field
    //with a unique id and a fixed height, which will be used by the quill editor instance. the original textarea will get hidden.
    $('.editor').each(function (i, el) {
        var el = $(this),
            id = 'quilleditor-' + i,
            val = el.val(),
            editor_width = 79
        var div = $('<div/>')
            .attr('id', id)
            .css({ width: editor_width + 'vw', height: 30 + 'vw' })
            .html(val)
        el.addClass('d-none')
        el.parent().append(div)

        var toolbarOptions = [
            ['bold', 'italic', 'underline'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

            [{ size: ['small', 'normal', 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6] }],
            ['link', 'image'],
            ['clean'], // remove formatting button
        ]

        //workaround ends here but I still use this function loop to iterate through css properties

        //initializing a new instance of quill editor
        var quill = new Quill('#' + id, {
            modules: { toolbar: toolbarOptions },
            placeholder: 'Start Writing...',
            theme: 'snow',
        })
        //--------------------------------------------

        //edit quill editor toolbar button size
        buttonSize = document.querySelectorAll('.ql-snow.ql-toolbar button')

        for (let x = 0; x < buttonSize.length; x++) {
            buttonSize[x].style.height = '33px'
            buttonSize[x].style.width = '37px'
        }
        //-------------------------------------

        //edit font size in quill editor toolbar
        fontSizeHead = document.querySelectorAll('.ql-snow .ql-picker')
        for (let x = 0; x < fontSizeHead.length; x++) {
            fontSizeHead[x].style.fontSize = '16px'
            fontSizeHead[x].style.fontWeight = '600'
        }
        //-----------------------------------------

        //edit padding of the text in quill editor toolbar
        paddingHeading = document.querySelectorAll('.ql-snow .ql-picker-label')
        for (let x = 0; x < paddingHeading.length; x++) {
            paddingHeading[x].style.paddingLeft = '0px'
        }
        //-----------------------------------------------

        //choosing the right margin for just the first element this query picks up, which is "small" in quill toolbar
        document.querySelector(
            '.ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg'
        ).style.right = '20'
        //------------------------------------------------------------------------------------------------------------

        //updates the contents of texarea when the content in quill editor is changed
        quill.on('text-change', function () {
            el.html(quill.root.innerHTML)
        })
        //---------------------------------------------------------------------------
    })
})

//this is apache multiselect that converts a simple select statement
//into a dropdown with a checkboxes
$(document).ready(function () {
    $('#selectDrop').multiselect({
        includeSelectAllOption: true,
        inheritClass: true,
    })
})

//-------------------------------------------------------------------

document
    .getElementById('submitPost')
    .addEventListener('click', async function storeData() {
        var postInnerHTML = document.getElementById('writeText').value
        var postTags = $('#selectDrop').val()
        // var today = new Date();
        // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var time = firebase.firestore.Timestamp.now()
        var postDB = db.collection('posts')

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var currentUser = db.collection('users').doc(user.uid)
                var userUID = user.uid
                var postID = time + userUID
                //get the document for current user.
                currentUser.get().then((userDoc) => {
                    //get user Email
                    var userName = userDoc.data().name
                    // Start a new collection and add all data in it.
                    postDB
                        .doc(postID)
                        .set({
                            description: postInnerHTML,
                            tags: postTags,
                            time: time,
                            userUID: userUID,
                            posterName: userName,
                        })
                        .then(() => {
                            postDB.doc(postID).onSnapshot((postSnapshot) => {
                                if (postSnapshot.exists) {
                                    window.location.href = './postDisplay.html'
                                }
                            })
                        })
                })
            } else {
                // No user is signed in.
                console.log('no user signed in')
            }
        })
    })

// window.addEventListener("beforeunload", function (e) {
//     var confirmationMessage = 'It looks like you have been editing something. '
//                             + 'If you leave before saving, your changes will be lost.';

//     (e || window.event).returnValue = confirmationMessage; //Gecko + IE
//     return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
// });
