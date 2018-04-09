<?php
	@session_start();
	if (isset($_SESSION["id"])) {
		die("validSession");
	} else {
		die("invalidSession");
	}
?>
