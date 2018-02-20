

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
        	setUpDisplay("loggedIn");
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

/* tries to login the user */
function logout() {
    $.post("/php/logout.php", {}, function(result){
        console.log(result);
        if (result == "success") {
        	setUpDisplay("loggedOut");
        }
    });
}
