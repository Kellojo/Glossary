sap.ui.define([
    'jquery.sap.global',
    'sap/ui/core/UIComponent',
    "com/glossary/model/RestClient",
    "sap/m/MessageStrip",
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel"
], function (jQuery, UIComponent, RestClient, MessageStrip, Device, JSONModel) {
    "use strict";

    var Component = UIComponent.extend("com.glossary.Component", {
        metadata: {
            manifest: "json"
        }
    });
    var ComponentProto = Component.prototype;

    ComponentProto.RestClient = RestClient;
    ComponentProto.ID_ERROR_MESSAGE_CONTAINER = "idErrorMessageContainer";
    ComponentProto.SHARED_DIALOGS = {
        "addWord":  {
            view: "com.glossary.view.dialog.addWord"
        },
        "addTable": {
            view: "com.glossary.view.dialog.addTable"
        },
        "userDialog": {
            view: "com.glossary.view.dialog.userDialog"
        }
    };

    ComponentProto.init = function() {
        UIComponent.prototype.init.apply(this, arguments);
        this.getRouter().initialize();

        //init firebase
        firebase.initializeApp({
            apiKey: "",
            authDomain: "",
            databaseURL: "",
            projectId: "",
            storageBucket: "",
            messagingSenderId: ""
        });

        //init rest client
        RestClient.init(this);

        //create shared dialogs
        this.m_oDialogs = {};
        for (var key in this.SHARED_DIALOGS) {
            this.m_oDialogs[key] = {
                view: this.runAsOwner(function (sView) {
                    return sap.ui.xmlview(sView);
                }.bind(this, this.SHARED_DIALOGS[key].view))
            };
        }

        //set device model
        this.setModel(new JSONModel(Device), "device");
    };

    // -------------------------------------
    // Navigation
    // -------------------------------------

    ComponentProto.toOverview = function(sTableId) {
        this.getRouter().navTo("overview", {
            query: {
                "tableId": sTableId
            }
        });
    };
    ComponentProto.toLogin = function () {
        this.getRouter().navTo("login");
    };

    ComponentProto.openAddWordDialog = function (oSettings) {
        oSettings = jQuery.extend(oSettings, {
            submitButton: true
        });
        this.openDialog("addWord", oSettings);
    };

    ComponentProto.openAddTableDialog = function (oSettings) {
        oSettings = jQuery.extend(oSettings, {
            submitButton: true
        });
        this.openDialog("addTable", oSettings);
    };

    ComponentProto.openUserDialog = function (oSettings) {
        oSettings = jQuery.extend(oSettings, {
            title: "User Management"
        });
        this.openDialog("userDialog", oSettings);
    };


    // -------------------------------------
    // Utility
    // -------------------------------------

    ComponentProto.showErrorMessage = function(sErrorMessage) {
        var oMessageStrip = new MessageStrip({
            text: sErrorMessage,
            type: "Error",
            showCloseButton: true
        });
        this.m_oErrorMessageContainer.addItem(oMessageStrip);
        setTimeout(function (oMessageStrip) { oMessageStrip.destroy()}.bind(this, oMessageStrip), 5000);
    };

    ComponentProto.openDialog = function(sDialog, oSettings) {
        var oView = this.m_oDialogs[sDialog].view,
            oController = oView.getController();
        oController
        
        var oDialog = new sap.m.Dialog({
            title: oSettings.title
        }).addStyleClass("glossary-dialog");

        var oCloseButton = new sap.m.Button({
            text: "Close",
            press: function() {
                if (oController.onCloseInDialog) {
                    oController.onCloseInDialog();
                }
                oDialog.close();
            }
        });
        oDialog.setBeginButton(oCloseButton);

        //Submit Button
        if (oSettings.submitButton) {
            var oSubmitButton = new sap.m.Button({
                text: oSettings.submitText || "Submit",
                type: "Emphasized",
                press: function() {
                    oSettings.fnOnSubmit(oDialog);
                    var bSubmitValid = true;

                    if (oController.onSubmitButtonPress) {
                        bSubmitValid = oController.onSubmitButtonPress();
                    }

                    if (bSubmitValid) {
                        if (oController.onCloseInDialog) {
                            oController.onCloseInDialog();
                        }
                        oDialog.close();
                    }
                }
            });
            oDialog.setEndButton(oSubmitButton);
        }

        oDialog.addContent(this.m_oDialogs[sDialog].view);
        oDialog.open();

        if (oController.onOpenInDialog) {
            oController.onOpenInDialog(oSettings);
        }
    };



    return Component;
})