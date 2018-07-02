/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/dom/focus','sap/ui/dom/containsOrEquals','sap/ui/dom/replaceNode','sap/ui/dom/syncStyleClass','sap/ui/dom/ownerWindow','sap/ui/dom/scrollbarSize','sap/ui/dom/denormalizeScrollLeftRTL','sap/ui/dom/denormalizeScrollBeginRTL','sap/ui/dom/units/Rem','sap/ui/dom/jquery/byId','sap/ui/dom/jquery/Aria','sap/ui/dom/jquery/Selection','sap/ui/dom/jquery/zIndex','sap/ui/dom/jquery/parentByAttribute','sap/ui/dom/jquery/cursorPos','sap/ui/dom/jquery/selectText','sap/ui/dom/jquery/getSelectedText','sap/ui/dom/jquery/outerHTML','sap/ui/dom/jquery/rect','sap/ui/dom/jquery/rectContains','sap/ui/dom/jquery/Focusable','sap/ui/dom/jquery/hasTabIndex','sap/ui/dom/jquery/scrollLeftRTL','sap/ui/dom/jquery/scrollRightRTL','sap/ui/dom/jquery/Selectors'],function(q,d,a,b,c,e,f,g,h,i,j){"use strict";q.sap.domById=function domById(I,w){return I?(w||window).document.getElementById(I):null;};q.sap.byId=j;q.sap.focus=d;q.sap.pxToRem=i.fromPx;q.sap.remToPx=i.toPx;q.sap.containsOrEquals=a;q.sap.denormalizeScrollLeftRTL=g;q.sap.denormalizeScrollBeginRTL=h;
/*
	 * The following methods are taken from jQuery UI core but modified.
	 *
	 * jQuery UI Core
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/category/ui-core/
	 */
q.support.selectstart="onselectstart"in document.createElement("div");q.sap.ownerWindow=e;q.sap.scrollbarSize=f;q.sap.syncStyleClass=c;q.sap.replaceDOM=b;return q;});
