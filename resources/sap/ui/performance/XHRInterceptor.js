/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/getObject","sap/base/log"],function(g,l){"use strict";var X="XHRInterceptor";var r=Object.create(null);var o=Object.create(null);var x=Object.create(null);function c(a,C){o[a]=[];x[a]=window.XMLHttpRequest.prototype[a];window.XMLHttpRequest.prototype[a]=function(){var A=arguments;x[a].apply(this,A);o[a].forEach(function(C){C.apply(this,A);}.bind(this));};}function s(n,a,C){var O=g(r,n,true)[a];if(O){var i=o[a].indexOf(O);o[a][i]=C;}else{g(r,n,true)[a]=C;o[a].push(C);}}return{register:function(n,a,C){l.debug("Register '"+n+"' for XHR function '"+a+"'",X);if(!o[a]){c(a,C);}s(n,a,C);},unregister:function(n,a){var R=this.isRegistered(n,a);if(R){o[a]=o[a].filter(function(C){return C!==r[n][a];});delete r[n][a];if(Object.keys(r[n]).length===0){delete r[n];}}l.debug("Unregister '"+n+"' for XHR function '"+a+(R?"'":"' failed"),X);return R;},isRegistered:function(n,a){return r[n]&&r[n][a];}};});
