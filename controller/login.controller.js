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
    ControllerProto.ID_RESET_PASSWORD_PANEL = "idResetPassword";

    ControllerProto.ID_LOGIN_EMAIL_INPUT = "idLoginEmailInput";
    ControllerProto.ID_LOGIN_PASSWORD_INPUT = "idLoginPasswordInput";
    ControllerProto.ID_REGISTRATION_EMAIL_INPUT = "idRegisterEmailInput";
    ControllerProto.ID_REGISTRATION_PASSWORD_INPUT = "idRegisterPasswordInput";
    ControllerProto.ID_RESET_EMAIL_EMAIL_INPUT = "idResetEmailInput";

    ControllerProto.MIN_PASSWORD_LENGTH = 6;


    ControllerProto.onInit = function () {
        this.m_oUserModel = new JSONModel({
            password: "",
            email: ""
        });
        this.getView().setModel(this.m_oUserModel, "usermodel");
        this.isValid = false;

        this.m_oNavContainer = this.getView().byId(this.ID_NAV_CONTAINER);
        this.m_oLoginEmailInput = this.getView().byId(this.ID_LOGIN_EMAIL_INPUT);
        this.m_oLoginPasswordInput = this.getView().byId(this.ID_LOGIN_PASSWORD_INPUT);
        this.m_oRegistrationEmailInput = this.getView().byId(this.ID_REGISTRATION_EMAIL_INPUT);
        this.m_oRegistrationPasswordInput = this.getView().byId(this.ID_REGISTRATION_PASSWORD_INPUT);
        this.m_oResetEmailEmailInput = this.getView().byId(this.ID_RESET_EMAIL_EMAIL_INPUT);
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

    ControllerProto.onToForgotPasswordButtonPress = function () {
        this.m_oNavContainer.to(this.getView().byId(this.ID_RESET_PASSWORD_PANEL));
    };


    ControllerProto.onInputLiveChangeEmail = function (oEvent) {
        var newValue = oEvent.getParameter("newValue"),
            oSource = oEvent.getSource();
        oSource.setValueState("None");

        if (!this.isEmailValid(newValue).result) {
            oSource.setValueState("Error");
            oSource.setValueStateText(this.isEmailValid(newValue).text);
        } else {
            oSource.setValueState("Success");
        }
    };

    ControllerProto.onInputLiveChangePassword = function (oEvent) {
        var newValue = oEvent.getParameter("newValue"),
            oSource = oEvent.getSource();
        oSource.setValueState("None");

        if (!this.isValidPassword(newValue).result) {
            oSource.setValueState("Error");
            oSource.setValueStateText(this.isValidPassword(newValue).text);
        } else {
            oSource.setValueState("Success");
        }
    };


    ControllerProto.onLoginButtonPress = function() {
        var sEmail = this.m_oUserModel.getProperty("/email") || this.m_oLoginEmailInput.getValue(),
            sPassword = this.m_oUserModel.getProperty("/password") || this.m_oLoginPasswordInput.getValue();

        if (this.isEmailValid(sEmail).result && this.isValidPassword(sPassword).result) {
            this.m_oNavContainer.setBusy(true);
            this.getOwnerComponent().RestClient.login(
                sEmail,
                sPassword,
                this.onLoginSuccess.bind(this),
                null,
                this.onLoginOrRegistrationComplete.bind(this)
            );
        }
    };

    ControllerProto.onRegistrationButtonPress = function () {
        var sEmail = this.m_oUserModel.getProperty("/email") || this.m_oRegistrationEmailInput.getValue(),
            sPassword = this.m_oUserModel.getProperty("/password") || this.m_oRegistrationPasswordInput.getValue();

        if (this.isEmailValid(sEmail).result && this.isValidPassword(sPassword).result) {
            this.m_oNavContainer.setBusy(true);
            this.getOwnerComponent().RestClient.register(
                sEmail,
                sPassword,
                this.onLoginSuccess.bind(this),
                this.onLoginError.bind(this),
                this.onLoginOrRegistrationComplete.bind(this)
            );
        }
    }; 

    ControllerProto.onResetEmailButtonPress = function() {
        var sEmail = this.m_oResetEmailEmailInput.getValue();
        if (this.isEmailValid(sEmail).result) {
            this.m_oResetEmailEmailInput.setValueState("None");
            this.m_oResetEmailEmailInput.setValue("");

            //send password reset email
            this.getOwnerComponent().RestClient.sendPasswordResetEmail({
                fnSuccess: this.onSendResetEmailSuccess.bind(this, sEmail),
                email: sEmail
            });

        } else {
            this.m_oResetEmailEmailInput.setValueState("Error");
            this.m_oResetEmailEmailInput.setValueStateText(this.isEmailValid(sEmail).text);
        }
    };

    ControllerProto.onSendResetEmailSuccess = function(sEmail) {
        MessageToast.show("An email has been sent to \"" + sEmail + "\"");
        this.m_oNavContainer.backToTop();
    };

    ControllerProto.onLoginSuccess = function(oData) {
        MessageToast.show("Login Successfull, welcome " + oData.user.email);
    };

    ControllerProto.onLoginError = function(error) {
        
    };

    ControllerProto.onLoginOrRegistrationComplete = function() {
        this.m_oNavContainer.setBusy(false);
    };


    // --------------------------------
    // Utility
    // --------------------------------

    ControllerProto.isEmailValid = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return {
            result: re.test(email),
            text: "The email has to be in a valid format"
        };
    };

    ControllerProto.isValidPassword = function(password) {
        return {
            result: password.trim().length >= this.MIN_PASSWORD_LENGTH,
            text: "The pass word has to be at least " + this.MIN_PASSWORD_LENGTH + " characters long"
        };
    };

    return Controller;
});