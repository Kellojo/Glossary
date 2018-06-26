/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/ComponentContainer','sap/ui/core/Component'],function($,C){"use strict";var _=false,a=null,b=null;return{start:function(c){if(_){throw new Error("sap.ui.test.launchers.componentLauncher: Start was called twice without teardown. Only one component can be started at a time.");}c.async=true;var p=sap.ui.component(c);_=true;return p.then(function(o){var i=$.sap.uid();b=$('<div id="'+i+'" class="sapUiOpaComponent"></div>');$("body").append(b).addClass("sapUiOpaBodyComponent");a=new C({component:o});a.placeAt(i);});},hasLaunched:function(){return _;},teardown:function(){if(!_){throw new Error("sap.ui.test.launchers.componentLauncher: Teardown was called before start. No component was started.");}a.destroy();b.remove();_=false;$("body").removeClass("sapUiOpaBodyComponent");}};},true);
