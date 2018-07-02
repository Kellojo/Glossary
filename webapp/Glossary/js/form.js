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
        /* Change password form */
        case "user":
            grabInsertWord();
            break;
    }
  }
}

/* Checks weather the currently entered word in the insert word modal is already in the db and colorizes the input field red if thats true */
function checkForDuplicateWord() {
  $.get("php/queryExistingWordsForDuplicates.php", { term: $("#iw_word").val() }, function(returns) {
      if (JSON.parse(returns)) {
        $("#iw_word").addClass("redBackground");
      } else {
        $("#iw_word").removeClass("redBackground");
      }
  });
}
