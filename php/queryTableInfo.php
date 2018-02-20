<?php
	@session_start();
	if (!isset($_SESSION["id"]) || !isset($_POST["tID"])) { die("error"); };

	/* Connect to the db */
	require($_SERVER['DOCUMENT_ROOT']."/php/dbConnector.php");

	/* Get all tables for a given user */
	$rows = array();

	/* query table name */
	$stmt = $connection->prepare('SELECT tableName FROM tables WHERE tables.tID = ? && tables.oID = ?');
	$stmt->bind_param('ss', $_POST["tID"], $_SESSION["id"]);
	$stmt->execute();
	$result = $stmt->get_result();
  $result = mysqli_fetch_assoc($result);
	$tableName = $result["tableName"];

	/* query word count in the given table */
	$stmt = $connection->prepare('SELECT Count(*) FROM words JOIN sources on words.sID = sources.sID JOIN tables on words.tID = tables.tID WHERE tables.tID = ? && tables.oID = ?');
	$stmt->bind_param('ss', $_POST["tID"], $_SESSION["id"]);
	$stmt->execute();
	$result = $stmt->get_result();
  $result = mysqli_fetch_assoc($result);
	$wordCount = reset($result);

	$connection->close();

	echo $tableName." (".$wordCount.")";

	die();
?>
