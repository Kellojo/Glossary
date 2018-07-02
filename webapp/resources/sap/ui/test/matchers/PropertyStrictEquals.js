/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Matcher'],function(q,M){"use strict";return M.extend("sap.ui.test.matchers.PropertyStrictEquals",{metadata:{publicMethods:["isMatching"],properties:{name:{type:"string"},value:{type:"any"}}},isMatching:function(c){var p=this.getName(),P=c["get"+q.sap.charToUpperCase(p,0)];if(!P){this._oLogger.error("Control '"+c+"' does not have a property '"+p+"'");return false;}var v=P.call(c);var m=v===this.getValue();if(!m){this._oLogger.debug("Control '"+c+"' property '"+p+"' has value '"+v+"' but should have value '"+this.getValue()+"'");}return m;}});});
