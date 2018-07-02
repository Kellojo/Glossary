/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','sap/base/util/getObject','jquery.sap.global','sap/ui/Global'],function(q,g){"use strict";q.fn.sapui=function(c,i,C){return this.each(function(){var o=null;if(this){if(c.indexOf(".")==-1){c="sap.ui.commons."+c;}var f=g(c);if(f){if(typeof C=='object'&&typeof C.press=='function'){C.press=q.proxy(C.press,this);}o=new(f)(i,C);o.placeAt(this);}}});};return q;});
