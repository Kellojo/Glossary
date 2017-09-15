<?php
	@session_start();
	if (!isset($_SESSION["id"]) || !isset($_POST["wID"])) { die("error"); };
	if ($_SESSION["id"] == "" || $_POST["wID"] == "") { die("error"); };

	/* Connect to the db */
	require($_SERVER['DOCUMENT_ROOT']."/php/dbConnector.php");

	/* Delete the word from the db */
	$stmt = $connection->prepare('DELETE FROM words WHERE wID = ?;');
	$stmt->bind_param('s', $_POST["wID"]);
	$stmt->execute();
	$connection->close();
	die("success");
?>