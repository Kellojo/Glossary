<?php
	@session_start();
	include "utility/checkSession.php";
	if (!isset($_SESSION["id"]) || !isset($_POST["tID"])) { die("error"); };

	/* Connect to the db */
	require($_SERVER['DOCUMENT_ROOT']."/php/dbConnector.php");

	/* Get all tables for a given user */
	$rows = array();

	$stmt = $connection->prepare('SELECT word, description, source, words.wID FROM words JOIN sources on words.sID = sources.sID JOIN tables on words.tID = tables.tID WHERE tables.tID = ? && tables.oID = ?');
	$stmt->bind_param('ss', $_POST["tID"], $_SESSION["id"]);
	$stmt->execute();
	$result = $stmt->get_result();
	while($row = mysqli_fetch_assoc($result)) {
		array_push ($rows, $row);
	};

    $connection->close();
    
    echo  "ID, Wort, Beschreibung, Quelle\n";
	foreach ($rows as &$row) {
        echo $row["words.wID"].", ".$row["word"].", ".$row["description"].", ".$row["source"]."\n";
    }

	die();
?>
