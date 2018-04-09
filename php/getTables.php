<?php
	@session_start();
	include "utility/checkSession.php";

	/* Connect to the db */
	require($_SERVER['DOCUMENT_ROOT']."/php/dbConnector.php");

	/* Get all tables for a given user */
	$tables = array();

	$stmt = $connection->prepare('SELECT tableName, tID FROM tables WHERE oID=?');
	$stmt->bind_param('s', $_SESSION["id"]);
	$stmt->execute();
	$result = $stmt->get_result();
	while($row = mysqli_fetch_assoc($result)) {
		$table = array(
			"tID" => $row['tID'],
			"tableName" => $row['tableName']
		);
		array_push ($tables, $table);
	};
	$connection->close();
	echo json_encode($tables);
	die();
?>
