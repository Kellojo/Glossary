/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/base/events/PseudoEvents'],function(P){"use strict";var a={};a.getPseudoTypes=function(){var p=[];if(P.getBasicTypes().indexOf(this.type)!=-1){var b=P.order.length;var o=null;for(var i=0;i<b;i++){o=P.events[P.order[i]];if(o.aTypes&&o.aTypes.indexOf(this.type)>-1&&o.fnCheck&&o.fnCheck(this)){p.push(o.sName);}}}this.getPseudoTypes=function(){return p.slice();};return p.slice();};a.isPseudoType=function(t){var p=this.getPseudoTypes();if(t){return p.indexOf(t)>-1;}else{return p.length>0;}};return a;});
