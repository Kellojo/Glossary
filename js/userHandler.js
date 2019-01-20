

/* tries to login the user */
function register(email, password, isAutoLogin) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        showErrorNotf(errorMessage);
        goToRegistration();

        GlossaryConfig.controls.loginAndRegistration.registrationForm.passwordInput.val("");
    });
}

/* grabs the user input and sends it to the register function and logs the user in after completion */
function onRegistrationButtonPress() {
    var email = GlossaryConfig.controls.loginAndRegistration.registrationForm.emailInput.val().trim();
    var password = GlossaryConfig.controls.loginAndRegistration.registrationForm.passwordInput.val().trim();

    /* Abort the login process if the password and or username input fields are empty */
    if (email == "" || password == "") {
        showErrorNotf("Please enter a valid email and password");
        return;
    }

    /* register the new user */
    goToBusy();
    var status = register(email, password, true);
}

/* tries to login the user */
function login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        showErrorNotf(errorMessage);
        goToLogin();

        GlossaryConfig.controls.loginAndRegistration.loginForm.passwordInput.val("");
    });
}

/* graps the user input and sends it to the login function */
function onLoginButtonPress() {
    var email = GlossaryConfig.controls.loginAndRegistration.loginForm.emailInput.val().trim();
    var password = GlossaryConfig.controls.loginAndRegistration.loginForm.passwordInput.val().trim();

    /* Abort the login process if the password and or email input fields are empty */
    if (email == "" || password == "") {
        showErrorNotf("Please enter a valid email and password");
        return;
    }

    /* login */
    goToBusy();
    login(email, password);
}

/* Called when the authentication was successfull */
function onAuthStateChanged(oUser) {
    if (oUser) {
        Glossary.currentUser = oUser;
        showSuccessNotf("Welcome " + getUserDisplayName());
        console.log("Login successfull");

        setUpDisplay("loggedIn");

        GlossaryConfig.controls.loginAndRegistration.loginForm.emailInput.val("");
        GlossaryConfig.controls.loginAndRegistration.registrationForm.emailInput.val("");
        GlossaryConfig.controls.loginAndRegistration.loginForm.passwordInput.val("");
        GlossaryConfig.controls.loginAndRegistration.registrationForm.passwordInput.val("");
    } else {
        setUpDisplay("loggedOut");
        Glossary.currentUser = null;
        goToLogin();
    }

    hideSplashScreen();
}

/* tries to change the password of the given user */
function changePassword(newPassword, currentPassword) {
    $.post("/php/changePassword.php", {password: currentPassword, newPassword: newPassword}, function(result){
        if (result.includes("success")) {
          showSuccessNotf("Password wurde geändert!");
        } else if (result.includes("invalidSession")) {
          showErrorNotf("Bitte loggen sie sich erneut ein.");
        } else {
          showErrorNotf("Fehler beim Ändern des Passworts!");
        }
    });
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
    firebase.auth().signOut().catch(function (error) {
        // An error happened.
        showErrorNotf(error.message);
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
