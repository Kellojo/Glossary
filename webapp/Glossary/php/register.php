<?php
	if (!isset($_POST["username"]) || !isset($_POST["password"])) { die("error");};
	$username = $_POST["username"];
	$password = $_POST["password"];
	if ($username == "" || $password == "") { die("error"); };

	/* Connect to the db and hash the password */
	require($_SERVER['DOCUMENT_ROOT']."/php/dbConnector.php");

	/* Check if user already exists */
	$stmt = $connection->prepare('Select COUNT(*) FROM users where username=?');
	$stmt->bind_param('s', $username);
	$stmt->execute();
	$result = $stmt->get_result();
	$foundUsers = mysqli_fetch_array($result)[0];
	if ($foundUsers > 0) { die("userAlready"); };

	$salt = bin2hex(openssl_random_pseudo_bytes(16));
	$options = [
		'cost' => 12,
	];
	$hash = password_hash($password + $salt, PASSWORD_DEFAULT, $options);
	
	/* Insert user into the db and close the connection */
	$stmt = $connection->prepare('INSERT INTO users (username, password, salt, datetimeOfRegistration) VALUES (?, ?, ?, CURRENT_TIMESTAMP)');
	$stmt->bind_param('sss', $username, $hash, $salt);
	$stmt->execute();
	$result = $stmt->get_result();
	$connection->close();

	die("success");
?>
