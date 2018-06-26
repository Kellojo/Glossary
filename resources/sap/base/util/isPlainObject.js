/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/isWindow"],function(i){"use strict";var I=function(o){var k,h=({}).hasOwnProperty;if(typeof o!=="object"||o.nodeType||i(o)){return false;}if(o.constructor&&!h.call(o,"constructor")&&!h.call(o.constructor.prototype||{},"isPrototypeOf")){return false;}for(k in o){}return k===undefined||h.call(o,k);};return I;});
