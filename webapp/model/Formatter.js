sap.ui.define([], function () {
    "use strict";

    var Formatter = {};


    Formatter.formatWelcomeMessage = function (sUsername) {
        var oUserModel = this.getOwnerComponent().getModel("userModel"),
            sUsername = oUserModel.getProperty("/user/email");
        return sUsername;
    };

    Formatter.formatFirebaseTimestamp = function (otimestamp) {
        if (!otimestamp) {
            return "";
        }

        var oDate = null;
        if (otimestamp instanceof Date) {
            oDate = otimestamp;
        } else {
            oDate = new Date(otimestamp.seconds * 1000);
        }
        var iMonth = oDate.getMonth() + 1,
            sMonth = iMonth < 10 ? "0" + iMonth : iMonth;
        return oDate.getDate() + "." + sMonth + "." + oDate.getFullYear()
    };

    Formatter.formatFirebaseTimestampLong = function (otimestamp) {
        if (!otimestamp) {
            return "";
        }

        var oDate = null;
        if (otimestamp instanceof Date) {
            oDate = otimestamp;
        } else {
            oDate = new Date(otimestamp.seconds * 1000);
        }
        return "Last modified " + oDate.toLocaleString();
    };

    Formatter.formatString = function (sSource) {
        if (!sSource) {
            return "-";
        }
        return sSource;
    };

    Formatter.formatEmailVerified = function (oUser) {
        if (oUser.emailVerified) {
            return " (verified)";
        } else {
            return " (not verified)";
        }
    };

    Formatter.formatCreationTimeStamp = function (sDate) {
        return "Created on " + new Date(sDate).toLocaleString();
    };

    Formatter.formatLastSignInTimeStamp = function (sDate) {
        return "Last sign in " + new Date(sDate).toLocaleString();
    };



    return Formatter;
});