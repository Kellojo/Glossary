/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/base/assert','sap/ui/dom/jquery/byId'],function(a,b){"use strict";var _;function g(){return _||(_=sap.ui.require('sap/ui/core/Control'));}var s=function(S,v,d){if(!S){return d;}var C=g();if(C&&v instanceof C){v=v.$();}else if(typeof v==="string"){v=b(v);}else if(!(v instanceof jQuery)){a(false,'sap/ui/dom/syncStyleClass(): vSource must be a jQuery object or a Control or a string');return d;}var c=!!v.closest("."+S).length;if(d instanceof jQuery){d.toggleClass(S,c);}else if(C&&d instanceof C){d.toggleStyleClass(S,c);}else{a(false,'sap/ui/dom/syncStyleClass(): vDestination must be a jQuery object or a Control');}return d;};return s;});
