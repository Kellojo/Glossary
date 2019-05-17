sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "com/glossary/model/Formatter"
], function (Controller, JSONModel, MessageToast, Filter, FilterOperator, MessageBox, Formatter) {
    "use strict";

    var Controller = Controller.extend("com.glossary.controller.table", {
        formatter: Formatter
    });
    var ControllerProto = Controller.prototype;

    ControllerProto.name = "table";
    ControllerProto.ID_LIST = "idWordsList";
    ControllerProto.ID_TABLE_COMBOBOX = "idTableComboBox";
    ControllerProto.ID_PULL_TO_REFRESH = "idPullToRefresh";


    ControllerProto.onInit = function () {
        this.m_oListModel = new JSONModel({
            currentTable: {
                id: null,
                name: "",
                items: []
            },
            tables: [],
            usernameText: ""
        });
        this.getView().setModel(this.m_oListModel);

        this.m_oList = this.getView().byId(this.ID_LIST);
        this.m_oTableComboBox = this.getView().byId(this.ID_TABLE_COMBOBOX);
        this.m_oPullToRefresh = this.getView().byId(this.ID_PULL_TO_REFRESH);

        this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        this._oRouter.attachRouteMatched(this.handleRouteMatched, this);
    };
    ControllerProto.handleRouteMatched = function (event) {
        //Check whether this page is matched.
        if (event.getParameter("name") !== this.name) {
            return;
        }

        this.onPageEnter(event);
    };

    ControllerProto.onPageEnter = function(oEvent) {
        var oArgs = oEvent.getParameter("arguments"),
            sTableId = oArgs.tableId;

        this.getOwnerComponent().setHeaderVisible(true);
        this.getOwnerComponent().setBackButtonVisible(false);
        this.getOwnerComponent().setButtonVisible("AddButton", true, this.onAddWord.bind(this));
        this.getOwnerComponent().setButtonVisible("EditButton", false, null);
        this.getOwnerComponent().setButtonVisible("SaveButton", false, null);
        this.loadTables(sTableId);
    };

    /**
     * Loads the tables from the be, only the names/ids
     * @param {string} sTableId - Optional table to open after loading is complete
     */
    ControllerProto.loadTables = function (sTableId) {
        this.m_oList.setBusy(true);
        this.getOwnerComponent().RestClient.getTables(
            this.onLoadTablesSuccess.bind(this, sTableId),
            function() {
                this.m_oPullToRefresh.hide.bind(this.m_oPullToRefresh);
                this.m_oList.setBusy(false);
            }.bind(this)
        );
    };
    ControllerProto.onLoadTablesSuccess = function (sTableId, aData) {
        var aTables = [];

        aData.map(function (table, index) {
            var oTable = table.data();
            oTable.id = table.id;
            aTables.push(oTable);
        });

        this.getView().getModel().setProperty("/tables", aTables);

        //update combobox selection
        var aCBItems = this.m_oTableComboBox.getItems();

        //check if a specific table should be opened
        if (sTableId) {
            for(var i in aCBItems) {
                var oCurrentCbItem = aCBItems[i];

                if (oCurrentCbItem.getKey() === sTableId) {
                    this.m_oTableComboBox.setSelectedItem(oCurrentCbItem);
                    break;
                }
            }
        }

        //select the first one by default, if none is selected
        if (aCBItems.length > 0 && !this.m_oTableComboBox.getSelectedItem()) {
            this.m_oTableComboBox.setSelectedItem(aCBItems[0]);
        }

        //load words for the selected table
        if (this.m_oTableComboBox.getSelectedItem()) {
            this.loadTableWords(this.m_oTableComboBox.getSelectedItem().getKey());
        }
    };

    ControllerProto.loadTableWords = function(sTableId) {
        if (sTableId) {
            this.m_oList.setBusy(true);
            this.getView().getModel().setProperty("/currentTable/id", sTableId);
            this.getOwnerComponent().RestClient.getWordsForTable({
                tableId: sTableId,
                success: this.onLoadTableContendsSuccess.bind(this),
                complete: this.m_oPullToRefresh.hide.bind(this.m_oPullToRefresh)
            });
        }
    };
    ControllerProto.onLoadTableContendsSuccess = function(aData) {
        var aEntries = [];

        aData.map(function (entry, index) {
            var oEntry = entry.data();
            oEntry.id = entry.id;
            aEntries.push(oEntry);
        });

        this.getView().getModel().setProperty("/currentTable/items", aEntries);
        this.m_oList.setBusy(false);
    };


    // ------------------------------
    // Event Handler
    // ------------------------------

    ControllerProto.onLogoutPress = function() {
        this.getOwnerComponent().RestClient.logout();
    };

    ControllerProto.refresh = function() {
        this.loadTables();
    };

    ControllerProto.onTableSelectionChange = function(oEvent) {
        var oTable = oEvent.getParameter("selectedItem").getBinding("text").getContext().getObject();
        this.m_oListModel.setProperty("/currentTable", oTable);
        this.loadTableWords(oTable.id);
        this.getOwnerComponent().toTable(oTable.id);
    };

    ControllerProto.onSearch = function(oEvent) {
        var sSearch = oEvent.getParameter("newValue").trim(),
            aFilters = [
                new Filter("word", FilterOperator.Contains, sSearch),
                new Filter("description", FilterOperator.Contains, sSearch),
                new Filter("source", FilterOperator.Contains, sSearch)
            ];
        if (sSearch) {
            this.m_oList.getBinding("items").filter(new Filter({
                filters: aFilters,
                and: false
            }));
        } else {
            this.m_oList.getBinding("items").filter();
        }
    };

    ControllerProto.onEditWord = function (oEvent) {
        var oSource = oEvent.getSource(),
            oWord = "";

        if (oSource.getBinding("alt")) {
            oWord = oSource.getBinding("alt").getContext().getObject();
        } else if (oSource.getBinding("text")) {
            oWord = oSource.getBinding("text").getContext().getObject();
        }

        if (oWord) {
            this.editWord(oWord);
        }
    };

    ControllerProto.onDeleteWord = function(oEvent) {
        var oSource = oEvent.getSource(),
            oWord = oSource.getBinding("alt").getContext().getObject();

        if (oWord) {
            MessageBox.warning(
                "Are you sure you want to delete \"" + oWord.word + "\"? \nThis is going to remove the word  permanently from this table. It can not be restored.",
                {
                    actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    styleClass: "sapUiSizeCompact",
                    onClose: function (sAction) {
                        if (sAction === sap.m.MessageBox.Action.OK) {
                            this.getOwnerComponent().RestClient.deleteWord(oWord, this.onWordDeleted.bind(this, oWord));
                        }
                    }.bind(this)
                }
            );
        }
    };

    ControllerProto.onWordDeleted = function(oWord) {
        MessageToast.show("Successfully deleted \"" + oWord.word + "\"");
        this.refresh();
    };

    ControllerProto.onAddWord = function(oEvent) {
        this.getOwnerComponent().toWord({
            tableId: this.m_oListModel.getProperty("/currentTable/id"),
            wordId: "new"
        });
    };

    ControllerProto.onWordAdded = function (oDialog) {
        this.loadTableWords(this.m_oTableComboBox.getSelectedItem().getKey());
    };

    ControllerProto.onListItemPress = function (oEvent) {
        var oWord = oEvent.getParameter("listItem").getBindingContext().getObject();
        this.editWord(oWord);
    };

    ControllerProto.onAddTable = function(oEvent) {
        this.getOwnerComponent().openAddTableDialog({
            title: "Create new Table",
            fnOnSubmit: this.onTableAdded.bind(this),
            table: {}
        });
    };

    ControllerProto.onTableAdded = function(oEvent) {
        this.loadTables();
    };

    ControllerProto.onDeleteTable = function(oEvent) {
        var oTable = this.m_oListModel.getProperty("/currentTable");

        if (oTable) {
            MessageBox.warning(
                "Are you sure you want to delete \"" + oTable.name + "\"? \nThis is going to delete the table permanently. It can not be restored.",
                {
                    actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    styleClass: "sapUiSizeCompact",
                    onClose: function (sAction) {
                        if (sAction === sap.m.MessageBox.Action.OK) {
                            this.getOwnerComponent().RestClient.deleteTable(oTable, this.onTableDeleted.bind(this, oTable));
                        }
                    }.bind(this)
                }
            );
        }
    };

    ControllerProto.onTableDeleted = function(oTable) {
        MessageToast.show("Successfully deleted \"" + oTable.name + "\"");
        this.refresh();
    };

    ControllerProto.onUserLinkPress = function (oEvent) {
        this.getOwnerComponent().openUserDialog({});
    };

    // --------------------------------
    // Utility
    // --------------------------------

    ControllerProto.editWord = function(oWord) {
        this.getOwnerComponent().toWord({
            tableId: this.m_oListModel.getProperty("/currentTable/id"),
            wordId: oWord.id
        });
    };

    ControllerProto.getWordsAndSourcesArray = function() {

        //generate sources array
        //generate words array
        var aWords = [],
            aSources = [],
            aItems = this.m_oListModel.getProperty("/currentTable/items");

        for (var i in aItems) {
            var oItem = aItems[i];
            if (oItem.word && aWords.indexOf(oItem.word) < 0 && oItem.word.trim()) {
                aWords.push(oItem.word.trim());
            }
            if (oItem.source && aSources.indexOf(oItem.source) < 0 && oItem.source.trim()) {
                aSources.push(oItem.source.trim());
            }
        }

        return {
            words: aWords,
            sources: aSources
        };
    };

    return Controller;
});