sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, MessageToast, Filter, FilterOperator) {
    "use strict";

    var Controller = Controller.extend("com.glossary.controller.Overview", {});
    var ControllerProto = Controller.prototype;

    ControllerProto.name = "overview";
    ControllerProto.ID_LIST = "idWordsList";
    ControllerProto.ID_TABLE_COMBOBOX = "idTableComboBox";
    ControllerProto.ID_PULL_TO_REFRESH = "idPullToRefresh";


    ControllerProto.onInit = function () {
        this.m_oListModel = new JSONModel({
            currentTable: {
                id: null,
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

    ControllerProto.onPageEnter = function() {
        this.loadTables();
    };

    ControllerProto.loadTables = function() {
        this.m_oList.setBusy(true);
        this.getOwnerComponent().RestClient.getTables(
            this.onLoadTablesSuccess.bind(this),
            function() {
                this.m_oPullToRefresh.hide.bind(this.m_oPullToRefresh);
                this.m_oList.setBusy(false);
            }.bind(this)
        );
    };
    ControllerProto.onLoadTablesSuccess = function(aData) {
        var aTables = [];

        aData.map(function (table, index) {
            var oTable = table.data();
            oTable.id = table.id;
            aTables.push(oTable);
        });

        this.getView().getModel().setProperty("/tables", aTables);

        //update combobox selection
        var aCBItems = this.m_oTableComboBox.getItems();
        if (aCBItems.length > 0 && !this.m_oTableComboBox.getSelectedItem()) {
            this.m_oTableComboBox.setSelectedItem(aCBItems[0]);
        };

        if (this.m_oTableComboBox.getSelectedItem()) {
            this.loadTableWords(this.m_oTableComboBox.getSelectedItem().getKey());
        }
    };

    ControllerProto.loadTableWords = function(sTableId) {
        if (sTableId) {
            this.getView().getModel().setProperty("/currentTable/id", sTableId);
            this.getOwnerComponent().RestClient.getWordsForTable(sTableId, this.onLoadTableContendsSuccess.bind(this));
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
        var sTableId = oEvent.getSource().getSelectedKey();
        this.loadTableWords(sTableId);
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

    ControllerProto.onAddWord = function(oEvent) {
        //generate sources array


        //generate words array
        var aWords = [],
            aSources = [],
            aItems = this.m_oListModel.getProperty("/currentTable/items");

        for(var i in aItems) {
            var oItem = aItems[i];
            if (aWords.indexOf(oItem.word) < 0) {
                aWords.push(oItem.word);
            }
            if (aSources.indexOf(oItem.source) < 0) {
                aSources.push(oItem.source);
            }
        }

        this.getOwnerComponent().openAddWordDialog({
            tableId: this.m_oListModel.getProperty("/currentTable/id"),
            fnOnSubmit: this.onWordAdded.bind(this),
            words: aWords,
            sources: aSources
        });
    };

    ControllerProto.onWordAdded = function (oDialog) {
        this.loadTableWords(this.m_oTableComboBox.getSelectedItem().getKey());
    };

    // --------------------------------
    // Utility
    // --------------------------------

    ControllerProto.formatWelcomeMessage = function(sUsername) {
        var oUserModel = this.getOwnerComponent().getModel("userModel"),
            sUsername = oUserModel.getProperty("/user/email");
        return "Welcome " + sUsername + "!";
    };

    ControllerProto.formatFirebaseTimestamp = function(otimestamp) {
        var oDate = new Date(otimestamp.seconds * 1000);
        return oDate.getDate() + "." + (oDate.getMonth() + 1) + "." + oDate.getFullYear()
    };

    return Controller;
});