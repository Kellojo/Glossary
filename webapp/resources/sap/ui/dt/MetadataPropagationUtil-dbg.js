/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides object sap.ui.dt.MetadataPropagationUtil.
sap.ui.define([
	'jquery.sap.global',
	'sap/ui/dt/Util'
],
function(
	jQuery,
	Util
) {
	"use strict";

	/**
	 * Utility class for MetadataPropagationUtil.
	 *
	 * @class Functionality to propagate DesignTime and RelevantContainer
	 * @author SAP SE
	 * @version 1.54.6
	 * @private
	 * @static
	 * @since 1.54
	 * @alias sap.ui.dt.MetadataPropagationUtil
	 */

	var MetadataPropagationUtil = {};

	MetadataPropagationUtil._getParentPropagationInfo = function(mAggregationMetadata) {
		if (!mAggregationMetadata ||
			!mAggregationMetadata["propagationInfos"]) {
			return false;
		}
		return jQuery.extend([], mAggregationMetadata["propagationInfos"]);
	};

	MetadataPropagationUtil._getCurrentRelevantContainerPropagation = function(mElementDtMetadataForAggregation, oElement) {
		var mNewPropagationInfo = {};
		if (!mElementDtMetadataForAggregation.propagateRelevantContainer) {
			return mNewPropagationInfo;
		} else if (typeof mElementDtMetadataForAggregation.propagateRelevantContainer === "function") {
			mNewPropagationInfo.relevantContainerFunction = mElementDtMetadataForAggregation.propagateRelevantContainer;
			mNewPropagationInfo.relevantContainerElement = oElement;
		} else if (typeof mElementDtMetadataForAggregation.propagateRelevantContainer === "boolean" &&
			mElementDtMetadataForAggregation.propagateRelevantContainer) {
			mNewPropagationInfo.relevantContainerFunction = function() { return true; };
			mNewPropagationInfo.relevantContainerElement = oElement;
		} else {
			var oError = Util.wrapError("Wrong type: it should be either a function or a boolean value and it is:" +
				typeof mElementDtMetadataForAggregation.propagateRelevantContainer);

			var sLocation = 'sap.ui.dt.MetadataPropagationUtil#_getCurrentRelevantContainerPropagation';
			oError.name = 'Error in ' + sLocation;
			oError.message = Util.printf("{0} / {1}", sLocation, oError.message);
			throw oError;
		}
		return mNewPropagationInfo;
	};

	MetadataPropagationUtil._getCurrentDesigntimePropagation = function(mElementDtMetadataForAggregation, oElement) {
		var mNewPropagationInfo = {};
		if (!mElementDtMetadataForAggregation.propagateMetadata) {
			return mNewPropagationInfo;
		} else if (typeof mElementDtMetadataForAggregation.propagateMetadata === "function") {
			mNewPropagationInfo.relevantContainerElement = oElement;
			mNewPropagationInfo.metadataFunction = mElementDtMetadataForAggregation.propagateMetadata;
		} else {
			var oError = Util.wrapError("Wrong type: it should be a function and it is:" +
				typeof mElementDtMetadataForAggregation.propagateRelevantContainer);

			var sLocation = 'sap.ui.dt.MetadataPropagationUtil#_getCurrentDesigntimePropagation';
			oError.name = 'Error in ' + sLocation;
			oError.message = Util.printf("{0} / {1}", sLocation, oError.message);
			throw oError;
		}
		return mNewPropagationInfo;
	};

	MetadataPropagationUtil._setPropagationInfo = function(mMetadata, mNewPropagationInfo, aPropagationInfoListFromParent) {
		if (!aPropagationInfoListFromParent &&
			jQuery.isEmptyObject(mNewPropagationInfo)) {
			return false;
		}

		// add propagation array to current aggregation designtime-metadata
		mMetadata.propagationInfos = aPropagationInfoListFromParent ? aPropagationInfoListFromParent : [];
		if (!jQuery.isEmptyObject(mNewPropagationInfo)) {
			mMetadata.propagationInfos.push(mNewPropagationInfo);
		}
		return mMetadata;
	};

	/**
	 * Extend the passed aggregationOverlay metadata with propagated aggregationOverlay metadata from parent
	 * and metadata to propagte from passed elementOverlay metadata.
	 *
	 * @param {object} mOriginalMetadata - aggregation designtime metadata data map to be extended with propagation data
	 * @param {sap.ui.core.Element} oElement - element may be used as relevant container
	 * @return {object} Returns extended data part of the element designtime metadata.
	 */
	MetadataPropagationUtil.propagateMetadataToAggregationOverlay = function(mOriginalMetadata, oElement, mParentAggregationMetadata) {
		var mNewPropagationInfo, mMetadataFunctionPropagation, mRelevantContainerPropagation,
			mMetadata = jQuery.extend({}, mOriginalMetadata);

		var aPropagatedRelevantContainersFromParent = MetadataPropagationUtil._getParentPropagationInfo(mParentAggregationMetadata);

		if (mMetadata && !jQuery.isEmptyObject(mMetadata)) {
			mRelevantContainerPropagation = MetadataPropagationUtil._getCurrentRelevantContainerPropagation(mMetadata, oElement);
			mMetadataFunctionPropagation = MetadataPropagationUtil._getCurrentDesigntimePropagation(mMetadata, oElement);
		}

		if (aPropagatedRelevantContainersFromParent || !jQuery.isEmptyObject(mRelevantContainerPropagation) || !jQuery.isEmptyObject(mMetadataFunctionPropagation)) {
			mNewPropagationInfo = jQuery.extend(mRelevantContainerPropagation, mMetadataFunctionPropagation);
			return MetadataPropagationUtil._setPropagationInfo(mMetadata, mNewPropagationInfo, aPropagatedRelevantContainersFromParent);
		} else {
			return mMetadata;
		}
	};

	MetadataPropagationUtil._getPropagation = function(mParentMetadata, oElement, callback) {
		if (!mParentMetadata ||
			!mParentMetadata.propagationInfos) {
			return false;
		}
		mParentMetadata.propagationInfos.some(function(oPropagatedInfo){
			return callback(oPropagatedInfo);
		});
	};

	/**
	 * Method extracts relevant container from given parent metadata if available.
	 *
	 * @param {object} mParentMetadata - aggregation designtime metadata data from parent
	 * @param {sap.ui.core.Element} oElement - element to check for relevant container
	 * @return {sap.ui.core.Element|boolean} Returns relevant container element if available, otherwise it returns false.
	 */
	MetadataPropagationUtil.getRelevantContainerForPropagation = function(mParentMetadata, oElement) {
		var vPropagatedRelevantContainer = false;

		MetadataPropagationUtil._getPropagation(mParentMetadata, oElement, function(oPropagatedInfo){
			if (oPropagatedInfo.relevantContainerFunction &&
				oPropagatedInfo.relevantContainerFunction(oElement)) {
				vPropagatedRelevantContainer = oPropagatedInfo.relevantContainerElement;
				return true;
			}
		});

		return vPropagatedRelevantContainer ? vPropagatedRelevantContainer : false;
	};

	/**
	 * Method extracts propagated metadata map from given parent metadata if available.
	 *
	 * @param {object} mParentMetadata - aggregation designtime metadata data from parent
	 * @param {sap.ui.core.Element} oElement - element to check for propagated metadata map
	 * @return {object|boolean} Returns propagated metadata map if available, otherwise it returns false.
	 */
	MetadataPropagationUtil.getMetadataForPropagation = function(mParentMetadata, oElement) {
		var vReturnMetadata = false;

		MetadataPropagationUtil._getPropagation(mParentMetadata, oElement, function(oPropagatedInfo) {
			if (oPropagatedInfo.metadataFunction) {
				vReturnMetadata = oPropagatedInfo.metadataFunction(oElement, oPropagatedInfo.relevantContainerElement);
				return vReturnMetadata ? true : false;
			}
		});
		return vReturnMetadata ? vReturnMetadata : false;
	};

	/**
	 * Extend the original ElementOverlay DesignTimeMetadata by propagated DesignTimeMetadata and RelevantContainer.
	 *
	 * @param {object} mTargetMetadata - element designtime metadata data to be extended with propagation data
	 * @param {object} mParentMetadata - aggregation designtime metadata data includes the propagation infos
	 * @param {sap.ui.core.Element} oElement - element is needed to check which propagation metadata is required
	 * @return {object} Returns extended data part of the element designtime metadata.
	 */
	MetadataPropagationUtil.propagateMetadataToElementOverlay = function(mTargetMetadata, mParentMetadata, oElement) {
		var vPropagatedRelevantContainer = MetadataPropagationUtil.getRelevantContainerForPropagation(mParentMetadata, oElement);
		var vPropagatedMetadata = MetadataPropagationUtil.getMetadataForPropagation(mParentMetadata, oElement);

		if (!vPropagatedRelevantContainer && !vPropagatedMetadata) {
			return mTargetMetadata;
		}

		var mResultMetadata = jQuery.extend(true, {}, mTargetMetadata);

		if (vPropagatedRelevantContainer) {
			mResultMetadata.relevantContainer = vPropagatedRelevantContainer;
		}

		if (vPropagatedMetadata){

			if (vPropagatedMetadata.actions === null) {
				var mAggregations = oElement.getMetadata().getAllAggregations();
				var aAggregationNames = Object.keys(mAggregations);

				if (mResultMetadata.aggregations) {
					aAggregationNames = aAggregationNames.concat(
						Object.keys(mResultMetadata.aggregations).filter(function (sAggregationName) {
							return aAggregationNames.indexOf(sAggregationName) < 0;
						})
					);
				} else {
					mResultMetadata.aggregations = {};
				}

				aAggregationNames.forEach(function(sAggregationName) {
					if (mResultMetadata.aggregations[sAggregationName] && mResultMetadata.aggregations[sAggregationName].actions) {
						mResultMetadata.aggregations[sAggregationName].actions = null;
					}
				});
			}
			return jQuery.extend(true, mResultMetadata, vPropagatedMetadata);
		}
		return mResultMetadata;
	};

	return MetadataPropagationUtil;
}, /* bExport= */true);