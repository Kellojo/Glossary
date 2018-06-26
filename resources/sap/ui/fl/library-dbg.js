/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/ui/fl/RegistrationDelegator"
], function(RegistrationDelegator) {
	"use strict";

	/**
	 * SAPUI5 library for UI Flexibility and Descriptor Changes and Descriptor Variants.
	 * @namespace
	 * @name sap.ui.fl
	 * @author SAP SE
	 * @version 1.54.6
	 * @private
	 * @sap-restricted
	 */

	sap.ui.getCore().initLibrary({
		name: "sap.ui.fl",
		version: "1.54.6",
		controls: ["sap.ui.fl.variants.VariantManagement"],
		dependencies: [
			"sap.ui.core", "sap.m"
		],
		designtime: "sap/ui/fl/designtime/library.designtime",
		extensions: {
			"sap.ui.support": {
				diagnosticPlugins: [
					"sap/ui/fl/support/Flexibility"
				],
				//Configuration used for rule loading of Support Assistant
				publicRules:true
			}
		}
	});

	RegistrationDelegator.registerAll();

	return sap.ui.fl;

});
