sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter"
], function (Controller, JSONModel, MessageToast, Filter) {
    "use strict";

    var Controller = Controller.extend("com.glossary.controller.dialog.addWord", {});
    var ControllerProto = Controller.prototype;

    ControllerProto.ID_WORD_INPUT = "idWordInput";
    ControllerProto.ID_DESCRIPTION_INPUT = "idDescriptionInput";
    ControllerProto.ID_SOURCE_INPUT = "idSourceInput";



    ControllerProto.onInit = function () {
        this.m_oWordModel = new JSONModel({
            word: null,

            words: [],
            sources: []
        });

        var oView = this.getView();
        oView.setModel(this.m_oWordModel);
        this.m_oWordInput = oView.byId(this.ID_WORD_INPUT);
        this.m_oDescriptionInput = oView.byId(this.ID_DESCRIPTION_INPUT);
        this.m_oSourceInput = oView.byId(this.ID_SOURCE_INPUT);


    };

    ControllerProto.onOpenInDialog = function(oSettings) {
        this.m_oSettings = oSettings;
        this.m_oWordModel.setProperty("/words", oSettings.words);
        this.m_oWordModel.setProperty("/sources", oSettings.sources);

        if (oSettings.word) {
            this.m_oWordModel.setProperty("/word", oSettings.word);
        }
    };

    ControllerProto.onCloseInDialog = function () {

    };

    ControllerProto.onSubmitButtonPress = function() {
        var oWord = this.m_oWordModel.getProperty("/word");

        this.getOwnerComponent().RestClient.addWord(oWord, function() {
            MessageToast.show("Successfully added \"" + oWord.word + "\"");
        });
    };

    // ------------------------------
    // Event Handler
    // ------------------------------

    ControllerProto.onHandleSuggest = function (oEvent) {
        var sTerm = oEvent.getParameter("suggestValue");
        var aFilters = [];
        if (sTerm) {
            aFilters.push(new Filter("Name", sap.ui.model.FilterOperator.Contains, sTerm));
        }
        oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
    };

    // --------------------------------
    // Utility
    // --------------------------------



    return Controller;
});