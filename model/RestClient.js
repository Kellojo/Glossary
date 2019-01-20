sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";

    var Manager = {};

    Manager.init = function(Component) {
        this.Component = Component;

        //init firestore
        this.firestore = firebase.firestore();
        var settings = {
            timestampsInSnapshots: true
        };
        this.firestore.settings(settings);
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));

        this.m_oCurrentUser = null;
        this.m_oUserModel = new JSONModel({
            user: null
        });
        Component.setModel(this.m_oUserModel, "userModel");
    };


    Manager.generateErrorHandler = function(fnCustomError) {
        return function(error) {
            this.Component.showErrorMessage(error.message);

            if (fnCustomError) {
                fnCustomError();
            }
        }.bind(this);
    };


    Manager.onAuthStateChanged = function(oUser) {
        this.m_oUserModel.setProperty("/user", oUser);
        this.m_oUserModel.refresh(true);
        this.m_oCurrentUser = oUser;

        if (oUser) {
            this.Component.toOverview();
        } else {
            this.Component.toLogin();
        }
    };

    Manager.login = function login(email, password, fnThen, fnError, fnFinally) {
        var oRequest = firebase.auth().signInWithEmailAndPassword(email, password);
        
        oRequest.then(fnThen);
        oRequest.catch(fnError);
        oRequest.finally(fnFinally);
    };

    Manager.register = function(email, password, fnError) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            fnError(error);
        });
    };

    Manager.logout = function(fnError) {
        firebase.auth().signOut().catch(function (error) {
            if (fnError) {
                fnError(error);
            }
        });
    };


    /**
     *  Get all tables of a given user
     */
    Manager.getTables = function (fnSuccess, fnFinally) {
        if (!this.m_oCurrentUser) {
            setTimeout(this.getTables.bind(this, fnSuccess, fnFinally), 500);
            return;
        }


        var userId = this.m_oCurrentUser.uid,
            collection = firebase.firestore().collection("tables");

        //where clause to filter only by this owner
        collection.where("owner", "==", userId).get().then(
            function (doc) {
                //if doc exists, update our current user
                if (doc) {
                    console.log("Found " + doc.docs.length + " table(s)");

                    if (typeof fnSuccess == "function") {
                        fnSuccess(doc.docs);
                    }
                }
            })
            .catch(this.generateErrorHandler())
            .finally(fnFinally);
    };

    /**
     * Queries all words including the sources for a given table
     */
    Manager.getWordsForTable = function (tableId, fnSuccess) {
        var collection = firebase.firestore().collection("words");

        //where clause to filter only by the given table id
        collection.where("table", "==", tableId).get().then(
            function (doc) {
                //if doc exists, run the success function
                if (doc) {

                    console.log("Found " + doc.docs.length + " words for table '" + tableId + "'");

                    if (typeof fnSuccess == "function") {
                        fnSuccess(doc.docs);
                    }
                }
            }).catch(function (error) {
                console.error("Error getting document:", error);
            });
    };

    /**
     * Creates a word in the given table
     */
    Manager.addWord = function (word, desciption, source, tableId, fnSuccess) {
        var userId = this.m_oCurrentUser.uid;
        if (userId && word && tableId) {
            firebase.firestore().collection("words").doc().set({
                word: word,
                description: desciption,
                source: source,

                table: tableId,
                owner: userId,

                createdAt: new Date(),
                lastModifiedAt: new Date()
            }).then(function () {
                fnSuccess();
            });
        }
    };


    return Manager;
});