<?php
	@session_start();
	if (!isset($_SESSION["id"]) || !isset($_POST["word"]) || !isset($_POST["description"]) || !isset($_POST["wID"]) || !isset($_POST["source"])) { die("error"); };
	if ($_SESSION["id"] == "" || $_POST["wID"] == "") { die("error"); };

	/* Connect to the db */
	require($_SERVER['DOCUMENT_ROOT']."/php/dbConnector.php");

	/*Update word in db */
	$stmt = $connection->prepare('UPDATE words JOIN tables on words.tID = tables.tID SET word = ?, description = ? WHERE words.wID = ? && tables.oID = ?;');
	$stmt->bind_param('ssss', nl2br($_POST["word"]), nl2br($_POST["description"]), $_POST["wID"], $_SESSION["id"]);
	$stmt->execute();

	/* Update source in db */
	$stmt = $connection->prepare('UPDATE sources JOIN words ON sources.sID = words.sID JOIN tables ON words.tID = tables.tID SET source = ? WHERE words.wID= ? && tables.oID = ?;');
	$stmt->bind_param('sss', nl2br($_POST["source"]), $_POST["wID"], $_SESSION["id"]);
	$stmt->execute();
	$connection->close();
	die("success");
?>