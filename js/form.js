// Get the modal
var modal = document.getElementById('insertWord');

var currentlyOpenedForm = null;

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/* Handle key input (enter for submitting & escape for exiting something...) */
$(document).keypress(function(e) {
    //enter
    if(e.which == 13) {
      SubmitCurrentForm();
    }

    //escape
});

/* submits the currently opened form */
function SubmitCurrentForm() {
  if (currentlyOpenedForm != null) {

    //submit form depending on the currently opened one
    switch(currentlyOpenedForm) {
        case "login":
            grabLogin();
            break;
        case "register":
            grabRegistration();
            break;
        case "addTable":
            grabAddTable();
            break;
        case "addWord":
            grabInsertWord();
            break;
    }

    
  }
}
