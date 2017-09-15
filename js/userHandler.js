

/* tries to login the user */
function register(username, password) {
    $.post("/php/register.php", {username: username, password: password}, function(result){
        console.log(result);
    });
}

/* tries to login the user */
function login(username, password) {
    $.post("/php/login.php", {username: username, password: password}, function(result){
        console.log(result);
        if (result == "success") {
        	setUpDisplay("loggedIn");
        }
    });
}

/* graps the user input and sends it to the login function */
function grabLogin() {
    login(document.getElementById('form_username').value, document.getElementById('form_password').value);
    document.getElementById('login').style.display="none";
    document.getElementById('form_username').value = "";
    document.getElementById('form_password').value = "";
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