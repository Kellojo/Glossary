<?php
	@session_start();
	if (!isset($_SESSION["id"]) || !isset($_POST["wID"]) || !isset($_POST["tID"])) { die("error"); };
	if ($_SESSION["id"] == "" || $_POST["wID"] == "" || $_POST["tID"] == "") { die("error"); };

	/* Connect to the db */
	require($_SERVER['DOCUMENT_ROOT']."/php/dbConnector.php");

	/* Delete the word from the db */
	$stmt = $connection->prepare('UPDATE words JOIN tables on words.tID = tables.tID SET words.tID = ? WHERE tables.oID = ? && words.wID = ?;');
	$stmt->bind_param('sss', $_POST["tID"], $_SESSION["id"], $_POST["wID"]);
	$stmt->execute();
	$connection->close();
	die("success");
?>