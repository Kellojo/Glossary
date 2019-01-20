sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    var Controller = Controller.extend("com.glossary.controller.login", {});
    var ControllerProto = Controller.prototype;

    ControllerProto.ID_NAV_CONTAINER = "idNavContainer";
    ControllerProto.ID_LOGIN_PANEL = "idLoginPanel";
    ControllerProto.ID_REGISTRATION_PANEL = "idRegistrationPanel";

    ControllerProto.MIN_PASSWORD_LENGTH = 6;


    ControllerProto.onInit = function () {
        this.m_oUserModel = new JSONModel({
            password: "",
            email: ""
        });
        this.getView().setModel(this.m_oUserModel, "usermodel");
        this.isValid = false;

        this.m_oNavContainer = this.getView().byId(this.ID_NAV_CONTAINER);
    }


    // ------------------------------
    // Event Handler
    // ------------------------------

    ControllerProto.onToRegistrationPress = function() {
        this.m_oNavContainer.to(this.getView().byId(this.ID_REGISTRATION_PANEL));
        this.m_oUserModel.setProperty("/password", "");
    };

    ControllerProto.onToLoginPress = function () {
        this.m_oNavContainer.backToTop();
        this.m_oUserModel.setProperty("/password", "");
    };

    ControllerProto.onInputLiveChangeEmail = function (oEvent) {
        var newValue = oEvent.getParameter("newValue"),
            oSource = oEvent.getSource();
        oSource.setValueState("None");

        if (!this.isEmailValid(newValue)) {
            oSource.setValueState("Error");
        } else {
            oSource.setValueState("Success");
        }
    };

    ControllerProto.onInputLiveChangePassword = function (oEvent) {
        var newValue = oEvent.getParameter("newValue"),
            oSource = oEvent.getSource();
        oSource.setValueState("None");

        if (!this.isValidPassword(newValue)) {
            oSource.setValueState("Error");
        } else {
            oSource.setValueState("Success");
        }
    };


    ControllerProto.onLoginButtonPress = function() {
        var sEmail = this.m_oUserModel.getProperty("/email"),
            sPassword = this.m_oUserModel.getProperty("/password");

        if (this.isEmailValid(sEmail) && this.isValidPassword(sPassword)) {
            this.m_oNavContainer.setBusy(true);
            this.getOwnerComponent().RestClient.login(
                sEmail,
                sPassword,
                this.onLoginSuccess.bind(this),
                this.onLoginError.bind(this),
                this.onLoginOrRegistrationComplete.bind(this)
            );
        }
    };

    ControllerProto.onRegistrationButtonPress = function () {
        this.m_oNavContainer.setBusy(true);
    };

    ControllerProto.onLoginSuccess = function(oData) {
        MessageToast.show("Login Successfull, welcome " + oData.user.email);
        this.getOwnerComponent().toOverview();
    };

    ControllerProto.onLoginError = function(error) {
        MessageToast.show(error.message);
    };

    ControllerProto.onLoginOrRegistrationComplete = function() {
        this.m_oNavContainer.setBusy(false);
    };


    // --------------------------------
    // Utility
    // --------------------------------

    ControllerProto.isEmailValid = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    ControllerProto.isValidPassword = function(password) {
        return password.trim().length >= this.MIN_PASSWORD_LENGTH;
    };

    return Controller;
});