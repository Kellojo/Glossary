/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the Design Time Metadata for the sap.ui.fl.variants.VariantManagement control.
sap.ui.define([], function() {
	"use strict";
	return {
		domRef: function(oControl) {
			return oControl.getTitle().getDomRef("inner");
		},
		annotations: {},
		properties: {
			showExecuteOnSelection: {
				ignore: false
			},
			showSetAsDefault: {
				ignore: false
			},
			manualVariantKey: {
				ignore: false
			},
			inErrorState: {
				ignore: false
			},
			editable: {
				ignore: false
			},
			modelName: {
				ignore: false
			},
			updateVariantInURL: {
				ignore: false
			}
		},
		customData: {}
	};
}, /* bExport= */false);
