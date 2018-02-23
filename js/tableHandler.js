
/* adds a table for the given user */
function addTable(tablename) {
    $.post("/php/addTable.php", {tablename: tablename}, function(result){
        if (result.includes("success")) {
          showSuccessNotf("Tabelle hinzugefügt!");
        } else {
          showErrorNotf("Fehler beim Hinzufügen der Tabelle!");
        }
        refreshTabs();
    });
}

/* grabs the data to add a table from the form */
function grabAddTable() {
    addTable(document.getElementById('form_tablename').value);
    document.getElementById('addTable').style.display="none";
    $('#form_tablename').val("");
}

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
        } else {
          showErrorNotf("Fehler beim Verschieben des Wortes!");
        }
        changeTable(activeTable.tab ,activeTable.tID);
    });
}

/* grabs the information from the context menu and the selected word to move it ot another table */
function grabMoveWord(word, tableDataElement) {
    var wID = $(word).parent().attr("data-wid");
    var tID = $(tableDataElement).attr("data-tid");
    moveWord(wID, tID);

    console.log(wID + " - " + tID);
}

/* Grabs the data from the form and inserts it into the db and resets the form */
function grabInsertWord() {
    var word = $("#iw_word").val();
    var description = $("#iw_description").val();
    var source = $("#iw_source").val();
    var e = document.getElementById("insertWord_tableSelectionContainer");
    var tID = e.options[e.selectedIndex].value;

    insertWord(word, description, source, tID);

    $("#iw_word").val("");
    $("#iw_description").val("");
    $("#iw_source").val("");

    /* Close form and refresh tables if possible */
    document.getElementById('insertWord').style.display='none';
}

/* adds change listeners to all table cells */
function addChangeListeners() {
	var cont;

    $("[contenteditable=true]").focus(function() {
        cont=$(this).html();
    });

    $("[contenteditable=true]").blur(function() {
        if ($(this).html()!=cont) {
            var parent = $(this).parent();
            var wID = parent.attr("data-wid");
            var word = parent.find(`td[data-name='word']`)[0].innerText;
            var description = parent.find(`[data-name='description']`)[0].innerText;
            var source = parent.find(`[data-name='source']`)[0].innerText;

            updateWord(wID, word, description, source);
        }
    });
}

/* Refreshes the active table */
function refreshTable() {
	if (activeTable != null) {
        changeTable( activeTable.tab, activeTable.tID );
    }
}

/* clear table */
function clearTable() {
    $("#table").empty();
}
