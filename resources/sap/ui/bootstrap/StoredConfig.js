/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/base/log'],function(l){"use strict";function m(k,t,c){return function(v){try{if(v!=null||t==='string'){if(v){localStorage.setItem(k,t==='boolean'?'X':v);}else{localStorage.removeItem(k);}c(v);}v=localStorage.getItem(k);return t==='boolean'?v==='X':v;}catch(e){l.warning("Could not access localStorage while accessing '"+k+"' (value: '"+v+"', are cookies disabled?): "+e.message);}};}return{debug:m('sap-ui-debug','',function reloadHint(d){alert("Usage of debug sources is "+(d?"on":"off")+" now.\nFor the change to take effect, you need to reload the page.");}),setReboot:m('sap-ui-reboot-URL','string',function rebootUrlHint(r){if(r){alert("Next time this app is launched (only once), it will load UI5 from:\n"+r+".\nPlease reload the application page now.");}}),statistics:m('sap-ui-statistics','boolean',function gatewayStatsHint(u){alert("Usage of Gateway statistics "+(u?"on":"off")+" now.\nFor the change to take effect, you need to reload the page.");})};});
