<?php @session_start(); ?>

<!DOCTYPE html>
<html>
	<head>
		<title>Glossary</title>
		<meta charset="UTF-8">
		<meta name="description" content="Glossary is what is says a glossary, saving words, their explanation and the source of that explanation in tables using a MySQL Database and a webserver capable of running php. Link to the GitHub repo: https://github.com/Kellojo/Glossary">
		<meta name="keywords" content="Glossary">
		<meta name="author" content="Kellojo (https://github.com/Kellojo)">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">


		<link rel="stylesheet" href="css/basic.css">
		<link rel="stylesheet" href="css/menu.css">
		<link rel="stylesheet" href="css/tabs.css">
		<link rel="stylesheet" href="css/table.css">
		<link rel="stylesheet" href="css/form.css">

		<link rel="stylesheet" href="css/thirdparty/contextMenu.css">
		<link rel="stylesheet" href="css/thirdparty/notifIt.css">
		<link rel="stylesheet" href="css/thirdparty/font-awesome-4.7.0/css/font-awesome.css">
		<link rel="stylesheet" href="css/thirdparty/jquery-ui.min.css">


		<script src="js/thirdparty/jquery-3.2.1.min.js"></script>
		<script src="js/thirdparty/jquery-ui.min.js"></script>
		<script src="js/thirdparty/notifIt.min.js"></script>

		<script src="js/tabs.js"></script>
		<script src="js/form.js"></script>
		<script src="js/contextMenu.js"></script>
		<script src="js/userHandler.js"></script>
		<script src="js/displayManager.js"></script>
		<script src="js/tableHandler.js"></script>
		<script src="js/standardizedNotifications.js"></script>
		<script src="js/init.js"></script>
	</head>
	<body>

		<div class="mainBody">
			<div class="menuContainer">
				<nav>
					<a id="nav_login" href="#" style="display: none;" onclick="$('#login').show(); currentlyOpenedForm = 'login';"><i class="fa fa-sign-in fa-3x white menuIcon padding_top_10px"></i></a>
					<a id="nav_register" href="#" style="display: none;" onclick="$('#register').show(); currentlyOpenedForm = 'register';"><i class="fa fa-user-plus fa-3x white menuIcon padding_top_10px"></i></a>
					<a id="nav_logout" href="#" style="display: none;" onclick="logout();"><i class="fa fa-sign-out fa-3x white menuIcon padding_top_10px"></i></a>
					<a id="nav_user" href="#" style="display: none;" onclick="$('#user').show(); currentlyOpenedForm = 'user';"><i class="fa fa-user-circle fa-3x white menuIcon padding_top_10px"></i></a>
					<a id="nav_addEntry" href="#" style="display: none;" onclick="$('#insertWord').show(); currentlyOpenedForm = 'addWord';"><i class="fa fa-plus fa-3x white menuIcon padding_top_10px"></i></a>
				</nav>
			</div>

			<div>
				<div id="tabs_container" class="tab">
				  	<button class="tablinks" onclick="$('#addTable').show(); currentlyOpenedForm = 'addTable';"><i class="fa fa-plus fa-lg black menuIcon"></i></button>
				</div>

				<div id="tableContainer" class="tabcontent">
				  	<h1 id="heading_tableName"></h1>
				  	<table>
				  		<thead>
				  			<tr>
				  				<th>Fachwort</th>
				  				<th>Beschreibung</th>
				  				<th>Quellen</th>
				  			</tr>
				  		</thead>
				  		<tbody id="table"></tbody>
				  	</table>
				</div>

			</div>


		<div id="insertWord" class="modal">
		  <form class="modal-content animate" method="post" action="#">
		    <div class="imgcontainer">
		    	<h1>Fachwort einfügen</h1>
		      	<span onclick="$('#insertWord').hide();" class="close" title="Close Modal">&times;</span>
		    </div>

		    <div class="container">
		      	<label><h4 class="noMargin">Fachwort</h4></label>
		      	<input type="text" id="iw_word" placeholder="Fachwort eingeben" name="word" spellcheck="true" required>

		      	<label><h4 class="noMargin">Zieltabelle</h4></label>
		      	<select id="insertWord_tableSelectionContainer" name="tableID">

				</select>

		      	<label><h4 class="noMargin">Erklärung</h4></label>
		      	<textarea type="text" id="iw_description" placeholder="Erläutere den Begriff" spellcheck="true" name="description"></textarea>

		      	<label><h4 class="noMargin">Quellen</h4></label>
		      	<textarea type="text" id="iw_source" class="autocompleteSources" placeholder="Nenne die Quellen" spellcheck="true" name="source"></textarea>
		    </div>

		    <div class="container" style="background-color:#f1f1f1">
		      	<button type="button" onclick="grabInsertWord();" class="submitbtn"><i class="fa fa-paper-plane" aria-hidden="true"></i>  Einfügen</button>
		      	<button type="button" onclick="$('#insertWord').hide();" class="cancelbtn">Abbrechen</button>
		    </div>
		  </form>
		</div>

		<div id="addTable" class="modal">
		  <form class="modal-content animate" action="#">
		    <div class="imgcontainer">
		    	<h1>Tabelle einfügen</h1>
		      	<span onclick="$('#addTable').hide();" class="close" title="Close Modal">&times;</span>
		    </div>

		    <div class="container">
		      	<label><h4 class="noMargin">Tabellenname</h4></label>
		      	<input type="text" id="form_tablename" placeholder="Tabellennamen eingeben" spellcheck="true" required>
		    </div>

		    <div class="container" style="background-color:#f1f1f1">
		      	<button onclick="grabAddTable();" class="submitbtn"><i class="fa fa-send" aria-hidden="true"></i>  Einfügen</button>
		      	<button type="button" onclick="$('#addTable').hide();" class="cancelbtn">Abbrechen</button>
		    </div>
		  </form>
		</div>

		<div id="login" class="modal">
		  <form class="modal-content animate" action="#">
		    <div class="imgcontainer">
		    	<h1>Login</h1>
		      	<span onclick="$('#login').hide();" class="close" title="Close Modal">&times;</span>
		    </div>

		    <div class="container">
		      	<label><h4 class="noMargin">Benutzername</h4></label>
		      	<input type="text" id="form_username" placeholder="Benutzernamen eingeben" name="username" required>

		      	<label><h4 class="noMargin">Passwort</h4></label>
		      	<input type="password" id="form_password" placeholder="Passwort eingeben" name="password" required>
		    </div>

		    <div class="container" style="background-color:#f1f1f1">
		      	<button onclick="grabLogin();" class="submitbtn"><i class="fa fa-lock" aria-hidden="true"></i>  Login</button>
		      	<button type="button" onclick="$('#login').hide();" class="cancelbtn">Abbrechen</button>
		    </div>
		  </form>
		</div>

		<div id="login" class="modal">
		  <form class="modal-content animate" action="#">
		    <div class="imgcontainer">
		    	<h1>Login</h1>
		      	<span onclick="$('#login').hide();" class="close" title="Close Modal">&times;</span>
		    </div>

		    <div class="container">
		      	<label><h4 class="noMargin">Benutzername</h4></label>
		      	<input type="text" id="form_username" placeholder="Benutzernamen eingeben" name="username" required>

		      	<label><h4 class="noMargin">Passwort</h4></label>
		      	<input type="password" id="form_password" placeholder="Passwort eingeben" name="password" required>
		    </div>

		    <div class="container" style="background-color:#f1f1f1">
		      	<button onclick="grabLogin();" class="submitbtn"><i class="fa fa-lock" aria-hidden="true"></i>  Login</button>
		      	<button type="button" onclick="$('#login').hide();" class="cancelbtn">Abbrechen</button>
		    </div>
		  </form>
		</div>

		<div id="register" class="modal">
		  <form class="modal-content animate" action="#">
		    <div class="imgcontainer">
		    	<h1>Registrierung</h1>
		      	<span onclick="$('#register').hide();" class="close" title="Close Modal">&times;</span>
		    </div>

		    <div class="container">
		      	<label><h4 class="noMargin">Gewünschter Benutzername</h4></label>
		      	<input type="text" id="form_registration_username" placeholder="Gewünschten Benutzernamen eingeben" name="username" required>

		      	<label><h4 class="noMargin">Gewünschtes Passwort</h4></label>
		      	<input type="password" id="form_registration_password" placeholder="Gewünschtes Passwort eingeben" name="password" required>
		    </div>

		    <div class="container" style="background-color:#f1f1f1">
		      	<button onclick="grabRegistration();" class="submitbtn"><i class="fa fa-user-plus" aria-hidden="true"></i>  Registrieren</button>
		      	<button type="button" onclick="$('#register').hide();" class="cancelbtn">Abbrechen</button>
		    </div>
		  </form>
		</div>

		<div id="user" class="modal">
		  <form class="modal-content animate" action="#">
		    <div class="imgcontainer">
		    	<h1>Kontoverwaltung</h1>
		      	<span onclick="$('#user').hide();" class="close" title="Close Modal">&times;</span>
		    </div>

		    <div class="container">
		      	<label><h4 class="noMargin">Aktuelles Passwort</h4></label>
		      	<input type="text" id="form_user_currentPassword" placeholder="Aktuelles Passwort eingeben" name="password" required>

		      	<label><h4 class="noMargin">Gewünschtes Passwort</h4></label>
		      	<input type="password" id="form_user_newPassword" placeholder="Gewünschtes Passwort eingeben" name="newPassword" required>
		    </div>

		    <div class="container" style="background-color:#f1f1f1">
		      	<button onclick="grabChangePassword();" class="submitbtn"><i class="fa fa-key" aria-hidden="true"></i>  Passwort ändern</button>
		      	<button type="button" onclick="$('#user').hide();" class="cancelbtn">Abbrechen</button>
		    </div>
		  </form>
		</div>


	<ul class="contextMenu" hidden>
	  	<li><a href="#" onclick="$('#insertWord').show(); $('ul.contextMenu').fadeOut('fast');"><i class="fa fa-plus"></i> Add</a></li>
	  	<li>
	  		<a href="#" onclick=" $('ul.contextMenu').fadeOut('fast');">
	  			<i class="fa fa-arrows"></i>
	  			 Move To <a href="#" onclick=" $('ul.contextMenu').fadeOut('fast');"><i class="fa fa-caret-down"></i>
	  		</a>
  			<ul id="mt_sm_tablelist" class="submenu">
  				<li>Tabelle 1</li>
  				<li>Tabelle 1</li>
  				<li>Tabelle 1</li>
  				<li>Tabelle 1</li>
  				<li>Tabelle 1</li>
  				<li>Tabelle 1</li>
  			</ul>
	  	</li>
	  	<li><a href="#" onclick="deleteWord($(selectedElement).parent().attr('data-wid')); $('ul.contextMenu').fadeOut('fast');"><i class="fa fa-trash"></i> Delete</a></li>
	  	<li></li>
	</ul>

	</body>


</html>


<script>
	<?php if (isset($_SESSION['currentTable']) && !empty($_SESSION['currentTable'])) {?>

		$( document ).ready(function() {
			var activeTable = <?php echo $_SESSION["currentTable"]; ?>;
			changeTable($("#tabs_container").children()[0] ,activeTable);
		});
	<?php } else {
		echo "var activeTable = null;";
	}?>
</script>
