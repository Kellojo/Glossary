


const Glossary = {
    config: GlossaryConfig,

    currentlyOpenedTable: {
        tableId: null,
        name: null
    },

    /**
     * All starts here
     */
    init: function() {
        this.config.init(Glossary.appStartUp.bind(this));
    },

    /**
     * Initializes firebase
     */
    initFireBase: function() {
        firebase.initializeApp(this.config.properties.firebaseConfig);
        firebase.auth().onAuthStateChanged(onAuthStateChanged.bind(this));
    },

    /**
     * Starts after everything has been loaded successfully, the app
     */
    appStartUp: function() {
        this.initFireBase();
        RestClient.init();



        /* Sets up the initial state of the website */
        setUpDisplay("loggedOut");

        /* add word input field listener */
        $('#iw_word').on('input', function () {
            checkForDuplicateWord();
        });

        /* Handle key input (enter for submitting & escape for exiting something...) */
        $(document).keypress(function (e) {
            handleKeyInput(e);
        });

        //check for mobile devices
        Glossary.isMobile = screen.width < Glossary.config.properties.minWidthForMobile;
        if (screen.width < Glossary.config.properties.minWidthForMobile) {
            GlossaryConfig.controls.bodyContent.addClass("mobile");
        }
    }
};

$(document).ready(function () {
    Glossary.init();
});
