/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/library','./View',"./TemplateViewRenderer"],function(q,l,V,T){"use strict";var a=l.mvc.ViewType;var b=V.extend("sap.ui.core.mvc.TemplateView",{metadata:{library:"sap.ui.core"}});(function(){sap.ui.templateview=function(i,v){return sap.ui.view(i,v,a.Template);};b._sType=a.Template;b.prototype.getControllerName=function(){return this._sControllerName;};b._getViewUrl=function(t){return q.sap.getModulePath(t,".view.tmpl");};b.prototype.initViewSettings=function(s){if(!s){throw new Error("mSettings must be given");}if(!s.viewName){throw new Error("No view name is given.");}this._oTemplate=sap.ui.template({id:this.getId(),src:b._getViewUrl(s.viewName)});this._sControllerName=this._oTemplate._sControllerName;this._oTemplate=this._oTemplate.createControl(undefined,undefined,this);this.addContent(this._oTemplate);};}());return b;});
