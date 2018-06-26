/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','sap/ui/Global'],function(q){"use strict";function u(i){return sap.ui.getCore().getUIArea(this.id)!=null;}function f(i,o){return sap.ui.getCore().getUIArea(this.id);}q.fn.uiarea=function(i){var U=this.slice("[id]").filter(u).map(f).get();return typeof(i)==="number"?U[i]:U;};return q;});
