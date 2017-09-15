<?php
	@session_start();
	/* Exit */
	if (!isset( $_POST["username"], $_POST["password"])) {
		echo "error";
		exit;
	};
	if ($_POST["username"] == "" || $_POST["password"] == "") {
		echo "error";
		exit;
	};

	$username = $_POST["username"];
	$password = $_POST["password"];

	/* Connect to the db */
	require($_SERVER['DOCUMENT_ROOT']."/php/dbConnector.php");
	
	/* Check if user exists */
	$stmt = $connection->prepare('Select COUNT(*) FROM users where username=?');
	$stmt->bind_param('s', $username);
	$stmt->execute();
	$result = $stmt->get_result();
	$foundUsers = mysqli_fetch_array($result)[0];
	if ($foundUsers < 1) { die("error"); };

	/* Get password */
	$stmt = $connection->prepare('select uID, password from users where username = ?');
	$stmt->bind_param('s', $username);
	$stmt->execute();
	$result = $stmt->get_result();
	while($row = mysqli_fetch_assoc($result)) {
		if (!isset($row['password'])) {
			$connection->close();
			echo "error";
			exit;
		};

		$ret_id = $row['uID'];
		$ret_pass = $row['password'];
	};
	
	/* Check login credentials */
	$isCorrect = password_verify($password, $ret_pass);
	if ($isCorrect) {
		$_SESSION["id"] = $ret_id;
		echo "success";
	} else {
		$connection->close();
		session_destroy();
		echo "error";
		exit;
	}

	$connection->close();
?>