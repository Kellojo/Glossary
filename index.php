<?php @session_start(); ?>

<!DOCTYPE html>
<html>
	<head>
		<title>Glossary</title>
		<link rel="stylesheet" href="css/basic.css">
		<link rel="stylesheet" href="css/menu.css">
		<link rel="stylesheet" href="css/tabs.css">
		<link rel="stylesheet" href="css/table.css">
		<link rel="stylesheet" href="css/form.css">
		<link rel="stylesheet" href="css/contextMenu.css">
		<link rel="stylesheet" href="css/font-awesome-4.7.0/css/font-awesome.css">
		<script src="js/jquery-3.2.1.min.js"></script>
		<script src="js/tabs.js"></script>
		<script src="js/form.js"></script>
		<script src="js/contextMenu.js"></script>
		<script src="js/userHandler.js"></script>
		<script src="js/displayManager.js"></script>
		<script src="js/tableHandler.js"></script>
	</head>
	<body>
	
		<div class="mainBody">
			<div class="menuContainer">
				<nav>
					<a id="nav_login" href="#" onclick="$('#login').show();"><i class="fa fa-sign-in fa-3x white menuIcon"></i></a>
					<a id="nav_register" href="#" onclick="$('#register').show();"><i class="fa fa-user-plus fa-3x white menuIcon"></i></a>
					<a id="nav_logout" href="#" onclick="logout();"><i class="fa fa-sign-out fa-3x white menuIcon"></i></a>
					<a id="nav_table" href="#"><i class="fa fa-list fa-3x white menuIcon"></i></a>
					<a id="nav_addEntry" href="#" onclick="$('#insertWord').show();"><i class="fa fa-plus fa-3x white menuIcon"></i></a>
				</nav>
			</div>

			<div>
				<div id="tabs_container" class="tab">
				  	<button class="tablinks" onclick="$('#addTable').show();"><i class="fa fa-plus fa-lg black menuIcon"></i></button>
				</div>

				<div id="tableContainer" class="tabcontent">
				  	<h1 id="heading_tableName">[Titel]</h1>
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
		      	<input type="text" id="iw_word" placeholder="Fachwort eingeben" name="word" required>

		      	<label><h4 class="noMargin">Zieltabelle</h4></label>
		      	<select id="insertWord_tableSelectionContainer" name="tableID">
				    
				</select>

		      	<label><h4 class="noMargin">Erklärung</h4></label>
		      	<textarea type="text" id="iw_description" placeholder="Erläutere den Begriff" name="description"></textarea>

		      	<label><h4 class="noMargin">Quellen</h4></label>
		      	<textarea type="text" id="iw_source" placeholder="Nenne die Quellen" name="source"></textarea>
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
		      	<input type="text" id="form_tablename" placeholder="Tabellennamen eingeben" required>
		    </div>

		    <div class="container" style="background-color:#f1f1f1">
		      	<button onclick="grabAddTable();" class="submitbtn"><i class="fa fa-lock" aria-hidden="true"></i>  Einfügen</button>
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
	  	<li>
	      	<a class="fa fa-facebook" href="#"></a>
	      	<a class="fa fa-twitter" href="#"></a>
	      	<a class="fa fa-google-plus" href="#"></a>
	      	<a class="fa fa-linkedin" href="#"></a>
	  	</li>
	</ul>

	</body>


</html>