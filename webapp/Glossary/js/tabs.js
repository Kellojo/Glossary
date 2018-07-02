

/* loads the selected table (tab) */
function changeTable(tab ,tID) {

    $.post("/php/loadTable.php", {tID: tID}, function(result){
        var table = JSON.parse(result);
        console.log(table);

        activeTable = {tab: tab, tID: tID};

        setTableName($("#heading_tableName") ,tID);
        clearTable();
        for (var i in table) {
            var row = "<tr data-wID='" + table[i].wID + "'><td data-name='word' spellcheck='true' contenteditable='true'>" + table[i].word + "</td><td data-name='description' spellcheck='true' contenteditable='true'>" + table[i].description + "</td> <td data-name='source' spellcheck='true' contenteditable='true' class='autocompleteSources'>" + table[i].source + "</td></tr>";
            $("#table").append(row);
        }

        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

       document.getElementById("tableContainer").style.display = "block";
       tab.className += " active";

       addContextMenuListener();
       addChangeListeners();
       applyAutoCompletion();
    });
}

/* Queries the table name from the db and sets it to the given h1 tag as text */
function setTableName(elem ,tID) {
  $.post("/php/queryTableInfo.php", {tID: tID}, function(result) {
    elem.text(result);
  });
}
