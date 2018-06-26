/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";function c(S,b){var u=S&&S.getAttribute("src");var m=b.exec(u);if(m){return{tag:S,url:u,resourceRoot:m[1]||""};}}var r=/^((?:.*\/)?resources\/)/,a,s,i,R;R=c(document.querySelector('SCRIPT[src][id=sap-ui-bootstrap]'),r);if(!R){s=document.querySelectorAll('SCRIPT[src]');a=/^(.*\/)?(?:sap-ui-(core|custom|boot|merged)(?:-.*)?)\.js(?:[?#]|$)/;for(i=0;i<s.length;i++){R=c(s[i],a);if(R){break;}}}return R||{};});
