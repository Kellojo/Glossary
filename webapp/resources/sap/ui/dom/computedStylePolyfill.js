/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return function(){var g=window.getComputedStyle;window.getComputedStyle=function(e,p){var c=g.call(this,e,p);if(c===null){return document.body.cloneNode(false).style;}return c;};};});
