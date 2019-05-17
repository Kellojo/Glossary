sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    var Controller = Controller.extend("com.glossary.controller.dialog.userDialog", {});
    var ControllerProto = Controller.prototype;



    ControllerProto.onInit = function () {

    };

    ControllerProto.onOpenInDialog = function (oSettings) {
        this.m_oSettings = oSettings;

        var oView = this.getView(),
            oUserModel = this.getOwnerComponent().getModel("userModel");
        oView.setModel(oUserModel, "userModel");
        oUserModel.refresh(true);
    };

    ControllerProto.onCloseInDialog = function () {

    };

    // ------------------------------
    // Event Handler
    // ------------------------------



    // --------------------------------
    // Utility
    // --------------------------------

    return Controller;
});
