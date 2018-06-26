/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/dom/jquery/hasTabIndex"],function(q,d){"use strict";var F=Object.create(null);function i(e){return(e.offsetWidth<=0&&e.offsetHeight<=0)||q.css(e,'visibility')==='hidden';}function f(c,b){var C=b?c.firstChild:c.lastChild,o;while(C){if(C.nodeType==1&&!i(C)){if(q(C).hasTabIndex()){return C;}o=f(C,b);if(o){return o;}}C=b?C.nextSibling:C.previousSibling;}return null;}F.firstDomRef=function(){var c=this.get(0);if(!c||i(c)){return null;}return f(c,true);};F.lastDomRef=function(){var c=this.get(0);if(!c||i(c)){return null;}return f(c,false);};q.fn.firstFocusableDomRef=F.firstDomRef;q.fn.lastFocusableDomRef=F.lastDomRef;return q;});
