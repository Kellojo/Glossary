<?php
	require($_SERVER['DOCUMENT_ROOT']."/config.php");
	// 1. Create a database connection
	$connection = mysqli_connect($DB_host,$DB_user,$DB_pass);
	if (!$connection) {
		die("Database connection failed: " . mysqli_error($connection));
	}

	// 2. Select a database to use 
	$db_select = mysqli_select_db($connection, $DB_db);
	if (!$db_select) {
		die("Database selection failed: " . mysqli_error($connection));
	};
?>