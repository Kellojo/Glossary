/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/library','sap/ui/Global','sap/ui/core/Core','sap/ui/core/ElementMetadata'],function(q,l,G,C,E){'use strict';var c=sap.ui.getCore().getConfiguration();function _(){var v;var h;try{v=sap.ui.getVersionInfo();}catch(e){v=undefined;}if(v){h=v.gav?v.gav:v.name;return h.indexOf('openui5')!==-1?'OpenUI5':'SAPUI5';}else{return'';}}function a(){var e=G.versioninfo?G.versioninfo.libraries:undefined;var h=Object.create(null);if(e!==undefined){e.forEach(function(i,j,k){h[i.name]=i.version;});}return h;}function b(){var e=sap.ui.getCore().getLoadedLibraries();var h=Object.create(null);Object.keys(sap.ui.getCore().getLoadedLibraries()).forEach(function(i,j,k){h[i]=e[i].version;});return h;}function d(){return{commonInformation:{frameworkName:_(),version:G.version,buildTime:G.buildinfo.buildtime,lastChange:G.buildinfo.lastchange,jquery:q.fn.jquery,userAgent:navigator.userAgent,applicationHREF:window.location.href,documentTitle:document.title,documentMode:document.documentMode||'',debugMode:q.sap.debug(),statistics:q.sap.statistics()},configurationBootstrap:window['sap-ui-config']||Object.create(null),configurationComputed:{theme:c.getTheme(),language:c.getLanguage(),formatLocale:c.getFormatLocale(),accessibility:c.getAccessibility(),animation:c.getAnimation(),rtl:c.getRTL(),debug:c.getDebug(),inspect:c.getInspect(),originInfo:c.getOriginInfo(),noDuplicateIds:c.getNoDuplicateIds()},libraries:a(),loadedLibraries:b(),loadedModules:q.sap.getAllDeclaredModules().sort(),URLParameters:q.sap.getUriParameters().mParams};}var f={_createRenderedTreeModel:function(n,r){var e=n;var h=e.firstElementChild;var i=r;var s=i;var j=sap.ui.getCore().byId(e.id);if(e.getAttribute('data-sap-ui')&&j){i.push({id:j.getId(),name:j.getMetadata().getName(),type:'sap-ui-control',content:[]});s=i[i.length-1].content;}else if(e.getAttribute('data-sap-ui-area')){i.push({id:e.id,name:'sap-ui-area',type:'data-sap-ui',content:[]});s=i[i.length-1].content;}while(h){this._createRenderedTreeModel(h,s);h=h.nextElementSibling;}}};var g={_getOwnProperties:function(e){var r=Object.create(null);var h=e.getMetadata().getProperties();r.meta=Object.create(null);r.meta.controlName=e.getMetadata().getName();r.properties=Object.create(null);Object.keys(h).forEach(function(k){r.properties[k]=Object.create(null);r.properties[k].value=e.getProperty(k);r.properties[k].type=h[k].getType().getName?h[k].getType().getName():'';});return r;},_copyInheritedProperties:function(e,i){var h=i.getProperties();var r=Object.create(null);r.meta=Object.create(null);r.meta.controlName=i.getName();r.properties=Object.create(null);Object.keys(h).forEach(function(k){r.properties[k]=Object.create(null);r.properties[k].value=h[k].get(e);r.properties[k].type=h[k].getType().getName?h[k].getType().getName():'';});return r;},_getInheritedProperties:function(e){var r=[];var i=e.getMetadata().getParent();while(i instanceof E){r.push(this._copyInheritedProperties(e,i));i=i.getParent();}return r;},_getProperties:function(e){var h=sap.ui.getCore().byId(e);var p=Object.create(null);if(h){p.own=this._getOwnProperties(h);p.inherited=this._getInheritedProperties(h);}return p;},_getModelFromContext:function(e,h){var j=e.getBinding(h);var k=j.getModel();var m=(e.getBindingInfo(h).parts)?e.getBindingInfo(h).parts:[];var n=[];for(var i=0;i<m.length;i++){n.push(m[i].model);}var o={names:n,path:j.getPath()};if(k){o.mode=k.getDefaultBindingMode();o.type=k.getMetadata().getName();o.data=k.getData?k.getData('/'):undefined;}return o;},_getBindDataForProperties:function(e){var p=e.getMetadata().getAllProperties();var h=Object.create(null);for(var k in p){if(p.hasOwnProperty(k)&&e.getBinding(k)){h[k]=Object.create(null);h[k].path=e.getBinding(k).getPath();h[k].value=e.getBinding(k).getValue();h[k].type=e.getMetadata().getProperty(k).getType().getName?e.getMetadata().getProperty(k).getType().getName():'';h[k].mode=e.getBinding(k).getBindingMode();h[k].model=this._getModelFromContext(e,k);}}return h;},_getBindDataForAggregations:function(e){var h=e.getMetadata().getAllAggregations();var i=Object.create(null);for(var k in h){if(h.hasOwnProperty(k)&&e.getBinding(k)){i[k]=Object.create(null);i[k].model=this._getModelFromContext(e,k);}}return i;}};return{getFrameworkInformation:d,getRenderedControlTree:function(){var r=[];f._createRenderedTreeModel(document.body,r);return r;},getControlProperties:function(e){return g._getProperties(e);},getControlBindings:function(e){var r=Object.create(null);var h=sap.ui.getCore().byId(e);var i;if(!h){return r;}i=h.getBindingContext();r.meta=Object.create(null);r.contextPath=i?i.getPath():null;r.aggregations=g._getBindDataForAggregations(h);r.properties=g._getBindDataForProperties(h);return r;}};});
