/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library',"./ObjectPageDynamicHeaderContentRenderer"],function(q,l,O){"use strict";try{sap.ui.getCore().loadLibrary("sap.f");}catch(e){q.sap.log.error("The control 'sap.uxap.ObjectPageDynamicHeaderContent' needs library 'sap.f'.");throw(e);}var D=sap.ui.requireSync("sap/f/DynamicPageHeader");var a=D.extend("sap.uxap.ObjectPageDynamicHeaderContent",{metadata:{interfaces:["sap.uxap.IHeaderContent"],library:"sap.uxap"}});a.createInstance=function(c,v,C,p){return new a({content:c,visible:v,pinnable:p});};a.prototype.supportsPinUnpin=function(){return true;};a.prototype.supportsChildPageDesign=function(){return false;};a.prototype.supportsAlwaysExpanded=function(){return false;};a.prototype.setContentDesign=function(d){};return a;});
