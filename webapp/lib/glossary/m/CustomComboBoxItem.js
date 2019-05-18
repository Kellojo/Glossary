sap.ui.define([
    "sap/ui/core/Item"
], function (Control) {
        return Control.extend("glossary.m.CustomComboBoxItem", {
            metadata: {
                
            },

            init: function() {

            },

            renderer: function (oRm, oControl) {
                
                oRm.write("<li");
                oRm.writeControlData(oControl);
                oRm.writeClasses(oControl);
                oRm.write(">");

                oRm.write("test");


                oRm.write("</li>");
            }
        });
    }
);
