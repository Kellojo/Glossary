/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Dialog','./Popover','./library','sap/ui/core/Control','sap/ui/core/delegate/ItemNavigation','sap/ui/core/InvisibleText','sap/ui/base/ManagedObject','sap/ui/Device','./ActionSheetRenderer'],function(q,D,P,l,C,I,a,M,b,A){"use strict";var B=l.ButtonType;var c=l.DialogType;var d=l.PlacementType;var e=C.extend("sap.m.ActionSheet",{metadata:{library:"sap.m",properties:{placement:{type:"sap.m.PlacementType",group:"Appearance",defaultValue:d.Bottom},showCancelButton:{type:"boolean",group:"Appearance",defaultValue:true},cancelButtonText:{type:"string",group:"Appearance",defaultValue:null},title:{type:"string",group:"Appearance",defaultValue:null}},aggregations:{buttons:{type:"sap.m.Button",multiple:true,singularName:"button"},_cancelButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_invisibleAriaTexts:{type:"sap.ui.core.InvisibleText",multiple:true,visibility:"hidden"}},defaultAggregation:"buttons",events:{cancelButtonTap:{deprecated:true},beforeOpen:{},afterOpen:{},beforeClose:{origin:{type:"sap.m.Button"}},afterClose:{origin:{type:"sap.m.Button"}},cancelButtonPress:{}},designtime:"sap/m/designtime/ActionSheet.designtime"}});e.prototype.init=function(){this._fnOrientationChange=this._orientationChange.bind(this);};e.prototype.exit=function(){b.resize.detachHandler(this._fnOrientationChange);if(this._parent){this._parent.destroy();this._parent=null;}if(this._oCancelButton){this._oCancelButton.destroy();this._oCancelButton=null;}this._clearItemNavigation();};e.prototype._clearItemNavigation=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;}};e.prototype._setItemNavigation=function(){var f=this._getAllButtons(),g=[],o=this.getDomRef();if(o){this._oItemNavigation.setRootDomRef(o);for(var i=0;i<f.length;i++){if(f[i].getEnabled()&&f[i].getVisible()){g.push(f[i].getFocusDomRef());}}if(this._oCancelButton){g.push(this._oCancelButton.getFocusDomRef());}this._oItemNavigation.setItemDomRefs(g);this._oItemNavigation.setSelectedIndex(0);this._oItemNavigation.setPageSize(5);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"]});}};e.prototype.onBeforeRendering=function(){this._clearItemNavigation();};e.prototype.onAfterRendering=function(){this._oItemNavigation=new I();this._oItemNavigation.setCycling(false);this.addDelegate(this._oItemNavigation);this._setItemNavigation();};e.prototype.sapfocusleave=function(){this.close();};e.prototype.openBy=function(o){var t=this;if(!this._parent){var O=this.getParent();if(O){this.setParent(null);}if(!b.system.phone){this._parent=new P({placement:this.getPlacement(),showHeader:false,content:[this],beforeOpen:function(){t.fireBeforeOpen();},afterOpen:function(){t.focus();t.fireAfterOpen();},beforeClose:function(){t.fireBeforeClose();},afterClose:function(){if(t.getShowCancelButton()){t.fireCancelButtonTap();t.fireCancelButtonPress();}t.fireAfterClose();},ariaLabelledBy:this.getPopupHiddenLabelId()||undefined}).addStyleClass("sapMActionSheetPopover");if(b.browser.internet_explorer){this._parent._fnAdjustPositionAndArrow=q.proxy(function(){P.prototype._adjustPositionAndArrow.apply(this);var $=this.$(),f=$.children(".sapMPopoverCont")[0].getBoundingClientRect().width;q.each($.find(".sapMActionSheet > .sapMBtn"),function(i,g){var h=q(g),j;h.css("width","");j=g.getBoundingClientRect().width;if(j<=f){h.css("width","100%");}});},this._parent);}}else{this._parent=new D({title:this.getTitle(),type:c.Standard,content:[this],beforeOpen:function(){t.fireBeforeOpen();},afterOpen:function(){t.focus();t.fireAfterOpen();},beforeClose:function(E){t.fireBeforeClose({origin:E.getParameter("origin")});},afterClose:function(E){t.fireAfterClose({origin:E.getParameter("origin")});b.resize.detachHandler(t._fnOrientationChange);}}).addStyleClass("sapMActionSheetDialog");if(this.getTitle()){this._parent.addStyleClass("sapMActionSheetDialogWithTitle");}else{this._parent.addAriaLabelledBy(this.getPopupHiddenLabelId()||undefined);}if(!b.system.phone){this._parent.setBeginButton(this._getCancelButton());}if(b.system.phone){this._parent.oPopup.setModal(true);this._parent._setDimensions=function(){D.prototype._setDimensions.apply(this);this.$("cont").css("max-height","");};this._parent._adjustScrollingPane=function(){var h=this.$().height();this.$("cont").css("max-height",h);if(this._oScroller){this._oScroller.refresh();}};}}if(O){O.addDependent(this._parent);}}if(!b.system.phone){this._parent.openBy(o);}else{this._parent.open();b.resize.attachHandler(this._fnOrientationChange);}};e.prototype.close=function(o){if(this._parent){this._parent.close();}};e.prototype.isOpen=function(o){return!!this._parent&&this._parent.isOpen();};e.prototype._createCancelButton=function(){if(!this._oCancelButton){var s=(this.getCancelButtonText())?this.getCancelButtonText():sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACTIONSHEET_CANCELBUTTON_TEXT"),t=this;this._oCancelButton=new sap.m.Button(this.getId()+'-cancelBtn',{text:s,type:B.Reject,press:function(){if(b.system.phone&&t._parent){t._parent._oCloseTrigger=this;}t.close();t.fireCancelButtonTap();t.fireCancelButtonPress();}}).addStyleClass("sapMActionSheetButton sapMActionSheetCancelButton sapMBtnTransparent sapMBtnInverted");if(b.system.phone){this.setAggregation("_cancelButton",this._oCancelButton,true);}}return this;};e.prototype._getCancelButton=function(){if(b.system.phone&&this.getShowCancelButton()){this._createCancelButton();return this._oCancelButton;}return null;};e.prototype.setCancelButtonText=function(t){this.setProperty("cancelButtonText",t,true);if(this._oCancelButton){this._oCancelButton.setText(t);}return this;};e.prototype._preProcessActionButton=function(o){var t=o.getType();if(t!==B.Accept&&t!==B.Reject){o.setType(B.Transparent);}o.addStyleClass("sapMBtnInverted");this._parent&&this._parent.invalidate();return this;};e.prototype.setShowCancelButton=function(v){if(this._parent){if(b.system.phone){this.setProperty("showCancelButton",v,false);}}else{this.setProperty("showCancelButton",v,true);}return this;};e.prototype.setTitle=function(t){this.setProperty("title",t,true);if(this._parent&&b.system.phone){this._parent.setTitle(t);this._parent.toggleStyleClass("sapMDialog-NoHeader",!t);}if(this._parent){if(t){this._parent.addStyleClass("sapMActionSheetDialogWithTitle");}else{this._parent.removeStyleClass("sapMActionSheetDialogWithTitle");}}return this;};e.prototype.setPlacement=function(p){this.setProperty("placement",p,true);if(!b.system.phone){if(this._parent){this._parent.setPlacement(p);}}return this;};e.prototype._buttonSelected=function(){if(b.system.phone&&this._parent){this._parent._oCloseTrigger=this;}this.close();};e.prototype._orientationChange=function(){this._parent._adjustScrollingPane();};e.prototype._addAriaHiddenTexts=function(o){var s=o.getId(),i;if(sap.ui.getCore().getConfiguration().getAccessibility()){i=new a(s+"-actionSheetHiddenText");this.addAggregation("_invisibleAriaTexts",i,false);o.addAriaLabelledBy(i.getId());}};e.prototype._removeAriaHiddenTexts=function(o){o.getAriaLabelledBy().forEach(function(i){var f=sap.ui.getCore().byId(i);if(f instanceof a&&i.indexOf("actionSheetHiddenText")>-1){this.removeAggregation("_invisibleAriaTexts",f,false);o.removeAriaLabelledBy(f);f.destroy();}},this);};e.prototype.addButton=function(o){this.addAggregation("buttons",o,false);this._addAriaHiddenTexts(o);this._preProcessActionButton(o);o.attachPress(this._buttonSelected,this);return this;};e.prototype.insertButton=function(o,i){this.insertAggregation("buttons",o,i,false);this._addAriaHiddenTexts(o);this._preProcessActionButton(o);o.attachPress(this._buttonSelected,this);return this;};e.prototype.removeButton=function(o){var r=this.removeAggregation("buttons",o,false);if(r){r.detachPress(this._buttonSelected,this);this._removeAriaHiddenTexts(r);}return r;};e.prototype.removeAllButtons=function(){var r=this.removeAllAggregation("buttons",false),t=this;q.each(r,function(i,o){o.detachPress(t._buttonSelected,t);t._removeAriaHiddenTexts(o);});return r;};e.prototype.clone=function(){var f=this.getButtons();for(var i=0;i<f.length;i++){f[i].detachPress(this._buttonSelected,this);}var o=C.prototype.clone.apply(this,arguments);for(var j=0;j<f.length;j++){f[j].attachPress(this._buttonSelected,this);}return o;};e.prototype._getAllButtons=function(){return this.getButtons();};e.prototype.getPopupHiddenLabelId=function(){return a.getStaticId("sap.m","ACTIONSHEET_AVAILABLE_ACTIONS");};e.prototype._applyContextualSettings=function(){M.prototype._applyContextualSettings.call(this,M._defaultContextualSettings);};return e;});
