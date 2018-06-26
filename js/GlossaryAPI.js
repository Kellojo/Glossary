

/*
*       ### Modify Words ###
*/

/* inserts a word into the db */
function insertWord(word, description, source, tID) {

    $.post("/php/insertWord.php", {
        tID: tID,
        word: word,
        description: description,
        source: source
    }, function(result) {
        if (result.includes("success")) {
          showSuccessNotf("Wort hinzugefügt!");
        } else if (result.includes("invalidSession")) {
        	showErrorNotf("Bitte loggen sie sich erneut ein.");
        } else {
          showErrorNotf("Fehler beim Hinzufügen des Wortes!");
        }
        refreshTable();
    });
}

/* updates word changes to the db */
function updateWord(wID, word, description, source) {
    $.post("/php/updateWord.php", {
        wID: wID,
        word: word,
        description: description,
        source: source
    }, function(result) {
        if (result.includes("success")) {
          showSuccessNotf("Inhalt geändert!");
        } else if (result.includes("invalidSession")) {
        	showErrorNotf("Bitte loggen sie sich erneut ein.");
        } else {
          showErrorNotf("Fehler beim Ändern des Inhaltes!");
        }
    });
}

/* Deletes a word from the db */
function deleteWord(wID) {
    $.post("/php/deleteWord.php", {
        wID: wID
    }, function(result) {
        if (result.includes("success")) {
          showSuccessNotf("Wort gelöscht!");
        } else if (result.includes("invalidSession")) {
        	showErrorNotf("Bitte loggen sie sich erneut ein.");
        } else {
          showErrorNotf("Fehler beim Löschen des Wortes!");
        }
        changeTable(activeTable.tab ,activeTable.tID);
    });
}

/* Moves a word from one table to another */
function moveWord(wID, tID) {
    $.post("/php/moveWord.php", {
        wID: wID,
        tID: tID
    }, function(result) {
        if (result.includes("success")) {
          showSuccessNotf("Wort verschoben!");
        } else if (result.includes("invalidSession")) {
        	showErrorNotf("Bitte loggen sie sich erneut ein.");
        } else {
          showErrorNotf("Fehler beim Verschieben des Wortes!");
        }
        changeTable(activeTable.tab ,activeTable.tID);
    });
}


/*
*     ### Query Tables ###
*/

function getAllTables() {
    $.post("/php/GlossaryAPI/getTables.php", {}, function(result){
        if (result.includes("Warning")) {
            return [];
        }
        var tables = JSON.parse(result);
        var tableObjects = [];

        /* Add Tables to array */
        for (var i in tables) {
            tableObjects += {id: "HomeNavigation", icon: "sap-icon://table-view", count: tables[i].tID, text: tables[i].tableName};
		}

		return tableObjects;
    });
}
