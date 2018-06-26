/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery"],function(q){"use strict";return function(){if(!q.browser){q.browser=(function(u){var r=/(webkit)[ \/]([\w.]+)/,a=/(opera)(?:.*version)?[ \/]([\w.]+)/,b=/(msie) ([\w.]+)/,c=/(mozilla)(?:.*? rv:([\w.]+))?/,u=u.toLowerCase(),m=r.exec(u)||a.exec(u)||b.exec(u)||u.indexOf("compatible")<0&&c.exec(u)||[],d={};if(m[1]){d[m[1]]=true;d.version=m[2]||"0";if(d.webkit){d.safari=true;}}return d;}(window.navigator.userAgent));}};});
