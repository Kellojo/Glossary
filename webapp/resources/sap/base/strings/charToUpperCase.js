/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var c=function(s,p){if(!s){return s;}if(!p||isNaN(p)||p<=0||p>=s.length){p=0;}var C=s.charAt(p).toUpperCase();if(p>0){return s.substring(0,p)+C+s.substring(p+1);}return C+s.substring(p+1);};return c;});
