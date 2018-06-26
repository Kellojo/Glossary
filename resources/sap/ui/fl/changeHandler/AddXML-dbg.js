/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"jquery.sap.global",
	"sap/ui/fl/changeHandler/Base",
	"sap/ui/fl/Utils"
], function(
	jQuery,
	Base,
	Utils
) {
	"use strict";

	/**
	 * Change handler for adding XML
	 *
	 * @alias sap.ui.fl.changeHandler.AddXML
	 * @author SAP SE
	 * @version 1.54.6
	 * @since 1.54
	 * @private
	 * @experimental Since 1.54. This class is experimental and provides only limited functionality. Also the API might be changed in future.
	 */
	var AddXML = {};

	var destroyArrayOfControls = function(aControls) {
		aControls.forEach(function(oControl) {
			if (oControl.destroy) {
				oControl.destroy();
			}
		});
	};

	/**
	 * Adds the content of the XML fragment to the given aggregation of the control, if valid.
	 *
	 * @param {object} oChange Change object with instructions to be applied on the control
	 * @param {object} oControl Control which has been determined by the selector id
	 * @param {object} mPropertyBag Property bag
	 * @param {object} mPropertyBag.modifier Modifier for the controls
	 * @param {object} mPropertyBag.view Root view
	 * @param {object} mPropertyBag.appComponent App component
	 * @returns {boolean} Returns true if the change got applied successfully
	 * @public
	 * @name sap.ui.fl.changeHandler.AddXML#applyChange
	 */
	AddXML.applyChange = function(oChange, oControl, mPropertyBag) {
		var oModifier = mPropertyBag.modifier;
		var oChangeDefinition = oChange.getDefinition();
		var sAggregationName = oChangeDefinition.content.targetAggregation;
		// the backend loads the content of the fragment as ascii and adds it to the change specific content.
		if (!oChangeDefinition.content.fragment) {
			throw new Error("The content of the fragment is not set. This should happen in the backend");
		}

		var sFragment = Utils.asciiToString(oChangeDefinition.content.fragment);
		var iIndex = oChangeDefinition.content.index;
		var oView = mPropertyBag.view;
		var oViewInstance = Utils.getViewForControl(oControl);
		var oController = oViewInstance && oViewInstance.getController();

		var aNewControls;
		try {
			aNewControls = oModifier.instantiateFragment(sFragment, oChange.getId(), oViewInstance, oController);
		} catch (oError) {
			throw new Error("The following XML Fragment could not be instantiated: " + sFragment);
		}

		var oAggregationDefinition = oModifier.findAggregation(oControl, sAggregationName);
		if (!oAggregationDefinition) {
			destroyArrayOfControls(aNewControls);
			throw new Error("The given Aggregation is not available in the given control: " + oModifier.getId(oControl));
		}

		aNewControls.forEach(function(oNewControl, iIterator) {
			if (!oModifier.validateType(oNewControl, oAggregationDefinition, oControl, sFragment, iIterator)) {
				destroyArrayOfControls(aNewControls);
				throw new Error("The content of the xml fragment does not match the type of the targetAggregation: " + oAggregationDefinition.type);
			}
		});

		aNewControls.forEach(function(oNewControl, iIterator) {
			oModifier.insertAggregation(oControl, sAggregationName, oNewControl, iIndex + iIterator, oView);
		});

		oChange.setRevertData(aNewControls.map(function(oAddedControl) {
			return oModifier.getId(oAddedControl);
		}));
		return true;
	};

	/**
	 * Restores the previous state of the control, removing the content of the fragment
	 * from the aggregation
	 *
	 * @param {object} oChange Change object with instructions to be applied on the control
	 * @param {object} oControl Control which has been determined by the selector id
	 * @param {object} mPropertyBag Property bag
	 * @param {object} mPropertyBag.modifier Modifier for the controls
	 * @return {boolean} Returns true if change has been reverted successfully
	 * @public
	 * @name sap.ui.fl.changeHandler.AddXML#revertChange
	 */
	AddXML.revertChange = function(oChange, oControl, mPropertyBag) {
		var oModifier = mPropertyBag.modifier;
		var oChangeDefinition = oChange.getDefinition();
		var sAggregationName = oChangeDefinition.content.targetAggregation;
		var oView = mPropertyBag.view;
		var oAppComponent = mPropertyBag.appComponent;
		var aRevertData = oChange.getRevertData() || [];
		var aControlsToRemove = aRevertData.map(function(sId) {
			return oModifier.bySelector(sId, oAppComponent, oView);
		});

		aControlsToRemove.forEach(function(oControlToRemove) {
			oModifier.removeAggregation(oControl, sAggregationName, oControlToRemove);
		});

		destroyArrayOfControls(aControlsToRemove);
		oChange.resetRevertData();
		return true;
	};

	/**
	 * Completes the change by adding change handler specific content
	 *
	 * @param {object} oChange Change object to be completed
	 * @param {object} oSpecificChangeInfo Additional information needed to complete the change
	 * @public
	 * @name sap.ui.fl.changeHandler.AddXML#completeChangeContent
	 */
	AddXML.completeChangeContent = function(oChange, oSpecificChangeInfo) {
		var oChangeDefinition = oChange.getDefinition();

		var _throwError = function(sAttribute) {
			throw new Error("Attribute missing from the change specific content'" + sAttribute + "'");
		};

		if (!oChangeDefinition.content) {
			oChangeDefinition.content = {};
		}

		if (oSpecificChangeInfo.fragmentPath) {
			oChangeDefinition.content.fragmentPath = oSpecificChangeInfo.fragmentPath;
		} else {
			_throwError("fragmentPath");
		}

		if (oSpecificChangeInfo.targetAggregation) {
			oChangeDefinition.content.targetAggregation = oSpecificChangeInfo.targetAggregation;
		} else {
			_throwError("targetAggregation");
		}

		if (oSpecificChangeInfo.index !== undefined) {
			oChangeDefinition.content.index = oSpecificChangeInfo.index;
		} else {
			_throwError("index");
		}
	};

	return AddXML;
}, /* bExport= */true);
