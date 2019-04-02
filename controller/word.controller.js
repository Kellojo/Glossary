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

    var Controller = Controller.extend("com.glossary.controller.word", {
        formatter: Formatter
    });
    var ControllerProto = Controller.prototype;

    ControllerProto.name = "word";


    ControllerProto.onInit = function () {
        this.m_oWordModel = new JSONModel({
            isInEditMode: false,
            word: null
        });
        this.getView().setModel(this.m_oWordModel);

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

    ControllerProto.onPageEnter = function (oEvent) {
        var oArgs = oEvent.getParameter("arguments"),
            sTableId = oArgs.tableId,
            sWordId = oArgs.wordId;

        this.m_oWordModel.setData({
            isInEditMode: false,
            word: {
                id: sWordId,
                table: sTableId
            }
        });

        //check for new word creation
        if (sWordId == "new") {
            this.toEditMode();
            this.m_oWordModel.setProperty("/word", {
                id: null,
                word: "",
                description: "",
                source: "",
                table: this.m_oWordModel.getProperty("/word/table")
            });
        } else {
            this.toReadMode();
            this.loadWord();
        }

        this.getOwnerComponent().setHeaderVisible(true);
        this.getOwnerComponent().setBackButtonVisible(true);
        this.getOwnerComponent().setButtonVisible("AddButton", false, null);
    };

    /**
     * Triggers the be query for the word
     */
    ControllerProto.loadWord = function() {
        this.getOwnerComponent().RestClient.getWord({
            id: this.m_oWordModel.getProperty("/word/id"),
            success: this.onLoadWordSuccess.bind(this),
            error: this.onLoadWordError.bind(this),
            complete: this.setBusy.bind(this, false)
        });

        this.getOwnerComponent().RestClient.getAllSources({
            tableId: this.m_oWordModel.getProperty("/word/table"),
            success: this.onLoadSourcesSuccess.bind(this)
        });

        this.setBusy(true);
    };
    ControllerProto.onLoadWordSuccess = function (oWord) {
        this.m_oWordModel.setProperty("/word", oWord); 
    };
    ControllerProto.onLoadWordError = function() {

    };

    ControllerProto.onLoadSourcesSuccess = function (oDoc) {
        this.m_oWordModel.setProperty("/sources", oDoc);
    };

    // ------------------------------
    // Event Handler
    // ------------------------------

    /**
     * Handles the edit button press
     */
    ControllerProto.onSaveButtonPress = function (oEvent) {
        //validate the input
        var oWord = this.m_oWordModel.getProperty("/word");
        if (oWord.word.trim().length <= 0) {
            return;
        }


        //save the word
        this.setBusy(true);
        this.getOwnerComponent().RestClient.addWord({
            success: this.toReadMode.bind(this),
            word: this.m_oWordModel.getProperty("/word"),
            complete: this.setBusy.bind(this, false)
        });
    };

    /**
     * Fired on live change of the word input field ;)
     */
    ControllerProto.onWordLiveChange = function(oEvent) {
        var s = oEvent.getParameter("newValue"),
            bIsValid = s.trim().length > 0;

        oEvent.getSource().setValueState(bIsValid ? "None" : "Error");
    };

    /**
     * Fired when the delete button is pressed
     */
    ControllerProto.onDeleteButtonPress = function() {
        var oWord = this.m_oWordModel.getProperty("/word");
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

    // ------------------------------
    // Utility
    // ------------------------------

    /**
     * Sets this view busy
     * @param {boolean} bBusy - is the view busy?
     */
    ControllerProto.setBusy = function (bBusy) {
        this.getView().setBusy(bBusy);
    };

    ControllerProto.toEditMode = function() {
        this.m_oWordModel.setProperty("/isInEditMode", true);
        this.getOwnerComponent().setButtonVisible("EditButton", false, null);
        this.getOwnerComponent().setButtonVisible("SaveButton", true, this.onSaveButtonPress.bind(this));
    };
    ControllerProto.toReadMode = function() {
        this.m_oWordModel.setProperty("/isInEditMode", false);
        this.getOwnerComponent().setButtonVisible("EditButton", true, this.toEditMode.bind(this));
        this.getOwnerComponent().setButtonVisible("SaveButton", false, null);
    };

    return Controller;
});