/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/base/events/KeyCodes'],function(K){"use strict";var i=function(e){function a(e){var k=e.which;return(k===K.SHIFT)||(k===K.CONTROL)||(k===K.ALT)||(k===K.CAPS_LOCK)||(k===K.NUM_LOCK);}function b(e){var k=e.which,A=(k>=37&&k<=40);switch(e.type){case"keydown":case"keyup":return A;case"keypress":return k===0;default:return false;}}var k=e.which,s=a(e)||b(e)||(k>=33&&k<=36)||(k>=44&&k<=46)||(k>=112&&k<=123)||(k===K.BREAK)||(k===K.BACKSPACE)||(k===K.TAB)||(k===K.ENTER)||(k===K.ESCAPE)||(k===K.SCROLL_LOCK);switch(e.type){case"keydown":case"keyup":return s;case"keypress":return(k===0||k===K.BACKSPACE||k===K.ESCAPE||k===K.ENTER)||false;default:return false;}};return i;});
