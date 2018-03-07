

/* tries to login the user */
function register(username, password, isAutoLogin) {
    $.post("/php/register.php", {username: username, password: password}, function(result){
        console.log(result);
        if (isAutoLogin && result.includes("success")) {
            login (username, password);
        } else if (result.includes("userAlready")) {
          showErrorNotf("Benutzername wird bereits verwendet!");
        }
    });
}

/* tries to login the user */
function login(username, password) {
    $.post("/php/login.php", {username: username, password: password}, function(result){
        console.log(result);
        if (result.includes("success")) {
          showSuccessNotf("Login erfolgreich!");
        	setUpDisplay("loggedIn");
        } else {
          showErrorNotf("Fehler beim Login!");
        }
    });
}

/* tries to change the password of the given user */
function changePassword(newPassword, currentPassword) {
    $.post("/php/changePassword.php", {password: currentPassword, newPassword: newPassword}, function(result){
        if (result.includes("success")) {
          showSuccessNotf("Password wurde geändert!");
        } else {
          showErrorNotf("Fehler beim Ändern des Passworts!");
        }
    });
}

/* graps the user input and sends it to the login function */
function grabLogin() {

  var username = $("#form_username").val().trim();
  var password = $("#form_password").val().trim();

  /* Abort the login process if the password and or username input fields are empty */
  if (username == "" || password == "") {
    showErrorNotf("Bitte gib einen Benutzernamen und ein Passwort ein.");
    return;
  }

  /* login */
  login(username, password);
  $('#login').hide();
  $('#form_username').val("");
  $('#form_password').val("");
}

/* grabs the user input and sends it to the register function and logs the user in after completion */
function grabRegistration() {

  var username = $("#form_registration_username").val().trim();
  var password = $("#form_registration_password").val().trim();

  /* Abort the login process if the password and or username input fields are empty */
  if (username == "" || password == "") {
    showErrorNotf("Bitte gib einen Benutzernamen und ein Passwort ein.");
    return;
  }

  /* register the new user */
  var status = register(username, password, true);
  $('#register').hide();
  $('#form_registration_username').val("");
  $('#form_registration_password').val("");
}

/* grabs the user input and sends it to the changePassword function to change the password */
function grabChangePassword() {
    var status = changePassword($('#form_user_newPassword').val(), $('#form_user_currentPassword').val(), true);
    $('#user').hide();
    $('#form_user_newPassword').val("");
    $('#form_user_currentPassword').val("");
}

/* tries to login the user */
function logout() {
    $.post("/php/logout.php", {}, function(result){
        console.log(result);
        if (result == "success") {
        	setUpDisplay("loggedOut");
          showSuccessNotf("See you soon!");
        }
    });
}

/* Handles hotkeys */
function handleKeyInput(input) {
  //enter
  if(input.which == 13) {
    SubmitCurrentForm();
  }

  //add a word
  if(input.which == 43) {
    $('#insertWord').show();
    currentlyOpenedForm = 'addWord';
  }
}
