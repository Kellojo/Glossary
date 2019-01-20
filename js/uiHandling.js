

/* Goes to the registration view */
function goToRegistration() {
    $("#login").hide();
    $("#registration").show();
    $("#busy").hide();

    //port over email, if present
    var sEmail = GlossaryConfig.controls.loginAndRegistration.loginForm.emailInput.val().trim();
    if (sEmail) {
        GlossaryConfig.controls.loginAndRegistration.registrationForm.emailInput.val(sEmail);
    }
}

/* Goes to the login view */
function goToLogin() {
    $("#login").show();
    $("#registration").hide();
    $("#busy").hide();

    //port over email, if present
    var sEmail = GlossaryConfig.controls.loginAndRegistration.registrationForm.emailInput.val().trim();
    if (sEmail) {
        GlossaryConfig.controls.loginAndRegistration.loginForm.emailInput.val(sEmail);
    }
}

/* Goes to the login view */
function goToBusy() {
    $("#login").hide();
    $("#registration").hide();
    $("#busy").show();
}

/* Shows/Hides the actions bar */
function setActionsVisibility(bVisible) {
    GlossaryConfig.controls.loginAndRegistration.container.toggle(bVisible);
}

/**
 * Toggles the table overview visibility
 * @param {boolean} bVisible 
 */
function setTableOverviewVisibility(bVisible, bTableVisible, bNoDataVisible) {
    GlossaryConfig.controls.tablesOverview.container.toggle(bVisible);
    GlossaryConfig.controls.tablesOverview.table.toggle(!!bTableVisible);
    GlossaryConfig.controls.tablesOverview.busyIndicator.toggle(!bTableVisible);
    GlossaryConfig.controls.tablesOverview.noDataIndicator.toggle(!!bNoDataVisible);
}

/* shows/hides the menu */
function setMenuVisibility(bVisible) {
    if (bVisible) {
        GlossaryConfig.controls.menuContainer.addClass("show");
    } else {
        GlossaryConfig.controls.menuContainer.removeClass("show");
    }
}

/* Hides the splash screen and  */
function hideSplashScreen() {
    GlossaryConfig.controls.splashScreen.hide();
    GlossaryConfig.controls.mainBody.removeClass("hidden");
}

/**
 * Sets the displayed title in the header
 * @param {string} sTitle - the new title
 */
function setTitle(sTitle) {
    if (sTitle) {
        Glossary.config.controls.title.text(sTitle);
    } else {
        Glossary.config.controls.title.text(appTitle);
    }
};

/**
 * Updates the whole ui and populates it with the laetest data after login
 */
function updateWholeUiAfterLogin() {
    updateAvatar(true);
    updateTables();
}

/**
 * Updates teh Avatar text
 */
function updateAvatar(bVisible) {
    var control = GlossaryConfig.controls.avatar;
    control.toggle(bVisible);

    if (Glossary.currentUser) {
        var name = getUserDisplayName().substring(0, 2).toUpperCase();
        control.text(name);
    } else {
        control.text("");
    }
}

/**
 * Updates the tables
 */
function updateTables() {
    var fnSuccess = function(tables) {
        //clear tab container
        var oTabContainer = Glossary.config.controls.tabsContainer;
        oTabContainer.children().remove(".tab");

        //populate it again ;)
        $.each(tables, function(key, value) {
            var properties = value.data();
            properties.onclick = "onTableTabClicked(this, \"" + value.id + "\", \"" + value.data().name + "\")";
            var tab = Glossary.config.instantiateControl("tableTab", properties);
            oTabContainer.prepend(tab);
        })
    }.bind(this);

    RestClient.getTables(fnSuccess);
}

/**
 * Updates the currently opened table
 */
function updateCurrentlyOpenedTable () {
    var oCurTableInfo = Glossary.currentlyOpenedTable;
    if (oCurTableInfo.tableId) {
        var fnSuccess = function (aWords) {
            //clear tab container
            var oTable = Glossary.config.controls.tablesOverview.tableContentContainer;
            oTable.children().remove();

            //populate it again ;)
            $.each(aWords, function (key, value) {
                var properties = value.data();
                properties.onclick = "onListItemClicked(this, \"" + value.id + "\")";
                var item = Glossary.config.instantiateControl("tableListItem", properties);
                oTable.append(item);
            });

            //change title, set table visible & hide busy indicator
            setTitle(oCurTableInfo.name);
            setTableOverviewVisibility(true, true, aWords.length < 1);
        }.bind(this);

        RestClient.getWordsForTable(oCurTableInfo.tableId, fnSuccess);
        setTableOverviewVisibility(true, false);
    }
}


// ----------------------------------------------
// Event Handlers
// ----------------------------------------------

/**
 * Triggered when a table tab is clicked
 * @param {string} tableId - the id of the table of the tab that has been clicked
 */
function onTableTabClicked(tab, tableId, tableName) {
    if (tableId) {
        Glossary.currentlyOpenedTable.tableId = tableId;
        Glossary.currentlyOpenedTable.name = tableName;
        updateCurrentlyOpenedTable();
    }
    var sClass = "selected";
    //remove selected from all tabs
    $.each(tab.parentElement.children, function (key, value) {
        $(value).removeClass(sClass);
    });
    //select the current one
    $(tab).toggleClass(sClass, true);
};

function onListItemClicked(element, wordId) {
    var fnSuccess = function (oWord) {
        
    }.bind(this);
    RestClient.getWord(wordId, fnSuccess);
};



// ----------------------------------------------
// Formatting
// ----------------------------------------------

function getUserDisplayName() {
    if (Glossary.currentUser) {
    return Glossary.currentUser.displayName ? Glossary.currentUser.displayName : Glossary.currentUser.email;
    } else {
        return "undefined";
    }
};