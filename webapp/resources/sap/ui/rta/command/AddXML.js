/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/rta/command/FlexCommand','sap/ui/fl/Utils'],function(q,F,a){"use strict";var A=F.extend("sap.ui.rta.command.AddXML",{metadata:{library:"sap.ui.rta",properties:{fragment:{type:"string"},fragmentPath:{type:"string"},targetAggregation:{type:"string"},index:{type:"int"},changeType:{type:"string",defaultValue:"addXML"}},associations:{},events:{}}});A.prototype._getChangeSpecificData=function(){var s={changeType:this.getChangeType(),fragmentPath:this.getFragmentPath(),targetAggregation:this.getTargetAggregation(),index:this.getIndex()};return s;};A.prototype._applyChange=function(c,n){c.getDefinition().content.fragment=a.stringToAscii(this.getFragment());return F.prototype._applyChange.apply(this,arguments).then(function(){delete c.getDefinition().content.fragment;});};return A;},true);
