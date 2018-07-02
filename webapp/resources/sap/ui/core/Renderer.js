/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var R={};var s;function c(b){return function(n,r){var C=Object.create(b);C.extend=c(C);if(r){q.extend(C,r);}q.sap.setObject(n,C);return C;};}var e=c(R);R.extend=function(n,r){if(typeof n==='string'){return e(n,r);}else{var C=Object.create(n||null);C._super=n;C.extend=c(C);return C;}};R.getTextAlign=function(t,T){if(!s){s=sap.ui.requireSync("sap/ui/core/library");}var a=s.TextAlign;var b=s.TextDirection;var d="",r=sap.ui.getCore().getConfiguration().getRTL();switch(t){case a.End:switch(T){case b.LTR:d="right";break;case b.RTL:d="left";break;default:d=r?"left":"right";break;}break;case a.Begin:switch(T){case b.LTR:d="left";break;case b.RTL:d="right";break;default:d=r?"right":"left";break;}break;case a.Right:if(!r||T==b.LTR){d="right";}break;case a.Center:d="center";break;case a.Left:if(r||T==b.RTL){d="left";}break;}return d;};return R;},true);
