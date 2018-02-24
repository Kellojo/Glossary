<?php
  /* Queries the database to check if the word is already in the db and returns true or false */

	@session_start();
	if (!isset($_SESSION["id"])) { die("error"); };
  if (!isset($_GET['term'])) { die("false"); };

	/* Connect to the db */
	require($_SERVER['DOCUMENT_ROOT']."/php/dbConnector.php");

	/* Get all sources for a given user */
	$sources = array();
  $searchTerm = "%".$_GET["term"]."%";

	$stmt = $connection->prepare('Select Count(*) From words Join tables on tables.tID = words.tID Where tables.oID = ? && words.word Like ?;');
	$stmt->bind_param('ss', $_SESSION["id"], $searchTerm);
	$stmt->execute();
	$result = $stmt->get_result();
  $count = 0;
	while($row = mysqli_fetch_assoc($result)) {
		$count = $row["Count(*)"];
    break;
	};
	$connection->close();

  /* echo the result */
  if ($count > 0) {
    echo 'true';
  } else {
    echo 'false';
  }

	die();
?>
