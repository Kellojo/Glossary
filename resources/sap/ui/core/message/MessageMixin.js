/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/library"],function(q,l){"use strict";var V=l.ValueState;var M=function(){this.refreshDataState=r;};function r(n,d){if(d.getChanges().messages){var m=d.getMessages();var L=sap.ui.core.LabelEnablement.getReferencingLabels(this);if(L&&L.length>0){var s=L[0];m.forEach(function(a){var b=sap.ui.getCore().byId(s);if(b.getMetadata().isInstanceOf("sap.ui.core.Label")&&b.getText){a.setAdditionalText(b.getText());}else{q.sap.log.warning("sap.ui.core.message.Message: Can't create labelText."+"Label with id "+s+" is no valid sap.ui.core.Label.",this);}}.bind(this));}var o=sap.ui.getCore().getMessageManager().getMessageModel();o.checkUpdate();if(m&&m.length>0){var a=m[0];if(V[a.type]){this.setValueState(a.type);this.setValueStateText(a.message);}}else{this.setValueState(V.None);this.setValueStateText('');}}}return M;},true);
