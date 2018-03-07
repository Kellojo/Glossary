<?php
	@session_start();
	if (!isset($_POST["tablename"]) || !isset($_SESSION["id"])) { die("error");};
	$tablename = trim($_POST["tablename"]);
	if ($tablename == "") { die("errorEmptyInput_TableName"); };

	/* Connect to the db and hash the password */
	require($_SERVER['DOCUMENT_ROOT']."/php/dbConnector.php");

	/* Insert user into the db and close the connection */
	$stmt = $connection->prepare('INSERT INTO tables (tableName, oID) VALUES (?, ?)');
	$stmt->bind_param('ss', $tablename, $_SESSION["id"]);
	$stmt->execute();
	$result = $stmt->get_result();
	$connection->close();

	die("success");
?>
