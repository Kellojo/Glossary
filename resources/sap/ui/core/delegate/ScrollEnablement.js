/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device','sap/ui/base/Object','sap/ui/core/ResizeHandler','jquery.sap.keycodes','jquery.sap.trace'],function(q,D,B,R){"use strict";var $=q;var S=B.extend("sap.ui.core.delegate.ScrollEnablement",{constructor:function(c,s,C){B.apply(this);this._oControl=c;this._oControl.addDelegate(this);this._sContentId=s;this._sContainerId=C.scrollContainerId;this._bHorizontal=!!C.horizontal;this._bVertical=!!C.vertical;this._scrollX=0;this._scrollY=0;this._scrollCoef=0.9;i(this);if(this._init){this._init.apply(this,arguments);}},setHorizontal:function(h){this._bHorizontal=!!h;this._setOverflow&&this._setOverflow();},setVertical:function(v){this._bVertical=!!v;this._setOverflow&&this._setOverflow();},getHorizontal:function(){return this._bHorizontal;},getVertical:function(){return this._bVertical;},setBounce:function(b){},setPullDown:function(c){this._oPullDown=c;return this;},setGrowingList:function(s,a){this._fnScrollLoadCallback=s;this._sScrollLoadDirection=a;return this;},setIconTabBar:function(I,s,f){this._oIconTabBar=I;this._fnScrollEndCallback=q.proxy(s,I);this._fnScrollStartCallback=q.proxy(f,I);return this;},scrollTo:function(x,y,t){this._scrollX=x;this._scrollY=y;this._scrollTo(x,y,t);return this;},getChildPosition:function(e){var E=e instanceof q?e:$(e),o=E.position(),O=E.offsetParent(),a;while(!O.is(this._$Container)){a=O.position();o.top+=a.top;o.left+=a.left;O=O.offsetParent();}return o;},scrollToElement:function(e,t){if(!this._$Container[0].contains(e)||e.style.display==="none"||e.offsetParent.nodeName.toUpperCase()==="HTML"){return this;}var E=$(e),s=this.getChildPosition(E),l=this.getScrollLeft()+s.left,T=this.getScrollTop()+s.top;if(this._bFlipX){l=this.getScrollLeft()-(s.left-this._$Container.width())-E.width();}this._scrollTo(l,T,t);return this;},destroy:function(){if(this._exit){this._exit();}if(this._oControl){this._oControl.removeDelegate(this);this._oControl=undefined;}},refresh:function(){if(this._refresh){this._refresh();}},_useDefaultScroll:function(t){return t.isContentEditable;},onkeydown:function(e){if(this._useDefaultScroll(e.target)){return;}var c=this._$Container[0];if(e.altKey&&this.getHorizontal()){switch(e.keyCode){case q.sap.KeyCodes.PAGE_UP:this._customScrollTo(this._scrollX-c.clientWidth,this._scrollY,e);break;case q.sap.KeyCodes.PAGE_DOWN:this._customScrollTo(this._scrollX+c.clientWidth,this._scrollY,e);break;}}if(e.ctrlKey){switch(e.keyCode){case q.sap.KeyCodes.ARROW_UP:if(this.getVertical()){this._customScrollTo(this._scrollX,this._scrollY-c.clientHeight*this._scrollCoef,e);}break;case q.sap.KeyCodes.ARROW_DOWN:if(this.getVertical()){this._customScrollTo(this._scrollX,this._scrollY+c.clientHeight*this._scrollCoef,e);}break;case q.sap.KeyCodes.ARROW_LEFT:if(this.getHorizontal()){this._customScrollTo(this._scrollX-c.clientWidth,this._scrollY,e);}break;case q.sap.KeyCodes.ARROW_RIGHT:if(this.getHorizontal()){this._customScrollTo(this._scrollX+c.clientWidth,this._scrollY,e);}break;case q.sap.KeyCodes.HOME:if(this.getHorizontal()){this._customScrollTo(0,this._scrollY,e);}if(this.getVertical()){this._customScrollTo(this._scrollX,0,e);}break;case q.sap.KeyCodes.END:var l=c.scrollWidth-c.clientWidth;var t=c.scrollHeight-c.clientHeight;if(!this.getHorizontal()){t=this._scrollY;}if(!this.getVertical()){l=this._scrollX;}this._customScrollTo(l,t,e);break;}}},_customScrollTo:function(l,t,e){var N=e.target.nodeName;if(N!="INPUT"&&N!="TEXTAREA"){e.preventDefault();e.setMarked();this._scrollTo(l,t);}}});var n={getScrollTop:function(){return this._scrollY||0;},getScrollLeft:function(){return this._scrollX||0;},getScrollHeight:function(){var c=this._$Container;return(c&&c[0])?c[0].scrollHeight:0;},getMaxScrollTop:function(){var c=this._$Container;return(c&&c[0])?c[0].scrollHeight-c[0].clientHeight:-1;},_cleanup:function(){if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}},_setOverflow:function(){var c=this._$Container;if(!c||!c[0]){return;}if(D.os.ios){c.css("overflow-x",this._bHorizontal&&!this._bDragScroll?"scroll":"hidden").css("overflow-y",this._bVertical&&!this._bDragScroll?"scroll":"hidden").css("-webkit-overflow-scrolling","touch");}else{c.css("overflow-x",this._bHorizontal&&!this._bDragScroll?"auto":"hidden").css("overflow-y",this._bVertical&&!this._bDragScroll?"auto":"hidden");}},_refresh:function(){var c=this._$Container;if(!(c&&c.length)){return;}if(this._oPullDown&&this._oPullDown._bTouchMode){var d=this._oPullDown.getDomRef();if(d){d.style.marginTop=this._oPullDown._iState==2?"":"-"+d.offsetHeight+"px";}}if(c.scrollTop()!=this._scrollY){c.scrollTop(this._scrollY);}if(!(this._oPullDown&&this._oPullDown._bTouchMode)&&!this._fnScrollLoadCallback&&!D.browser.msie){R.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}},_onScroll:function(){var c=this._$Container,s=c.scrollTop(),v=s-this._scrollY;q.sap.interaction.notifyStepStart(this._oControl);this._scrollX=c.scrollLeft();this._scrollY=s;if(this._fnScrollLoadCallback){if(this._sScrollLoadDirection=="Upwards"){if(v<0&&s<10){this._fnScrollLoadCallback();}}else if(v>=0&&c[0].scrollHeight-s-c[0].clientHeight<100){this._fnScrollLoadCallback();}}if(this._oIconTabBar&&this._fnScrollEndCallback){this._fnScrollEndCallback();}},_onStart:function(e){var c=this._$Container[0];if(!c){return;}this._bDoDrag=this._bDragScroll;var p=e.touches?e.touches[0]:e;this._iX=p.pageX;this._iY=p.pageY;this._bPullDown=false;this._iDirection="";},_onTouchMove:function(e){var c=this._$Container[0];var p=e.touches?e.touches[0]:e;var d=p.pageX-this._iX;var a=p.pageY-this._iY;if(this._iDirection==""){if(d!=0||a!=0){this._iDirection=Math.abs(a)>Math.abs(d)?"v":"h";}if(this._oPullDown&&this._oPullDown._bTouchMode&&this._iDirection=="v"&&c.scrollTop<=1){if(a>Math.abs(d)){this._bPullDown=true;}}}if(this._bPullDown===true){var b=this._oPullDown.getDomRef();var t=e.touches[0].pageY-this._iY-b.offsetHeight;if(t>20){t=20;}b.style.marginTop=t+"px";this._oPullDown.doPull(t);e.preventDefault();this._bDoDrag=false;}if(this._bDoDrag){var s=c.scrollLeft,f=c.scrollTop;if(this._bHorizontal){if(this._bFlipX){c.scrollLeft=s-this._iX+p.pageX;}else{c.scrollLeft=s+this._iX-p.pageX;}}if(this._bVertical){c.scrollTop=f+this._iY-p.pageY;}if((c.scrollLeft!=s)||(c.scrollTop!=f)){e.setMarked&&e.setMarked();e.preventDefault();}this._iX=p.pageX;this._iY=p.pageY;return;}},_onEnd:function(e){q.sap.interaction.notifyEventStart(e);if(this._oPullDown&&this._oPullDown._bTouchMode){this._oPullDown.doScrollEnd();this._refresh();}if(this._bDragScroll&&this._iDirection){e.setMarked&&e.setMarked();}},_onMouseDown:function(e){if(this._bDragScroll&&e.button==0){this._bScrolling=true;this._onStart(e);}},_onMouseMove:function(E){if(this._bScrolling){var e=E.originalEvent||E;var b=e.buttons||e.which;if(b==1||E.pressure){var c=this._$Container[0];if(this._bHorizontal){if(this._bFlipX){c.scrollLeft=c.scrollLeft-this._iX+E.pageX;}else{c.scrollLeft=c.scrollLeft+this._iX-E.pageX;}}if(this._bVertical){c.scrollTop=c.scrollTop+this._iY-E.pageY;}this._iX=E.pageX;this._iY=E.pageY;}}},_onMouseUp:function(){if(this._bScrolling){this._bScrolling=false;this._onEnd();}},onBeforeRendering:function(){if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}var c=this._$Container;if(c){if(c.height()>0){this._scrollX=c.scrollLeft();this._scrollY=c.scrollTop();}c.off();}},onAfterRendering:function(){var c=this._$Container=this._sContainerId?$.sap.byId(this._sContainerId):$.sap.byId(this._sContentId).parent();var _=q.proxy(this._refresh,this);var e=c.is(":visible");this._setOverflow();if(this._scrollX!==0||this._scrollY!==0){this._scrollTo(this._scrollX,this._scrollY);}this._refresh();if(!e||D.browser.msie||this._oPullDown||this._fnScrollLoadCallback){this._sResizeListenerId=R.register(c[0],_);}c.on("scroll",this._onScroll.bind(this));var C=c[0];function a(E,l){E.split(" ").forEach(function(s){C&&C.addEventListener(s,l);});}function o(E){return E.pointerType=="touch"?this._onStart(E):this._onMouseDown(E);}function b(E){return E.pointerType=="touch"?this._onTouchMove(E):this._onMouseMove(E);}function d(E){return E.pointerType=="touch"?this._onEnd(E):this._onMouseUp(E);}if(D.support.pointer&&D.system.desktop){if(this._bDragScroll){a("pointerdown",o.bind(this));a("pointermove",b.bind(this));a("pointerup pointercancel pointerleave",d.bind(this));}}else if(D.support.touch){if(this._bDragScroll||this._oPullDown&&this._oPullDown._bTouchMode){c.on("touchcancel touchend",this._onEnd.bind(this)).on("touchstart",this._onStart.bind(this)).on("touchmove",this._onTouchMove.bind(this));}}else if(this._bDragScroll){c.on("mouseup mouseleave",this._onMouseUp.bind(this)).mousedown(this._onMouseDown.bind(this)).mousemove(this._onMouseMove.bind(this));}},_readActualScrollPosition:function(){if(this._$Container.width()>0){this._scrollX=this._$Container.scrollLeft();}if(this._$Container.height()>0){this._scrollY=this._$Container.scrollTop();}},_scrollTo:function(x,y,t){if(this._$Container.length>0){if(t>0){this._$Container.finish().animate({scrollTop:y,scrollLeft:x},t,q.proxy(this._readActualScrollPosition,this));}else{this._$Container.scrollTop(y);this._$Container.scrollLeft(x);this._readActualScrollPosition();}}}};function i(s){var d;if(D.support.touch||$.sap.simulateMobileOnDesktop){$.sap.require("jquery.sap.mobile");}d={_init:function(c,a,C){if($.mobile&&$.event.special.swipe&&$.event.special.swipe.scrollSupressionThreshold<120){$.event.special.swipe.scrollSupressionThreshold=120;}$.extend(this,n);if(C.nonTouchScrolling===true){this._bDragScroll=true;}if(sap.ui.getCore().getConfiguration().getRTL()){this._scrollX=9999;if(D.browser.msie||D.browser.edge){this._bFlipX=true;}}},_exit:function(){if(this._cleanup){this._cleanup();}}};$.extend(s,d);}return S;});
