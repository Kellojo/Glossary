/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/dt/Util'],function(U){"use strict";var c=function(){var M=function(){this.iIndex=0;this.mKeys={};this.mValues={};};M.prototype._getNextIndex=function(){return this.iIndex++;};M.prototype._findIndex=function(k){for(var i in this.mKeys){if(this.mKeys[i]===k){return+i;}}};M.prototype.forEach=function(C){Object.keys(this.mKeys).forEach(function(k){C(this.mValues[k],this.mKeys[k],this);},this);};M.prototype.clear=function(){Object.keys(this.mKeys).forEach(function(k){delete this.mKeys[k];delete this.mValues[k];},this);};M.prototype.delete=function(k){var K=this._findIndex(k);if(U.isInteger(K)){delete this.mKeys[K];delete this.mValues[K];}};M.prototype.get=function(k){var K=this._findIndex(k);return U.isInteger(K)?this.mValues[K]:undefined;};M.prototype.set=function(k,v){var n=this._getNextIndex();this.mKeys[n]=k;this.mValues[n]=v;};return M;};return'Map'in window?window.Map:c();},true);
