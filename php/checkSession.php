<?php
	@session_start();
	if (isset($_SESSION["id"])) {
		die("valid");
	} else {
		die("invalid");
	}
?>
