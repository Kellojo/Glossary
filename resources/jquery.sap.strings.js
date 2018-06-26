/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/base/strings/endsWithIgnoreCase','sap/base/strings/startsWithIgnoreCase','sap/base/strings/charToUpperCase','sap/base/strings/camelCase','sap/base/strings/hyphen','sap/base/strings/escapeRegExp','sap/base/strings/formatMessage'],function(q,e,s,c,a,h,b,f){"use strict";q.sap.endsWith=function(S,E){if(typeof(E)!="string"||E==""){return false;}return S.endsWith(E);};q.sap.endsWithIgnoreCase=e;q.sap.startsWith=function(S,d){if(typeof(d)!="string"||d==""){return false;}return S.startsWith(d);};q.sap.startsWithIgnoreCase=s;q.sap.charToUpperCase=c;q.sap.padLeft=function(S,p,l){if(!S){S="";}if(p&&p.length===1){return S.padStart(l,p);}while(S.length<l){S=p+S;}return S;};q.sap.padRight=function(S,p,l){if(!S){S="";}if(p&&p.length===1){return S.padEnd(l,p);}while(S.length<l){S=S+p;}return S;};q.sap.camelCase=a;q.sap.hyphen=h;q.sap.escapeRegExp=b;q.sap.formatMessage=f;return q;});
