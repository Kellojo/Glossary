sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter"
], function (Controller, JSONModel, MessageToast, Filter) {
    "use strict";

    var Controller = Controller.extend("com.glossary.controller.dialog.addTable", {});
    var ControllerProto = Controller.prototype;

    ControllerProto.ID_TABLE_NAME_INPUT = "idTableNameInput";



    ControllerProto.onInit = function () {
        this.m_oTableModel = new JSONModel({
            table: null
        });

        var oView = this.getView();
        oView.setModel(this.m_oTableModel);
        this.m_oTableNameInput = oView.byId(this.ID_TABLE_NAME_INPUT);
    };

    ControllerProto.onOpenInDialog = function(oSettings) {
        this.m_oSettings = oSettings;

        this.m_oTableNameInput.setValueState("None");

        if (oSettings.table) {
            this.m_oTableModel.setProperty("/table", oSettings.table);
        }
    };

    ControllerProto.onCloseInDialog = function () {

    };

    ControllerProto.onSubmitButtonPress = function() {
        var oTable = this.m_oTableModel.getProperty("/table");

        if (!oTable.name || !oTable.name.trim()) {
            this.m_oTableNameInput.setValueState("Error");
            return false;
        }

        this.getOwnerComponent().RestClient.addTable(oTable, function() {
            MessageToast.show("Successfully added \"" + oTable.name.trim() + "\"");
        });

        return true;
    };

    // ------------------------------
    // Event Handler
    // ------------------------------

    // --------------------------------
    // Utility
    // --------------------------------



    return Controller;
});