

/* changes the state of the website */
function setUpDisplay(state) {
    switch(state) {
	    case "loggedIn":
	       	$('#nav_login').hide();
          $('#nav_register').hide();
          $('#nav_logout').show();
          $('#nav_user').show();
  	    	$('#nav_addEntry').show();
  	    	$('#tabs_container').show();
          refreshTabs();
	        break;
	    default:
	    	$('#nav_login').show();
	    	$('#nav_register').show();
	    	$('#nav_logout').hide();
	    	$('#nav_user').hide();
	    	$('#nav_addEntry').hide();
	    	$('#tabs_container').hide();
	    	$('#tableContainer').hide();
	    	clearTable();
	        break;
	}
}

/* Refreshes the tabs */
function refreshTabs() {
    $.post("/php/getTables.php", {}, function(result){
        var tables = JSON.parse(result);

        /* clear lists/tabs that are filled below */
        $("#tabs_container").empty();
		$("#mt_sm_tablelist").empty();
		$("#insertWord_tableSelectionContainer").empty();

        /* Add tabs */
        for (var i in tables) {
        	var tab = "<button class='tablinks' onclick='changeTable( this, &quot;" + tables[i].tID + "&quot; )'>" + tables[i].tableName + "</button>";
        	$("#tabs_container").append(tab);
		}

		var tab = "<button class='tablinks' onclick='document.getElementById(&quot;addTable&quot;).style.display=&quot;block&quot; '><i class='fa fa-plus fa-lg black menuIcon'></i></button>";
		$("#tabs_container").append(tab);

		/* add select options for word insertion */
        for (var i in tables) {
        	var table = "<option value='" + tables[i].tID +"' >" + tables[i].tableName + "</option>";
        	$("#insertWord_tableSelectionContainer").append(table);
		}

		/* add submenu options for contextmenu move to option */
        for (var i in tables) {
        	var table = "<li data-tid='" + tables[i].tID +"' onclick='grabMoveWord(selectedElement, this);' >" + tables[i].tableName + "</li>";
        	$("#mt_sm_tablelist").append(table);
		}

    });
}
