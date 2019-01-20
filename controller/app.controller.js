sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    var Controller = Controller.extend("com.glossary.controller.app", {}),
        ControllerProto = Controller.prototype;

    
    ControllerProto.onInit = function() {
        this.m_oErrorMessageContainer = this.getView().byId("idErrorMessageContainer");
        this.getOwnerComponent().m_oErrorMessageContainer = this.m_oErrorMessageContainer;
    };

    return Controller;
});