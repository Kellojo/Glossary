/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery'],function(q){"use strict";q.fn.extend({disableSelection:function(){return this.on((q.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault();});},enableSelection:function(){return this.off(".ui-disableSelection");}});return q;});
