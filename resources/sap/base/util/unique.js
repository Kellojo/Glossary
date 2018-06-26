/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/base/assert'],function(b){"use strict";var u=function(a){b(a instanceof Array,"unique: a must be an array");var l=a.length;if(l>1){a.sort();var j=0;for(var i=1;i<l;i++){if(a[i]!==a[j]){a[++j]=a[i];}}if(++j<l){a.splice(j,l-j);}}return a;};return u;});
