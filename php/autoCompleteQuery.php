<?php
	@session_start();
	if (!isset($_SESSION["id"])) { die("error"); };
  if (!isset($_GET['term'])) { die("[]"); };

	/* Connect to the db */
	require($_SERVER['DOCUMENT_ROOT']."/php/dbConnector.php");

	/* Get all sources for a given user */
	$sources = array();
  $searchTerm = "%".$_GET["term"]."%";

	$stmt = $connection->prepare('Select sources.sID, sources.source From sources Join Words on words.sID = sources.sID Join tables on tables.tID = words.tID Where tables.oID = ? && sources.source Like ?;');
	$stmt->bind_param('ss', $_SESSION["id"], $searchTerm);
	$stmt->execute();
	$result = $stmt->get_result();
	while($row = mysqli_fetch_assoc($result)) {
		$source = array(
			"sID" => $row['sID'],
			"source" => $row['source']
		);
		array_push ($sources, $row['source']);
	};
	$connection->close();
	
	echo json_encode(array_unique($sources));
	die();
?>
