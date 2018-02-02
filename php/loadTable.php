<?php
	@session_start();
	if (!isset($_SESSION["id"]) || !isset($_POST["tID"])) { die("error"); };

	/* Connect to the db */
	require($_SERVER['DOCUMENT_ROOT']."/php/dbConnector.php");

	/* Get all tables for a given user */
	$rows = array();
	$count = 0;

	$stmt = $connection->prepare('SELECT word, description, source, words.wID FROM words JOIN sources on words.sID = sources.sID JOIN tables on words.tID = tables.tID WHERE tables.tID = ? && tables.oID = ?');
	$stmt->bind_param('ss', $_POST["tID"], $_SESSION["id"]);
	$stmt->execute();
	$result = $stmt->get_result();
	while($row = mysqli_fetch_assoc($result)) {
		array_push ($rows, $row);
	};

	$stmt = $connection->prepare('SELECT count(*) FROM words JOIN sources on words.sID = sources.sID JOIN tables on words.tID = tables.tID WHERE tables.tID = ? && tables.oID = ?');
	$stmt->bind_param('ss', $_POST["tID"], $_SESSION["id"]);
	$stmt->execute();
	$result = $stmt->get_result();
	while($row = mysqli_fetch_assoc($result)) {
		$count = $row;
	};


	$connection->close();
	echo json_encode($rows);
	die();
?>
