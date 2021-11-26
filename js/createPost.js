// This page can be used by a BCIT student (user) to make a new post and inform their peers about schedule changes,
//assignment deadlines changed, or anything new that might affect others in their set or term.

// This page will give you:
//      -a WYSIWYG (What You Say Is What You Get) text editor with limited functionality
//      (although scalable) to edit your post the way you want
//      -an option to add tags to your post which are used to categorize the post
//      -an option to add attachments.

//We used an open-source Quill Editor to make this happen. The buttons in the toolbar are not just placeholders,
//but with the help of JS, and JQuery, they are functional and edit the text.
//After this, there’s a dropdown with checkboxes for adding tags. We know it looks really simple but a dropdown usually
//just has single-select options unless you convert each choice to a button of its own which sounds tedious.
//It uses bootstrap and javascript to convert ‘select’ elements into a dropdown with checkboxes.

//listener event for after DOMContentLoaded
window.addEventListener('load', function () {
    // quill editor doesn't work on textarea, so a workaorund using divs and hiding textarea
    // workaround is basically: for every quill-editor class it finds,it will create a div after the textarea field
    //with a unique id and a fixed height, which will be used by the quill editor instance. the original textarea will get hidden.
    $('.editor').each(function (i, el) {
        var el = $(this),
            id = 'quilleditor-' + i,
            val = el.val(),
            editor_width = 80;
        var div = $('<div/>')
            .attr('id', id)
            .css({ width: editor_width + 'vw', height: 80 + 'vw' })
            .html(val);
        el.addClass('d-none');
        el.parent().append(div);

        var toolbarOptions = [
            ['bold', 'italic', 'underline'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

            [{ size: ['small', 'normal', 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6] }],
            ['link'],
            ['clean'], // remove formatting button
        ];

        //workaround ends here but I still use this function loop to iterate through css properties

        //initializing a new instance of quill editor
        var quill = new Quill('#' + id, {
            modules: { toolbar: toolbarOptions },
            placeholder: 'Start Writing...',
            theme: 'snow',
        });
        //--------------------------------------------

        //edit quill editor toolbar button size
        buttonSize = document.querySelectorAll('.ql-snow.ql-toolbar button');

        for (let x = 0; x < buttonSize.length; x++) {
            buttonSize[x].style.height = '33px';
            buttonSize[x].style.width = '37px';
        }
        //-------------------------------------

        //edit font size in quill editor toolbar
        fontSizeHead = document.querySelectorAll('.ql-snow .ql-picker');
        for (let x = 0; x < fontSizeHead.length; x++) {
            fontSizeHead[x].style.fontSize = '16px';
            fontSizeHead[x].style.fontWeight = '600';
        }
        //-----------------------------------------

        //edit padding of the text in quill editor toolbar
        paddingHeading = document.querySelectorAll('.ql-snow .ql-picker-label');
        for (let x = 0; x < paddingHeading.length; x++) {
            paddingHeading[x].style.paddingLeft = '0px';
        }
        //-----------------------------------------------

        //choosing the right margin for just the first element this query picks up, which is "small" in quill toolbar
        document.querySelector(
            '.ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg'
        ).style.right = '20';
        //------------------------------------------------------------------------------------------------------------

        //updates the contents of texarea when the content in quill editor is changed
        quill.on('text-change', function () {
            el.html(quill.root.innerHTML);
        });
        //---------------------------------------------------------------------------
    });
});

//this is apache multiselect that converts a simple select statement
//into a dropdown with a checkboxes
$(document).ready(function () {
    $('#selectDrop').multiselect({
        includeSelectAllOption: true,
        inheritClass: true,
    });
});

//-------------------------------------------------------------------

// After a user clicks on submit:
//          -event listener detects a click
//          -get innerHTML for what the user typed in using our editor
//          -get an array of all the tags they selected
//          -use firebase’s timestamp function to get the precise time at which the user clicked submit
//          -create a unique ID for post document
//          -put all the data in their respective collections
//          -after the above step is done, get an updated snapshot, use the unique postID to check if
//           their record was created and if it was, redirect them to the next page, else, we’ll display an error (alert) message.
//          -Assuming the submission was successful, the database is update, The user is redirected to postDisplay.html.
//           A page where you can see all the posts made by everyone including your own.

document
    .getElementById('submitPost')
    .addEventListener('click', async function storeData() {
        var postInnerHTML = document.getElementById('writeText').value;
        var postTags = $('#selectDrop').val();
        var time = firebase.firestore.Timestamp.now();
        var postDB = db.collection('posts');

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var currentUser = db.collection('users').doc(user.uid);
                var userUID = user.uid;
                var postID = time + userUID;
                //get the document for current user.
                currentUser.get().then((userDoc) => {
                    //get user Email
                    var userName = userDoc.data().name;
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
                                    window.location.href = './postDisplay.html';
                                }
                            });
                        });
                });
            } else {
                // No user is signed in.
                console.log('no user signed in');
            }
        });
    });
