

/* tries to login the user */
function register(username, password, isAutoLogin) {
    $.post("/php/register.php", {username: username, password: password}, function(result){
        console.log(result);
        if (isAutoLogin && result.includes("success")) {
            login (username, password);
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
    login($('#form_username').val(), $('#form_password').val());
    $('#login').hide();
    $('#form_username').val("");
    $('#form_password').val("");
}

/* grabs the user input and sends it to the register function and logs the user in after completion */
function grabRegistration() {
    var status = register($('#form_registration_username').val(), $('#form_registration_password').val(), true);
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


/* Handle key input (enter for submitting & escape for exiting something...) */
$(document).keypress(function(e) {
    //enter
    if(e.which == 13) {
      SubmitCurrentForm();
    }

    //add a word
    if(e.which == 43) {
      $('#insertWord').show();
      currentlyOpenedForm = 'addWord';
    }
});
