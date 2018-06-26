/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/base/encoding/encodeXML','sap/base/encoding/encodeJS','sap/base/encoding/encodeURL','sap/base/encoding/encodeURLParameters','sap/base/encoding/encodeCSS','sap/base/util/URLWhiteList','sap/base/encoding/sanitizeHTML'],function(q,e,a,b,c,d,U,s){"use strict";q.sap.encodeHTML=e;q.sap.encodeXML=e;q.sap.escapeHTML=e;q.sap.encodeJS=a;q.sap.escapeJS=a;q.sap.encodeURL=b;q.sap.encodeURLParameters=c;q.sap.encodeCSS=d;q.sap.clearUrlWhitelist=U.clear;q.sap.addUrlWhitelist=U.add;q.sap.removeUrlWhitelist=function(i){U.delete(U.entries()[i]);};q.sap.getUrlWhitelist=U.entries;q.sap.validateUrl=U.validate;Object.defineProperty(q.sap,"_sanitizeHTML",{get:function(){var _=sap.ui.requireSync('sap/base/encoding/sanitizeHTML');Object.defineProperty(this,"_sanitizeHTML",{value:_,writable:true,configurable:false});return _;},configurable:true});return q;});
