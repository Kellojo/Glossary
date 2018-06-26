/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','./uiarea','./control','jquery.sap.global','sap/ui/Global'],function(q,u,c){"use strict";function f(C,i){return C.getUIArea().getInterface();}q.fn.root=function(r){if(r){sap.ui.getCore().setRoot(this.get(0),r);return this;}var C=this.control();if(C.length>0){return C.map(f);}var U=this.uiarea();if(U.length>0){return U;}this.each(function(i){sap.ui.getCore().createUIArea(this);});return this;};return q;});
