/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/base/log'],function(l){"use strict";return function SyncPoint(n,c,t){var T=[],o=0,f=0,s;this.startTask=function(b){var i=T.length;T[i]={name:b,finished:false};o++;return i;};this.finishTask=function(i,S){if(!T[i]||T[i].finished){throw new Error("trying to finish non existing or already finished task");}T[i].finished=true;o--;if(S===false){f++;}if(o===0){l.info("Sync point '"+n+"' finished (tasks:"+T.length+", open:"+o+", failures:"+f+")");if(s){clearTimeout(s);s=null;}a();}};function a(){if(c){c(o,f);}c=null;}if(!isNaN(t)){s=setTimeout(function(){l.info("Sync point '"+n+"' timed out (tasks:"+T.length+", open:"+o+", failures:"+f+")");a();},t);}l.info("Sync point '"+n+"' created"+(t?"(timeout after "+t+" ms)":""));};});
