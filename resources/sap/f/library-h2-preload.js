/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine('sap/f/library',["sap/ui/base/DataType","sap/ui/Global","sap/ui/core/library","sap/m/library"],function(D){"use strict";sap.ui.getCore().initLibrary({name:"sap.f",version:"1.54.6",dependencies:["sap.ui.core","sap.m"],designtime:"sap/f/designtime/library.designtime",types:["sap.f.LayoutType","sap.f.DynamicPageTitleArea","sap.f.DynamicPageTitleShrinkRatio"],controls:["sap.f.Avatar","sap.f.DynamicPage","sap.f.DynamicPageHeader","sap.f.DynamicPageTitle","sap.f.FlexibleColumnLayout","sap.f.semantic.SemanticPage"],elements:["sap.f.semantic.AddAction","sap.f.semantic.CloseAction","sap.f.semantic.CopyAction","sap.f.semantic.DeleteAction","sap.f.semantic.DiscussInJamAction","sap.f.semantic.EditAction","sap.f.semantic.ExitFullScreenAction","sap.f.semantic.FavoriteAction","sap.f.semantic.FlagAction","sap.f.semantic.FooterMainAction","sap.f.semantic.FullScreenAction","sap.f.semantic.MessagesIndicator","sap.f.semantic.NegativeAction","sap.f.semantic.PositiveAction","sap.f.semantic.PrintAction","sap.f.semantic.SemanticButton","sap.f.semantic.SemanticControl","sap.f.semantic.SemanticToggleButton","sap.f.semantic.SendEmailAction","sap.f.semantic.SendMessageAction","sap.f.semantic.ShareInJamAction","sap.f.semantic.TitleMainAction"],extensions:{flChangeHandlers:{"sap.f.DynamicPageHeader":{"hideControl":"default","unhideControl":"default","moveControls":"default"},"sap.f.DynamicPageTitle":"sap/f/flexibility/DynamicPageTitle","sap.f.semantic.SemanticPage":{"moveControls":"default"}},"sap.ui.support":{internalRules:true}}});var t=sap.f;t.DynamicPageTitleArea={Begin:"Begin",Middle:"Middle"};t.DynamicPageTitleShrinkRatio=D.createType('sap.f.DynamicPageTitleShrinkRatio',{isValid:function(v){return/^(([0-9]\d*)(\.\d)?:([0-9]\d*)(\.\d)?:([0-9]\d*)(\.\d)?)$/.test(v);}},D.getType('string'));t.LayoutType={OneColumn:"OneColumn",TwoColumnsBeginExpanded:"TwoColumnsBeginExpanded",TwoColumnsMidExpanded:"TwoColumnsMidExpanded",MidColumnFullScreen:"MidColumnFullScreen",ThreeColumnsMidExpanded:"ThreeColumnsMidExpanded",ThreeColumnsEndExpanded:"ThreeColumnsEndExpanded",ThreeColumnsMidExpandedEndHidden:"ThreeColumnsMidExpandedEndHidden",ThreeColumnsBeginExpandedEndHidden:"ThreeColumnsBeginExpandedEndHidden",EndColumnFullScreen:"EndColumnFullScreen"};sap.ui.lazyRequire("sap.f.routing.Router");sap.ui.lazyRequire("sap.f.routing.Target");sap.ui.lazyRequire("sap.f.routing.TargetHandler");sap.ui.lazyRequire("sap.f.routing.Targets");t.AvatarShape={Circle:"Circle",Square:"Square"};t.AvatarSize={XS:"XS",S:"S",M:"M",L:"L",XL:"XL",Custom:"Custom"};t.AvatarType={Icon:"Icon",Image:"Image",Initials:"Initials"};t.AvatarImageFitType={Cover:"Cover",Contain:"Contain"};return t;});jQuery.sap.registerPreloadedModules({"name":"sap/f/library-h2-preload","version":"2.0","modules":{"sap/f/manifest.json":'{"_version":"1.9.0","sap.app":{"id":"sap.f","type":"library","embeds":[],"applicationVersion":{"version":"1.54.6"},"title":"SAPUI5 library with Fiori controls.","description":"SAPUI5 library with Fiori controls.","ach":"CA-UI5-CTR","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":["base","sap_hcb"]},"sap.ui5":{"dependencies":{"minUI5Version":"1.54","libs":{"sap.ui.core":{"minVersion":"1.54.6"},"sap.m":{"minVersion":"1.54.6"}}},"library":{"i18n":"messagebundle.properties","content":{"controls":["sap.f.Avatar","sap.f.DynamicPage","sap.f.DynamicPageHeader","sap.f.DynamicPageTitle","sap.f.FlexibleColumnLayout","sap.f.semantic.SemanticPage"],"elements":["sap.f.semantic.AddAction","sap.f.semantic.CloseAction","sap.f.semantic.CopyAction","sap.f.semantic.DeleteAction","sap.f.semantic.DiscussInJamAction","sap.f.semantic.EditAction","sap.f.semantic.ExitFullScreenAction","sap.f.semantic.FavoriteAction","sap.f.semantic.FlagAction","sap.f.semantic.FooterMainAction","sap.f.semantic.FullScreenAction","sap.f.semantic.MessagesIndicator","sap.f.semantic.NegativeAction","sap.f.semantic.PositiveAction","sap.f.semantic.PrintAction","sap.f.semantic.SemanticButton","sap.f.semantic.SemanticControl","sap.f.semantic.SemanticToggleButton","sap.f.semantic.SendEmailAction","sap.f.semantic.SendMessageAction","sap.f.semantic.ShareInJamAction","sap.f.semantic.TitleMainAction"],"types":["sap.f.LayoutType","sap.f.DynamicPageTitleArea","sap.f.DynamicPageTitleShrinkRatio"]}}}}'}});
