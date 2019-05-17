sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "com/glossary/model/Formatter"
], function (Controller, JSONModel, Formatter) {
    "use strict";

    var Controller = Controller.extend("com.glossary.controller.app", {
        formatter: Formatter
    }),
        ControllerProto = Controller.prototype;

    
    ControllerProto.onInit = function() {
        this.m_oErrorMessageContainer = this.getView().byId("idErrorMessageContainer");

        var oComponent = this.getOwnerComponent();
        oComponent.m_oErrorMessageContainer = this.m_oErrorMessageContainer;

        //register app header controls ;-)
        oComponent.registerControl(this.getView().byId("idBackButton"), "BackButton");
        oComponent.registerControl(this.getView().byId("idEditButton"), "EditButton");
        oComponent.registerControl(this.getView().byId("idSaveButton"), "SaveButton");
        oComponent.registerControl(this.getView().byId("idAddButton"), "AddButton");

    };

    return Controller;
});