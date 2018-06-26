/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return{setRequestBufferSize:function(s){if(!window.performance){return;}if(window.performance.setResourceTimingBufferSize){window.performance.setResourceTimingBufferSize(s);}else if(window.performance.webkitSetResourceTimingBufferSize){window.performance.webkitSetResourceTimingBufferSize(s);}},getRequestTimings:function(){if(window.performance&&window.performance.getEntriesByType){return window.performance.getEntriesByType("resource");}return[];},clearRequestTimings:function(){if(!window.performance){return;}if(window.performance.clearResourceTimings){window.performance.clearResourceTimings();}else if(window.performance.webkitClearResourceTimings){window.performance.webkitClearResourceTimings();}}};});
