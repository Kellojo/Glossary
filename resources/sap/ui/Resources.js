/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/base/assert','sap/base/log','sap/base/strings/formatMessage','sap/base/util/extend','sap/ui/Properties'],function(a,l,f,e,P){"use strict";var r=/^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;var M={"he":"iw","yi":"ji","id":"in","sr":"sh"};var b={"iw":"he","ji":"yi","in":"id","sh":"sr"};var c={"en_US_saptrc":"1Q","en_US_sappsd":"2Q"};var d=/(?:^|-)(saptrc|sappsd)(?:-|$)/i;function n(L){var m;if(typeof L==='string'&&(m=r.exec(L.replace(/_/g,'-')))){var i=m[1].toLowerCase();i=M[i]||i;var S=m[2]?m[2].toLowerCase():undefined;var p=m[3]?m[3].toUpperCase():undefined;var v=m[4]?m[4].slice(1):undefined;var w=m[6];if((w&&(m=d.exec(w)))||(v&&(m=d.exec(v)))){return"en_US_"+m[1].toLowerCase();}if(i==="zh"&&!p){if(S==="hans"){p="CN";}else if(S==="hant"){p="TW";}}return i+(p?"_"+p+(v?"_"+v.replace("-","_"):""):"");}}function g(){var L;if(window.sap&&window.sap.ui&&sap.ui.getCore){L=sap.ui.getCore().getConfiguration().getLanguage();L=n(L);}return L||"en";}function h(L){if(!L){return null;}if(L==="zh_HK"){return"zh_TW";}var p=L.lastIndexOf('_');if(p>=0){return L.slice(0,p);}return L!=='en'?'en':'';}function j(L){var m;if(typeof L==='string'&&(m=r.exec(L.replace(/_/g,'-')))){var i=m[1].toLowerCase();i=b[i]||i;return i+(m[3]?"-"+m[3].toUpperCase()+(m[4]?"-"+m[4].slice(1).replace("_","-"):""):"");}}var k=/^((?:[^?#]*\/)?[^\/?#]*)(\.[^.\/?#]+)((?:\?([^#]*))?(?:#(.*))?)$/;var A=[".properties",".hdbtextbundle"];function s(U){var m=k.exec(U);if(!m||A.indexOf(m[2])<0){throw new Error("resource URL '"+U+"' has unknown type (should be one of "+A.join(",")+")");}return{url:U,prefix:m[1],ext:m[2],query:m[4],hash:(m[5]||""),suffix:m[2]+(m[3]||"")};}function B(U,L,i,m){this.sLocale=this._sNextLocale=n(L)||g();this.oUrlInfo=s(U);this.bIncludeInfo=i;this.aCustomBundles=[];this.aPropertyFiles=[];this.aLocales=[];if(m){var p=function(){return this;}.bind(this);return o(this).then(p,p);}q(this);}B.prototype._enhance=function(C){if(C instanceof B){this.aCustomBundles.push(C);}else{l.error("Custom resource bundle is either undefined or not an instanceof sap/ui/Resources/Bundle. Therefore this custom resource bundle will be ignored!");}};B.prototype.getText=function(K,m,C){var v=null,i;for(i=this.aCustomBundles.length-1;i>=0;i--){v=this.aCustomBundles[i].getText(K,m,true);if(v!=null){return v;}}for(i=0;i<this.aPropertyFiles.length;i++){v=this.aPropertyFiles[i].getProperty(K);if(typeof v==="string"){break;}}while(typeof v!=="string"&&this._sNextLocale!=null){var p=q(this);if(p){v=p.getProperty(K);}}if(!C&&typeof v!=="string"){a(false,"could not find any translatable text for key '"+K+"' in bundle '"+this.oUrlInfo.url+"'");v=K;}if(typeof v==="string"){if(m){v=f(v,m);}if(this.bIncludeInfo){v=new String(v);v.originInfo={source:"Resource Bundle",url:this.oUrlInfo.url,locale:this.sLocale,key:K};}}return v;};B.prototype.hasText=function(K){return this.aPropertyFiles.length>0&&typeof this.aPropertyFiles[0].getProperty(K)==="string";};function o(i){if(i._sNextLocale!=null){return u(i,true).then(function(p){return p||o(i);});}return Promise.resolve(null);}function q(i){while(i._sNextLocale!=null){var p=u(i,false);if(p){return p;}}return null;}function t(L,S){return!S||S.length===0||S.indexOf(L)>=0;}function u(i,m){var L=i._sNextLocale;i._sNextLocale=h(L);var S=window.sap&&window.sap.ui&&sap.ui.getCore&&sap.ui.getCore().getConfiguration().getSupportedLanguages();if(L!=null&&t(L,S)){var U=i.oUrlInfo,p,H;if(U.ext==='.hdbtextbundle'){if(c[L]){p=U.prefix+U.suffix+'?'+(U.query?U.query+"&":"")+"sap-language="+c[L]+(U.hash?"#"+U.hash:"");}else{p=U.url;}H={"Accept-Language":j(L)||""};}else{p=U.prefix+(L?"_"+L:"")+U.suffix;}var v=P({url:p,headers:H,async:!!m,returnNullIfMissing:true});var w=function(x){if(x){i.aPropertyFiles.push(x);i.aLocales.push(L);}return x;};return m?v.then(w):w(v);}return m?Promise.resolve(null):null;}var R=function resources(p){p=e({url:"",locale:undefined,includeInfo:false},p);return new B(p.url,p.locale,p.includeInfo,!!p.async);};R.isBundle=function(i){return i instanceof B;};R._getFallbackLocales=function(L,S){var T=n(L),i=[];while(T!=null){if(t(T,S)){i.push(T);}T=h(T);}return i;};return R;});