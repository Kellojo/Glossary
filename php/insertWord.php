<?php
	@session_start();
	if (!isset($_SESSION["id"]) || !isset($_POST["tID"]) || !isset($_POST["word"]) || !isset($_POST["description"]) || !isset($_POST["source"])) { die("error - first"); };
	if ($_SESSION["id"] == "" || $_POST["tID"] == "" || $_POST["word"] == "") { die("error"); };

	/* Connect to the db */
	require($_SERVER['DOCUMENT_ROOT']."/php/dbConnector.php");

	/* Insert source into the db */
	$stmt = $connection->prepare('INSERT INTO sources (source) VALUES(?);');
	$stmt->bind_param('s', $_POST["source"]);
	$stmt->execute();
	$sID = mysqli_insert_id($connection);

	/* Insert word into the db */
	$stmt = $connection->prepare('INSERT INTO words (tID, word, description, sID, datetimeOfInsertion) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP);');
	$stmt->bind_param('ssss', $_POST["tID"], $_POST["word"], $_POST["description"], $sID);
	$stmt->execute();
	$connection->close();
	die("success");
?>