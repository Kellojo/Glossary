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
            manifest: "json",

            events: {
                swipeUp: {},
                swipeDown: {},
                swipeLeft: {},
                swipeRight: {}
            }
        }
    });
    var ComponentProto = Component.prototype;

    ComponentProto.RestClient = RestClient;
    ComponentProto.ID_ERROR_MESSAGE_CONTAINER = "idErrorMessageContainer";
    ComponentProto.SHARED_DIALOGS = {
        "addWord": {
            view: "com.glossary.view.dialog.addWord"
        },
        "addTable": {
            view: "com.glossary.view.dialog.addTable"
        },
        "userDialog": {
            view: "com.glossary.view.dialog.userDialog"
        }
    };

    ComponentProto.init = function () {
        UIComponent.prototype.init.apply(this, arguments);
        this.getRouter().initialize();

        //init firebase
        firebase.initializeApp({
            apiKey: "AIzaSyCl49KQFEgcZl6aKr77PUwzxmqRsz-INuY",
            authDomain: "glossary-daeb8.firebaseapp.com",
            databaseURL: "https://glossary-daeb8.firebaseio.com",
            projectId: "glossary-daeb8",
            storageBucket: "glossary-daeb8.appspot.com",
            messagingSenderId: "101359376375"
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

        //init app header model
        this.setModel(new JSONModel({
            backButtonVisible: false,
            editButtonVisible: false,
            SaveButtonVisible: false,
            logoutButtonVisible: false,
            AddButtonVisible: false,
            addButtonVisible: false,
            visible: true
        }), "appHeader");
        this.m_oAppHeaderModel = this.getModel("appHeader");

        //attach swipe gesture events
        if (Device.system.phone || Device.system.tablet) {
            this.xDown = null;
            this.yDown = null;
            document.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
            document.addEventListener('touchmove', this.handleTouchMove.bind(this), false);

            this.attachSwipeRight(this.navBack.bind(this));
        }
    };

    // -------------------------------------
    // Touch Events
    // -------------------------------------

    ComponentProto.getTouches = function (evt) {
        return evt.touches ||          // browser API
            evt.originalEvent.touches; // jQuery
    };
    ComponentProto.handleTouchStart = function (evt) {
        const firstTouch = this.getTouches(evt)[0];
        this.xDown = firstTouch.clientX;
        this.yDown = firstTouch.clientY;
    };
    ComponentProto.handleTouchMove = function (evt) {
        if (!this.xDown || !this.yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = this.xDown - xUp;
        var yDiff = this.yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                this.fireSwipeLeft();
            } else {
                this.fireSwipeRight();
            }
        } else {
            if (yDiff > 0) {
                this.fireSwipeUp();
            } else {
                this.fireSwipeDown();
            }
        }

        this.xDown = null;
        this.yDown = null;
    };

    // -------------------------------------
    // Navigation
    // -------------------------------------

    ComponentProto.toTable = function (sTableId) {
        this.getRouter().navTo("table", {
            query: {
                "tableId": sTableId
            }
        });
    };
    ComponentProto.toLogin = function () {
        this.getRouter().navTo("login");
    };
    ComponentProto.toWord = function (oSettings) {
        this.getRouter().navTo("word", oSettings);
    };
    ComponentProto.navBack = function() {
        window.history.go(-1);
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

    ComponentProto.showErrorMessage = function (sErrorMessage) {
        var oMessageStrip = new MessageStrip({
            text: sErrorMessage,
            type: "Error",
            showCloseButton: true
        });
        this.m_oErrorMessageContainer.addItem(oMessageStrip);
        setTimeout(function (oMessageStrip) { oMessageStrip.destroy() }.bind(this, oMessageStrip), 5000);
    };

    ComponentProto.openDialog = function (sDialog, oSettings) {
        var oView = this.m_oDialogs[sDialog].view,
            oController = oView.getController();
        oController

        var oDialog = new sap.m.Dialog({
            title: oSettings.title
        }).addStyleClass("glossary-dialog");

        var oCloseButton = new sap.m.Button({
            text: "Close",
            press: function () {
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
                press: function () {
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

    /**
     * Registers an control to this component
     * @param {sap.ui.core.control} oControl - the control to register
     * @parag {string} sName - the name of the control
     */
    ComponentProto.registerControl = function (oControl, sName) {
        if (oControl && sName) {
            this["m_c" + sName] = oControl;

            if (sName === "BackButton") {
                oControl.attachPress(this.onBackButtonPressed.bind(this));
            }
        }
    };
    /**
     * Gets a control by it's name
     * @param {string} sName - the name of the control. Has to be registered beforehand!
     */
    ComponentProto.getControl = function (sName) {
        return this["m_c" + sName];
    };

    //
    // App Header
    //

    ComponentProto.setHeaderVisible = function (bVisible) {
        this.m_oAppHeaderModel.setProperty("/visible", bVisible);
    };

    /**
     * Sets the back button visibility
     */
    ComponentProto.setBackButtonVisible = function (bVisible) {
        this.m_oAppHeaderModel.setProperty("/backButtonVisible", bVisible);
    };
    ComponentProto.onBackButtonPressed = function () {
        this.navBack();
    };

    /**
     * Sets the button visibility of any registered button, and the press handler
     */
    ComponentProto.setButtonVisible = function (sName, bVisible, fnOnPress) {
        this.m_oAppHeaderModel.setProperty("/" + sName + "Visible", bVisible);

        var oButton = this.getControl(sName),
            sHandlerVarName = "m_fnOn" + sName + "Press";
        if (this[sHandlerVarName]) {
            oButton.detachPress(this[sHandlerVarName]);
            this[sHandlerVarName] = null;
        }
        if (fnOnPress) {
            oButton.attachPress(fnOnPress);
            this[sHandlerVarName] = fnOnPress;
        }
    };


    return Component;
})