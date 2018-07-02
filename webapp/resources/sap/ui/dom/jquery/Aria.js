/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery'],function(q){"use strict";var A=Object.create(null);function a(s,v,p){var b=this.attr(s);if(!b){return this.attr(s,v);}var c=b.split(" ");if(c.indexOf(v)==-1){p?c.unshift(v):c.push(v);this.attr(s,c.join(" "));}return this;}function r(s,v){var b=this.attr(s)||"",c=b.split(" "),i=c.indexOf(v);if(i==-1){return this;}c.splice(i,1);if(c.length){this.attr(s,c.join(" "));}else{this.removeAttr(s);}return this;}A.addLabelledBy=function(i,p){return a.call(this,"aria-labelledby",i,p);};A.removeLabelledBy=function(i){return r.call(this,"aria-labelledby",i);};A.addDescribedBy=function(i,p){return a.call(this,"aria-describedby",i,p);};A.removeDescribedBy=function(i){return r.call(this,"aria-describedby",i);};q.fn.addAriaLabelledBy=A.addLabelledBy;q.fn.removeAriaLabelledBy=A.removeLabelledBy;q.fn.addAriaDescribedBy=A.addDescribedBy;q.fn.removeAriaDescribedBy=A.removeDescribedBy;return q;});
