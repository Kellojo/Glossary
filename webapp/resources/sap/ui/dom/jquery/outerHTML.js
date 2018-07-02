/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery"],function(q){"use strict";var o=function outerHTML(){var d=this.get(0);if(d&&d.outerHTML){return q.trim(d.outerHTML);}else{var a=this[0]?this[0].ownerDocument:document;var D=a.createElement("div");D.appendChild(d.cloneNode(true));return D.innerHTML;}};q.fn.outerHTML=o;return q;});
