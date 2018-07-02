/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/MobileSupport','sap/ui/Device','jquery.sap.dom','jquery.sap.events'],function(q,M,D){"use strict";(function(){q.os=q.extend({os:D.os.name,version:D.os.versionStr,fVersion:D.os.version},q.os);q.os[D.os.name]=true;q.extend(q.support,{retina:window.devicePixelRatio>=2});q.device=q.extend({},q.device);q.device.is=q.extend({standalone:window.navigator.standalone,landscape:D.orientation.landscape,portrait:D.orientation.portrait,iphone:D.os.ios&&D.system.phone,ipad:D.os.ios&&D.system.tablet,android_phone:D.system.phone&&D.os.android,android_tablet:D.system.tablet&&D.os.android,tablet:D.system.tablet,phone:D.system.phone,desktop:D.system.desktop},q.device.is);})();q.sap.simulateMobileOnDesktop=M.simulateMobileOnDesktop;q.sap.initMobile=M.initMobile;q.sap.setIcons=M.setIcons;q.sap.setMobileWebAppCapable=M.setMobileWebAppCapable;return q;});
