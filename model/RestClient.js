sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";

    var Manager = {};

    Manager.init = function (Component) {
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


    Manager.generateErrorHandler = function (fnCustomError) {
        return function (error) {
            this.Component.showErrorMessage(error.message);

            if (fnCustomError) {
                fnCustomError();
            }
        }.bind(this);
    };


    Manager.onAuthStateChanged = function (oUser) {
        this.m_oUserModel.setProperty("/user", oUser);
        this.m_oUserModel.refresh(true);
        this.m_oCurrentUser = oUser;

        if (oUser) {
            this.Component.toTable();
        } else {
            this.Component.toLogin();
        }
    };

    Manager.login = function login(email, password, fnThen, error, complete) {
        var oRequest = firebase.auth().signInWithEmailAndPassword(email, password);

        oRequest.then(fnThen);
        oRequest.catch(this.generateErrorHandler(error));
        oRequest.finally(complete);
    };

    Manager.register = function (email, password, fnThen, error, complete) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(this.generateErrorHandler(error))
            .then(fnThen)
            .finally(complete);
    };

    Manager.logout = function (error) {
        firebase.auth().signOut().catch(function (error) {
            if (error) {
                error(error);
            }
        });
    };

    Manager.sendPasswordResetEmail = function (mParameters) {
        firebase.auth().sendPasswordResetEmail(mParameters.email).then(function () {
            if (typeof mParameters.success === "function") {
                mParameters.success();
            }
        }).catch(this.generateErrorHandler(mParameters.error));
    };




    /**
     *  Get all tables of a given user
     */
    Manager.getTables = function (success, complete) {
        if (!this.m_oCurrentUser) {
            setTimeout(this.getTables.bind(this, success, complete), 500);
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

                    if (typeof success == "function") {
                        success(doc.docs);
                    }
                }
            })
            .catch(this.generateErrorHandler())
            .finally(complete);
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

                    if (typeof params.success == "function") {
                        params.success(doc.docs);
                    }
                }
            }).catch(this.generateErrorHandler())
            .finally(params.complete);
    };

    /**
     * Queries all sources for a given user
     */
    Manager.getAllSources = function(params) {
        var collection = firebase.firestore().collection("words");

        //where clause to filter only by this owner
        collection.where("table", "==", params.tableId).get().then(
            function (doc) {
                //if doc exists, update our current user
                if (doc) {
                    console.log("Found " + doc.docs.length + " source(s)");

                    var aSources = [],
                        aWords = doc.docs;

                    aWords.forEach(function(word) {
                        word = word.data();
                        if (aSources.indexOf(word.source) < 0) {
                            aSources.push(word.source);
                        }
                    });


                    if (typeof params.success == "function") {
                        params.success(aSources);
                    }
                }
            })
            .catch(this.generateErrorHandler(params.error))
            .finally(params.complete);
    };

    /**
     * Gets a specific word
     */
    Manager.getWord = function (params) {
        firebase.firestore().collection("words").doc(params.id).get()
            .then(function (doc) {
                var oWord = doc.data();
                oWord.id = doc.id;
                params.success(oWord);
            })
            .catch(this.generateErrorHandler(params.error))
            .finally(params.complete);
    };

    /**
     * Creates a word in the given table
     */
    Manager.addWord = function (params) {
        var userId = this.m_oCurrentUser.uid;
        if (userId && params.word && params.word.table) {

            params.word.createdAt = params.word.createdAt || new Date();
            params.word.lastModifiedAt = new Date();

            if (params.word.id) {
                firebase.firestore().collection("words").doc(params.word.id).set(params.word)
                    .then(params.success)
                    .catch(this.generateErrorHandler(params.error))
                    .finally(params.complete);
            } else {
                firebase.firestore().collection("words").doc().set(params.word)
                    .then(params.success)
                    .catch(this.generateErrorHandler(params.error))
                    .finally(params.complete);
            }
        }
    };

    /**
     * Deletes the given word
     */
    Manager.deleteWord = function (oWord, success) {
        firebase.firestore().collection("words").doc(oWord.id).delete()
            .then(success)
            .catch(this.generateErrorHandler());
    };

    /**
     * Adds a table to the users tables
     */
    Manager.addTable = function (oTable, success) {
        var userId = this.m_oCurrentUser.uid;
        if (userId && oTable && oTable.name) {

            oTable.owner = oTable.owner || userId;
            oTable.createdAt = oTable.createdAt || new Date();
            if (oTable.id) {
                firebase.firestore().collection("tables").doc(oTable.id).set(oTable)
                    .then(success)
                    .catch(this.generateErrorHandler());
            } else {
                firebase.firestore().collection("tables").doc().set(oTable)
                    .then(success)
                    .catch(this.generateErrorHandler());
            }
        }
    };

    /**
     * Deletes the given table
     */
    Manager.deleteTable = function (oTable, success) {
        firebase.firestore().collection("tables").doc(oTable.id).delete()
            .then(success)
            .catch(this.generateErrorHandler());
    };


    return Manager;
});