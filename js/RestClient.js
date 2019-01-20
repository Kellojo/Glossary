

const RestClient = {};

RestClient.init = function() {
    const firestore = firebase.firestore();
    const settings = {
        timestampsInSnapshots: true
    };
    firestore.settings(settings);
};

/**
 *  Get all tables of a given user
 */
RestClient.getTables = function(fnSuccess) {
    var userId = firebase.auth().currentUser.uid,
        collection = firebase.firestore().collection("tables");
    
    //where clause to filter only by this owner
    collection.where("owner", "==", userId).get().then(
        function (doc) {
            //if doc exists, update our current user
            if (doc) {
                Glossary.currentUser.tables = doc.docs;
                console.log("Found " + doc.docs.length + " table(s)");

                if (typeof fnSuccess == "function") {
                    fnSuccess(doc.docs);
                }
            }
        }).catch(function (error) {
            console.error("Error getting document:", error);
    });
};

/**
 * Queries all words including the sources for a given table
 */
RestClient.getWordsForTable = function (tableId, fnSuccess) {
    var collection = firebase.firestore().collection("words");

    //where clause to filter only by the given table id
    collection.where("tableId", "==", tableId).get().then(
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
 * Creates a table with the given name
 */
RestClient.createTable = function(tableName, fnSuccess) {
    var userId = firebase.auth().currentUser.uid;
    firebase.firestore().collection("tables").doc().set({
        name: tableName,
        owner: userId
    }).then(function() {
        updateTables();
        fnSuccess();
    });
};

/**
 * Creates a new word
 */
RestClient.createWord = function(word, description, source, tableId, fnSuccess) {
    var userId = firebase.auth().currentUser.uid;
    firebase.firestore().collection("words").doc().set({
        word: word,
        description: description,
        source: source,
        tableId: tableId
    }).then(function () {
        fnSuccess();
    });
};

RestClient.getWord = function(wordId, fnSuccess) {
    var collection = firebase.firestore().collection("words");

    //where clause to filter only by this owner
    collection.doc(wordId).get().then(
        function (doc) {
            //if doc exists, update our current user
            if (doc) {
                Glossary.currentUser.tables = doc.docs;
                console.log("Found '" + doc.data().word + "'");

                if (typeof fnSuccess == "function") {
                    fnSuccess(doc.data());
                }
            }
        }).catch(function (error) {
            console.error("Error getting document:", error);
        });
}

/* Updates the user data */
RestClient.updateUserData = function(username) {
    var userId = firebase.auth().currentUser.uid;
    firebase.firestore().doc('users/' + userId).set({
        username: username
    });
};