
const GlossaryConfig = {
    properties: {
        appTitle: "Glossary",
        minWidthForMobile: 577,
        firebaseConfig: {
            apiKey: "AIzaSyCl49KQFEgcZl6aKr77PUwzxmqRsz-INuY",
            authDomain: "glossary-daeb8.firebaseapp.com",
            databaseURL: "https://glossary-daeb8.firebaseio.com",
            projectId: "glossary-daeb8",
            storageBucket: "glossary-daeb8.appspot.com",
            messagingSenderId: "101359376375"
        }
    },

    views: [
        {
            source: "views/login.view.html",
            target: "loginAndRegistration"
        },
        {
            source: "views/tables.view.html",
            target: "tablesOverview"
        },
    ],

    controls: {
        title: "appTitle",
        splashScreen: "splashScreen",
        mainBody: "mainBody",
        bodyContent: "bodyContent",
        menuContainer: "menu",
        avatar: "avatar",

        contentNavContainer: "idContentNavContainer",

        loginAndRegistration: {
            container: "loginAndRegistration",
            registrationForm: {
                emailInput: "registration_form_email",
                passwordInput: "registration_form_password"
            },
            loginForm: {
                emailInput: "login_form_email",
                passwordInput: "login_form_password"
            }
        },
        tablesOverview: {
            container: "tablesOverview",
            table: "mainTable",
            tableContentContainer: "tableContentContainer",
            busyIndicator: "tableBusyIndicator",
            noDataIndicator: "noDataIndicator"
        },
        tabsContainer: "tabs_container"

    },

    instantiatableControls: {},


    /**
     * Init the Config
     */
    init: function (onAfterConfigInitSuccess) {
        this.onAfterConfigInitSuccess = onAfterConfigInitSuccess;
        this.viewsDone = false;
        this.controlsDone = false;
        this.loadViews();
        this.loadInstantiatableControls();
    },

    /**
     * Called after the init has been successfully completed
     */
    onAfterInitSuccess: function () {
        //create central nav container
        this.contentNavContainer = new NavContainer(this.controls.contentNavContainer);


        this.onAfterConfigInitSuccess();
    },

    /**
     * Registeres all controls in the .controls property
     */
    registerControls: function (oObject) {
        for (var key in oObject) {
            var oCurrentProperty = oObject[key];
            if (oCurrentProperty !== null && typeof oCurrentProperty === "object") {
                this.registerControls(oCurrentProperty);
            } else {
                var element = $("#" + oCurrentProperty);
                if (element.length) {
                    oObject[key] = element;
                } else {
                    oObject[key] = null;
                    console.error("The property '" + oCurrentProperty + "' could not be found");
                }
            }
        }
    },

    /**
     * Loads all views
     */
    loadViews: function () {
        this.loadedViews = 0;

        for (var i = 0; i < this.views.length; i++) {
            var view = this.views[i];

            //load view via jQuery
            $("#" + view.target).load(view.source, null, function () {
                //if all views have been loaded, run the init
                this.loadedViews++;

                if (this.loadedViews >= this.views.length) {
                    console.log("All Views Loaded");
                    this.registerControls(this.controls);
                }

                this.viewsDone = true;
                this.runSuccess();
            }.bind(this));
        }
    },

    /**
     * Loads the instantiatable controls from the server
     */
    loadInstantiatableControls: function () {
        $.getJSON("preloads.json", function (json) {
            this.instantiatableControls = json;
            this.controlsDone = true;
            this.runSuccess();
        }.bind(this));
    },

    runSuccess: function () {
        if (this.viewsDone && this.controlsDone) {
            this.onAfterInitSuccess();
        }
    },

    /**
     * Instantiated a control via its key and sets the properties on it
     * @param {string} sControlKey - the key of the control
     * @param {object} properties - properties to insert into the control
     * @param {object} oController - the controller prototype for this control
     */
    instantiateControl: function (sControlKey, properties, oController) {
        if (this.instantiatableControls.hasOwnProperty(sControlKey)) {
            var sControl = this.instantiatableControls[sControlKey];

            //loop over properties
            for (var property in properties) {
                var sPath = "{" + property + "}";
                if (sControl.includes(sPath)) {
                    sControl = sControl.replace(sPath, properties[property]);
                }
            }

            var element = $(sControl);
            if (oController) {
                element.controller = new oController();
            } else {
                console.warn("No controller given for instantiated control '" + sControlKey + "'");
            }
            return element;
        } else {
            console.error("Could not find instanitiatable control '" + sControlKey + "'");
        }
    }
};