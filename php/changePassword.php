<?php
	@session_start();

  if (!isset( $_POST["newPassword"], $_POST["password"])) {
		echo "error";
		exit;
	};
	if (empty($_POST["newPassword"]) || empty($_POST["password"])) {
		echo "error";
		exit;
	};


  $currentPassword = $_POST["password"];
  $newPassword = $_POST["newPassword"];
  $username = "";
  $uID = $_SESSION["id"];

  /* Connect to the db */
  require($_SERVER['DOCUMENT_ROOT']."/php/dbConnector.php");

  /* Check if user exists */
  $stmt = $connection->prepare('Select COUNT(*) FROM users where uID = ?');
  $stmt->bind_param('s', $uID);
  $stmt->execute();
  $result = $stmt->get_result();
  $foundUsers = mysqli_fetch_array($result)[0];
  if ($foundUsers < 1) { die("error"); };

  /* Get password and salt */
  $stmt = $connection->prepare('select uID, password, salt from users where uID = ?');
  $stmt->bind_param('s', $uID);
  $stmt->execute();
  $result = $stmt->get_result();
  while($row = mysqli_fetch_assoc($result)) {
    if (!isset($row['password'])) {
      $connection->close();
      echo "error";
      exit;
    };

    $uID = $row['uID'];
    $ret_salt = $row['salt'];
    $ret_pass = $row['password'];
  };

  /* Check login credentials */
  $isCorrect = password_verify($currentPassword + $ret_salt, $ret_pass);
  if (!$isCorrect) {
    $connection->close();
    session_destroy();
    echo "error";
    exit;
  }

  /* Correct username and password lets change his password then */
  $salt = bin2hex(openssl_random_pseudo_bytes(16));
  $options = [
		'cost' => 12,
	];
	$hash = password_hash($newPassword + $salt, PASSWORD_DEFAULT, $options);

	/* Insert user into the db and close the connection */
	$stmt = $connection->prepare('UPDATE users SET password = ?, salt = ? WHERE uID = ?;');
	$stmt->bind_param('sss', $hash, $salt, $uID);
	$stmt->execute();
	$result = $stmt->get_result();
	$connection->close();

	die("success");
?>
