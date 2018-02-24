

$( document ).ready(function() {

  /* Sets up the initial state of the website */
  $( document ).ready(function() {
     $.post("/php/checkSession.php", {}, function(result){
          console.log(result);
          if (result == "valid") {
          	setUpDisplay("loggedIn");
          } else {
          	setUpDisplay("loggedOut");
          }
      });
  });

  /* add word input field listener */
  $('#iw_word').on('input', function() {
    checkForDuplicateWord();
  });

  /* Handle key input (enter for submitting & escape for exiting something...) */
  $(document).keypress(function(e) {
      handleKeyInput(e);
  });





});
