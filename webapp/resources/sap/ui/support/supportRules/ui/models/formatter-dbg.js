/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([], function () {
	"use strict";

	return {
		resolutionUrl: function (aUrls, oUrl) {
			var sSeparator = aUrls.indexOf(oUrl) === aUrls.length - 1 ? "" : ", \u00a0";
			return oUrl.text + sSeparator;
		},
		hasResolutionUrls: function (aUrls) {
			if (aUrls && aUrls.length > 0) {
				return true;
			}
			return false;
		}
	};
});