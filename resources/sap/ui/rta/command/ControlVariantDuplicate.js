/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/rta/command/BaseCommand','sap/ui/fl/changeHandler/BaseTreeModifier','sap/ui/fl/Utils'],function(B,a,f){"use strict";var C=B.extend("sap.ui.rta.command.ControlVariantDuplicate",{metadata:{library:"sap.ui.rta",properties:{sourceVariantReference:{type:"string"},newVariantReference:{type:"string"},newVariantTitle:{type:"string"}},associations:{},events:{}}});C.prototype.MODEL_NAME="$FlexVariants";C.prototype.prepare=function(F,v){this.sLayer=F.layer;return true;};C.prototype.getPreparedChange=function(){if(!this._aPreparedChanges){jQuery.sap.log.error("No prepared change available for ControlVariantDuplicate");}return this._aPreparedChanges;};C.prototype.execute=function(){var v=this.getElement(),s=this.getSourceVariantReference(),n=this.getNewVariantReference();this.oAppComponent=f.getAppComponentForControl(v);if(!n){n=f.createDefaultFileName("Copy");this.setNewVariantReference(n);}this.sVariantManagementReference=a.getSelector(v,this.oAppComponent).id;this.oModel=this.oAppComponent.getModel(this.MODEL_NAME);var p={variantManagementReference:this.sVariantManagementReference,appComponent:this.oAppComponent,layer:this.sLayer,newVariantReference:n,sourceVariantReference:s,title:this.getNewVariantTitle()};return this.oModel._copyVariant(p).then(function(c){this._oVariantChange=c[0];this._aPreparedChanges=c;}.bind(this));};C.prototype.undo=function(){if(this._oVariantChange){return this.oModel.removeVariant(this._oVariantChange,this.getSourceVariantReference(),this.sVariantManagementReference).then(function(){this._oVariantChange=null;this._aPreparedChanges=null;}.bind(this));}};return C;},true);
