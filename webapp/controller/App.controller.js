

sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast",
   "sap/m/IconTabBar",
   "sap/m/IconTabFilter",
   "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, IconTabBar, IconTabFilter, JSONModel) {
   "use strict";


   return Controller.extend("Glossary.controller.App", {


           onLoginSubmit : function () {
               login(this.getView().byId("LoginUsername").getValue(), this.getView().byId("LoginPassword").getValue());
           },
           openRegisterView : function () {
               var app = this.getView().byId("MainContent");
               console.log(app);
               app.to("Registration");
           },
           openLoginView : function () {
               this.app.to("Login");
           }


           /*
           *   ### UI Transitions ###
           */




   });
});
