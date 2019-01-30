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
        oRequest.catch(this.generateErrorHandler(fnError));
        oRequest.finally(fnFinally);
    };

    Manager.register = function (email, password, fnThen, fnError, fnFinally) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(this.generateErrorHandler(fnError))
        .then(fnThen)
        .finally(fnFinally);
    };

    Manager.logout = function(fnError) {
        firebase.auth().signOut().catch(function (error) {
            if (fnError) {
                fnError(error);
            }
        });
    };

    Manager.sendPasswordResetEmail = function(mParameters) {
        firebase.auth().sendPasswordResetEmail(mParameters.email).then(function () {
            if (typeof mParameters.fnSuccess === "function") {
                mParameters.fnSuccess();
            }
        }).catch(this.generateErrorHandler(mParameters.fnError));
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
    Manager.getWordsForTable = function (params) {
        var collection = firebase.firestore().collection("words");

        //where clause to filter only by the given table id
        collection.where("table", "==", params.tableId).get().then(
            function (doc) {
                //if doc exists, run the success function
                if (doc) {

                    console.log("Found " + doc.docs.length + " words for table '" + params.tableId + "'");

                    if (typeof params.fnSuccess == "function") {
                        params.fnSuccess(doc.docs);
                    }
                }
            }).catch(this.generateErrorHandler())
            .finally(params.fnFinally);
    };

    /**
     * Creates a word in the given table
     */
    Manager.addWord = function (oWord, fnSuccess) {
        var userId = this.m_oCurrentUser.uid;
        if (userId && oWord.word && oWord.table) {

            oWord.createdAt = oWord.createdAt || new Date();
            oWord.lastModifiedAt = new Date();

            if (oWord.id) {
                firebase.firestore().collection("words").doc(oWord.id).set(oWord)
                .then(fnSuccess)
                .catch(this.generateErrorHandler());
            } else {
                firebase.firestore().collection("words").doc().set(oWord)
                .then(fnSuccess)
                .catch(this.generateErrorHandler());
            }
        }
    };

    /**
     * Deletes the given word
     */
    Manager.deleteWord = function (oWord, fnSuccess) {
        firebase.firestore().collection("words").doc(oWord.id).delete()
        .then(fnSuccess)
        .catch(this.generateErrorHandler());
    };

    /**
     * Adds a table to the users tables
     */
    Manager.addTable = function (oTable, fnSuccess) {
        var userId = this.m_oCurrentUser.uid;
        if (userId && oTable && oTable.name) {

            oTable.owner = oTable.owner || userId;
            oTable.createdAt = oTable.createdAt || new Date();
            if (oTable.id) {
                firebase.firestore().collection("tables").doc(oTable.id).set(oTable)
                    .then(fnSuccess)
                    .catch(this.generateErrorHandler());
            } else {
                firebase.firestore().collection("tables").doc().set(oTable)
                    .then(fnSuccess)
                    .catch(this.generateErrorHandler());
            }
        }
    };

    /**
     * Deletes the given table
     */
    Manager.deleteTable = function (oTable, fnSuccess) {
        firebase.firestore().collection("tables").doc(oTable.id).delete()
            .then(fnSuccess)
            .catch(this.generateErrorHandler());
    };


    return Manager;
});