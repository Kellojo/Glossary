/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine('sap/ui/dt/library',['jquery.sap.global','sap/ui/core/library'],function(q){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.dt",version:"1.54.6",dependencies:["sap.ui.core"],types:["sap.ui.dt.SelectionMode"],interfaces:[],controls:[],elements:[]});sap.ui.dt.SelectionMode={Multi:"Multi",Single:"Single"};return sap.ui.dt;},true);
jQuery.sap.registerPreloadedModules({
"name":"sap/ui/dt/library-h2-preload",
"version":"2.0",
"modules":{
	"sap/ui/dt/manifest.json":'{"_version":"1.9.0","sap.app":{"id":"sap.ui.dt","type":"library","embeds":[],"applicationVersion":{"version":"1.54.6"},"title":"SAP UI library: sap.ui.dt (by SAP, Author)","description":"SAP UI library: sap.ui.dt (by SAP, Author)","ach":"CA-UI5-FL-RTA","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":["base","sap_hcb"]},"sap.ui5":{"dependencies":{"minUI5Version":"1.54","libs":{"sap.ui.core":{"minVersion":"1.54.6"}}},"library":{"i18n":false,"content":{"controls":[],"elements":[],"types":["sap.ui.dt.SelectionMode"],"interfaces":[]}}}}'
}});
/* Bundle format 'h2' not supported (requires ui5loader)
"sap/ui/dt/AggregationDesignTimeMetadata.js":["sap/ui/dt/DesignTimeMetadata.js"],
"sap/ui/dt/AggregationOverlay.js":["jquery.sap.global.js","sap/ui/dt/ElementUtil.js","sap/ui/dt/Overlay.js","sap/ui/dt/OverlayRegistry.js","sap/ui/dt/Util.js"],
"sap/ui/dt/ContextMenuControl.js":["jquery.sap.global.js","sap/ui/dt/library.js","sap/ui/unified/Menu.js","sap/ui/unified/MenuItem.js"],
"sap/ui/dt/ControlObserver.js":["jquery.sap.global.js","sap/ui/dt/ManagedObjectObserver.js"],
"sap/ui/dt/DOMUtil.js":["jquery.sap.global.js"],
"sap/ui/dt/DesignTime.js":["sap/ui/base/ManagedObject.js","sap/ui/dt/AggregationDesignTimeMetadata.js","sap/ui/dt/AggregationOverlay.js","sap/ui/dt/ElementDesignTimeMetadata.js","sap/ui/dt/ElementOverlay.js","sap/ui/dt/ElementUtil.js","sap/ui/dt/MetadataPropagationUtil.js","sap/ui/dt/Overlay.js","sap/ui/dt/OverlayRegistry.js","sap/ui/dt/OverlayUtil.js","sap/ui/dt/SelectionManager.js","sap/ui/dt/TaskManager.js","sap/ui/dt/Util.js","sap/ui/dt/library.js"],
"sap/ui/dt/DesignTimeMetadata.js":["jquery.sap.global.js","sap/ui/base/ManagedObject.js","sap/ui/dt/DOMUtil.js","sap/ui/dt/ElementUtil.js"],
"sap/ui/dt/ElementDesignTimeMetadata.js":["jquery.sap.global.js","sap/ui/dt/AggregationDesignTimeMetadata.js","sap/ui/dt/DesignTimeMetadata.js"],
"sap/ui/dt/ElementOverlay.js":["sap/ui/core/Control.js","sap/ui/dt/ControlObserver.js","sap/ui/dt/DOMUtil.js","sap/ui/dt/ElementDesignTimeMetadata.js","sap/ui/dt/ElementUtil.js","sap/ui/dt/ManagedObjectObserver.js","sap/ui/dt/Overlay.js","sap/ui/dt/OverlayRegistry.js","sap/ui/dt/OverlayUtil.js","sap/ui/dt/Util.js"],
"sap/ui/dt/ElementUtil.js":["jquery.sap.global.js","sap/ui/base/ManagedObject.js"],
"sap/ui/dt/ManagedObjectObserver.js":["sap/ui/base/ManagedObject.js","sap/ui/dt/ElementUtil.js"],
"sap/ui/dt/Map.js":["sap/ui/dt/Util.js"],
"sap/ui/dt/MetadataPropagationUtil.js":["jquery.sap.global.js","sap/ui/dt/Util.js"],
"sap/ui/dt/MiniMenuControl.js":["jquery.sap.global.js","sap/ui/core/Control.js","sap/ui/dt/library.js","sap/ui/unified/Menu.js"],
"sap/ui/dt/MutationObserver.js":["jquery.sap.global.js","sap/ui/base/ManagedObject.js","sap/ui/dt/DOMUtil.js","sap/ui/dt/ElementUtil.js","sap/ui/dt/OverlayUtil.js"],
"sap/ui/dt/Overlay.js":["jquery.sap.global.js","sap/ui/core/Element.js","sap/ui/dt/DOMUtil.js","sap/ui/dt/ElementUtil.js","sap/ui/dt/Map.js","sap/ui/dt/MutationObserver.js","sap/ui/dt/OverlayUtil.js","sap/ui/dt/ScrollbarSynchronizer.js","sap/ui/dt/Util.js"],
"sap/ui/dt/OverlayRegistry.js":["sap/ui/base/ManagedObject.js","sap/ui/dt/ElementUtil.js","sap/ui/dt/Util.js"],
"sap/ui/dt/OverlayUtil.js":["jquery.sap.global.js","sap/ui/dt/ElementUtil.js","sap/ui/dt/OverlayRegistry.js"],
"sap/ui/dt/Plugin.js":["sap/ui/base/ManagedObject.js"],
"sap/ui/dt/ScrollbarSynchronizer.js":["sap/ui/base/ManagedObject.js","sap/ui/dt/DOMUtil.js"],
"sap/ui/dt/SelectionManager.js":["sap/ui/base/ManagedObject.js","sap/ui/dt/OverlayRegistry.js","sap/ui/dt/Util.js","sap/ui/dt/library.js"],
"sap/ui/dt/TaskManager.js":["sap/ui/base/ManagedObject.js"],
"sap/ui/dt/Util.js":["jquery.sap.global.js"],
"sap/ui/dt/library.js":["jquery.sap.global.js","sap/ui/core/library.js"],
"sap/ui/dt/plugin/ContextMenu.js":["jquery.sap.global.js","sap/ui/dt/ContextMenuControl.js","sap/ui/dt/OverlayRegistry.js","sap/ui/dt/Plugin.js"],
"sap/ui/dt/plugin/ControlDragDrop.js":["sap/ui/dt/ElementUtil.js","sap/ui/dt/OverlayUtil.js","sap/ui/dt/plugin/DragDrop.js","sap/ui/dt/plugin/ElementMover.js"],
"sap/ui/dt/plugin/CutPaste.js":["sap/ui/dt/OverlayRegistry.js","sap/ui/dt/OverlayUtil.js","sap/ui/dt/Plugin.js","sap/ui/dt/plugin/ElementMover.js"],
"sap/ui/dt/plugin/DragDrop.js":["sap/ui/dt/DOMUtil.js","sap/ui/dt/ElementUtil.js","sap/ui/dt/OverlayRegistry.js","sap/ui/dt/OverlayUtil.js","sap/ui/dt/Plugin.js"],
"sap/ui/dt/plugin/ElementMover.js":["sap/ui/base/ManagedObject.js","sap/ui/dt/ElementUtil.js","sap/ui/dt/OverlayRegistry.js","sap/ui/dt/OverlayUtil.js"],
"sap/ui/dt/plugin/MiniMenu.js":["jquery.sap.global.js","sap/ui/Device.js","sap/ui/dt/MiniMenuControl.js","sap/ui/dt/Plugin.js"],
"sap/ui/dt/plugin/MouseSelection.js":["sap/ui/dt/Plugin.js"],
"sap/ui/dt/plugin/TabHandling.js":["jquery.sap.global.js","sap/ui/dt/Overlay.js","sap/ui/dt/Plugin.js"],
"sap/ui/dt/test/Element.js":["jquery.sap.global.js","sap/ui/dt/ElementUtil.js","sap/ui/dt/OverlayRegistry.js"],
"sap/ui/dt/test/ElementEnablementTest.js":["jquery.sap.global.js","sap/ui/dt/DesignTime.js","sap/ui/dt/test/Element.js","sap/ui/dt/test/Test.js"],
"sap/ui/dt/test/ElementEnablementTest2.js":["jquery.sap.global.js","sap/ui/base/ManagedObject.js","sap/ui/dt/test/Element.js","sap/ui/fl/registry/ChangeRegistry.js"],
"sap/ui/dt/test/LibraryEnablementTest.js":["jquery.sap.global.js","sap/ui/dt/test/ElementEnablementTest.js","sap/ui/dt/test/Test.js"],
"sap/ui/dt/test/LibraryEnablementTest2.js":["jquery.sap.global.js","sap/ui/base/ManagedObject.js","sap/ui/dt/test/ElementEnablementTest2.js"],
"sap/ui/dt/test/LibraryTest.js":["jquery.sap.global.js","sap/ui/model/json/JSONModel.js","sap/ui/model/resource/ResourceModel.js"],
"sap/ui/dt/test/Test.js":["jquery.sap.global.js","sap/ui/base/ManagedObject.js"],
"sap/ui/dt/test/report/QUnit.js":["jquery.sap.global.js","sap/ui/base/ManagedObject.js"],
"sap/ui/dt/test/report/Statistic.js":["jquery.sap.global.js","sap/m/Label.js","sap/m/Text.js","sap/ui/core/Control.js","sap/ui/dt/test/report/StatisticRenderer.js","sap/ui/layout/form/SimpleForm.js","sap/ui/model/json/JSONModel.js"],
"sap/ui/dt/test/report/StatisticRenderer.js":["jquery.sap.global.js"],
"sap/ui/dt/test/report/Table.js":["jquery.sap.global.js","sap/m/Button.js","sap/m/RatingIndicator.js","sap/m/SearchField.js","sap/m/Text.js","sap/m/Title.js","sap/m/Toolbar.js","sap/m/ToolbarSpacer.js","sap/ui/core/Control.js","sap/ui/dt/test/report/TableRenderer.js","sap/ui/model/Filter.js","sap/ui/model/FilterOperator.js","sap/ui/model/json/JSONModel.js","sap/ui/table/Column.js","sap/ui/table/TreeTable.js"],
"sap/ui/dt/test/report/TableRenderer.js":["jquery.sap.global.js"]
*/
//# sourceMappingURL=library-h2-preload.js.map