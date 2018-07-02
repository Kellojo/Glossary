/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	'jquery.sap.global',
	'sap/ui/dt/Plugin',
	'sap/ui/dt/MiniMenuControl',
	'sap/ui/Device'
], function (
	jQuery,
	Plugin,
	MiniMenuControl,
	Device
) {
	"use strict";

	/**
	 * Constructor for a new MiniMenu.
	 *
	 * @param {string} [sId] id for the new object, generated automatically if no id is given
	 * @param {object} [mSettings] initial settings for the new object
	 * @class The MiniMenu registers event handler to open the context menu. Menu entries can dynamically be added
	 * @extends sap.ui.dt.Plugin
	 * @author SAP SE
	 * @version 1.54.6
	 * @constructor
	 * @private
	 * @since 1.53
	 * @alias sap.ui.dt.plugin.MiniMenu
	 * @experimental Since 1.53. This class is experimental and provides only limited functionality. Also the API might be changed in future.
	 */
	var MiniMenu = Plugin.extend("sap.ui.dt.plugin.MiniMenu", /** @lends sap.ui.rta.plugin.MiniMenu.prototype */ {
		metadata: {
			properties: {
				contextElement: {
					type: "object"
				},
				styleClass: {
					type: "string"
				},
				openOnHover: {
					type: "boolean",
					defaultValue: true
				}
			},
			events: {
				openedMiniMenu: {},
				closedMiniMenu: {}
			}
		}

	});

	MiniMenu.prototype.init = function () {
		this.iMenuTouchOpeningDelay = 150;
		this.iMenuLeftclickOpeningDelay = 0;
		this.iMenuHoverOpeningDelay = 1250;
		this.iMenuHoverClosingDelay = 250; //Should be lower than iMenuHoverOpeningDelay, otherwise MiniMenu is instantly closed

		this.oMiniMenu = new sap.ui.dt.MiniMenuControl({
			maxButtonsDisplayed: 4 //The maximum number of buttons which should be displayed in the collapsed version of the MiniMenu (including overflow-button)
		});

		this.oMiniMenu.attachClosed(this._miniMenuClosed, this);
		this.oMiniMenu.attachOverflowButtonPressed(this._pressedOverflowButton, this);

		this._aMenuItems = [];
		this._aGroupedItems = [];
		this._aSubMenus = [];
		this._aPluginsWithBusyFunction = [];

		this._oMousePosition = {
			iMouseX: null,
			iMouseY: null
		};
	};


	MiniMenu.prototype.exit = function () {
		this.oMiniMenu.detachClosed(this._miniMenuClosed, this);
		this.oMiniMenu.detachOverflowButtonPressed(this._pressedOverflowButton, this);
		delete this._aMenuItems;
		if (this.oMiniMenu) {
			this.oMiniMenu.destroy();
			delete this.oMiniMenu;
		}
	};

	/**
	 * Add menu items in the following format:
	 *
	 * @param {object} mMenuItem json object with the menu item settings
	 * @param {string} mMenuItem.id id, which corresponds to the text key
	 * @param {string} mMenuItems.text menu item text (translated)
	 * @param {string} mMenuItems.icon a icon for the button
	 * @param {function} mMenuItem.handler event handler if menu is selected, the element for which the menu was opened is passed to the handler
	 * @param {function} mMenuItem.startSection? function to determine if a new section should be started, the element for which the menu was opened
	 *        is passed to the handler, default false
	 * @param {function} mMenuItem.enabled? function to determine if the menu entry should be enabled, the element for which the menu should be opened
	 *        is passed, default true
	 * @param {boolean} bRetrievedFromPlugin flag to mark if a menu item was retrieved from a plugin (in runtime)
	 * @param {boolena} bPersistOneTime flag to mark that the Button persist the next Menu clearing
	 */
	MiniMenu.prototype.addMenuItem = function (mMenuItem, bRetrievedFromPlugin, bPersistOneTime) {
		var mMenuItemEntry = {
			menuItem: mMenuItem,
			fromPlugin: !!bRetrievedFromPlugin,
			bPersistOneTime: bPersistOneTime
		};
		this._aMenuItems.push(mMenuItemEntry);
	};

	/**
	 * Register an overlay
	 *
	 * @param {sap.ui.dt.Overlay} oOverlay overlay object
	 * @override
	 */
	MiniMenu.prototype.registerElementOverlay = function (oOverlay) {
		oOverlay.attachBrowserEvent("click", this._onClick, this);
		oOverlay.attachBrowserEvent("touchstart", this._onTouch, this);
		oOverlay.attachBrowserEvent("contextmenu", this._onContextMenu, this);
		oOverlay.attachBrowserEvent("mouseover", this._onHover, this);
		oOverlay.attachBrowserEvent("mouseout", this._onHoverExit, this);
		oOverlay.attachBrowserEvent("keydown", this._onKeyDown, this);
	};


	/**
	 * Additionally to super->deregisterOverlay this method detaches the browser events
	 *
	 * @param {sap.ui.dt.Overlay} oOverlay overlay object
	 * @override
	 */
	MiniMenu.prototype.deregisterElementOverlay = function (oOverlay) {
		oOverlay.detachBrowserEvent("click", this._onClick, this);
		oOverlay.detachBrowserEvent("touchstart", this._onTouch, this);
		oOverlay.detachBrowserEvent("contextmenu", this._onContextMenu, this);
		oOverlay.detachBrowserEvent("mouseover", this._onHover, this);
		oOverlay.detachBrowserEvent("mouseout", this._onHoverExit, this);
		oOverlay.detachBrowserEvent("keydown", this._onKeyDown, this);
	};

	/**
	 * Opens the Context Menu
	 * @param {sap.ui.base.Event} oEvent Event that triggered the menu to open
	 * @param {sap.ui.dt.Overlay} oOverlay overlay object
	 * @param {boolean} bContextMenu whether the contol should be opened as a context menu
	 * @param {boolean} bIsSubMenu whether the new MiniMenu is a SubMenu opened by a button inside another MiniMenu
	 */
	MiniMenu.prototype.open = function (oEvent, oOverlay, bContextMenu, bIsSubMenu) {

		this._bContextMenu = !!bContextMenu;

		this._aPluginsWithBusyFunction = [];
		this.setContextElement(oOverlay.getElement());

		var aPlugins = this.getDesignTime().getPlugins();
		aPlugins.forEach(function (oPlugin) {
			if (oPlugin.isBusy) {
				this._aPluginsWithBusyFunction.push(oPlugin);
			}
		}.bind(this));

		//Remove all previous entries retrieved by plugins (the list should always be rebuilt)
		this._aMenuItems = this._aMenuItems.filter(function (mMenuItemEntry) {
			if (mMenuItemEntry.bPersistOneTime) {
				mMenuItemEntry.bPersistOneTime = false;
				return true;
			}
			return !mMenuItemEntry.fromPlugin;
		});

		if (!bIsSubMenu) {

			this._aGroupedItems = [];

			this._aSubMenus = [];

			aPlugins.forEach(function (oPlugin) {
				var aPluginMenuItems = oPlugin.getMenuItems(oOverlay) || [];
				aPluginMenuItems.forEach(function (mMenuItem) {
					if (mMenuItem.group != undefined && !bContextMenu) {
						this._addMenuItemToGroup(mMenuItem);
					} else if (mMenuItem.submenu != undefined) {
						this._addSubMenu(mMenuItem, oEvent, oOverlay);
					} else {
						this.addMenuItem(mMenuItem, true);
					}
				}.bind(this));
			}.bind(this));

			this._addItemGroupsToMenu(oEvent, oOverlay);
		}

		var aMenuItems = this._aMenuItems.map(function (mMenuItemEntry) {
			return mMenuItemEntry.menuItem;
		});

		if (aMenuItems.length > 0) {

			this.oMiniMenu._bUseExpPop = !!bContextMenu;

			aMenuItems = this._sortMenuItems(aMenuItems);
			this.oMiniMenu.setButtons(aMenuItems, this, oOverlay);

			this.oMiniMenu.setStyleClass(this.getStyleClass());
			if (bIsSubMenu) {
				this.oMiniMenu.setOpenNew(true);
			}


			this.oMiniMenu.show(oOverlay, bContextMenu, {
				x: oEvent.clientX,
				y: oEvent.clientY
			});
		}

		this.fireOpenedMiniMenu();
	};

	/**
	 * Collect menu items sorted by rank (entries without rank come first)
	 * @param  {object[]} aMenuItems List of menu items
	 * @return {object[]}            Returned a sorted list of menu items; higher rank come later
	 */
	MiniMenu.prototype._sortMenuItems = function (aMenuItems) {
		return aMenuItems.sort(function (mFirstEntry, mSecondEntry) {
			// Both entries do not have rank, do not change the order
			if (!mFirstEntry.rank && !mSecondEntry.rank) {
				return 0;
			}
			// One entry does not have rank, push it to the front
			if (!mFirstEntry.rank && mSecondEntry.rank) {
				return -1;
			}
			if (mFirstEntry.rank && !mSecondEntry.rank) {
				return 1;
			}
			return mFirstEntry.rank - mSecondEntry.rank;
		});
	};

	/**
	 * Funcion is called when "_onContextMenu" is fired -> opens the MiniMenu
	 * @param {sap.ui.base.Event} oEvent Event object
	 * @private
	 */
	MiniMenu.prototype._onContextMenu = function (oEvent) {
		var oOverlay = sap.ui.getCore().byId(oEvent.currentTarget.id);

		if (oOverlay && oOverlay.isSelectable()) {
			oEvent.preventDefault();
			if (!this._bTouched) {
				this._oCurrentOverlay = sap.ui.getCore().byId(oEvent.currentTarget.id);
				this.oMiniMenu.close();
				this._bOpenedByHover = false;

				//IE sometimes returns null for document.activeElement
				if (document.activeElement) {
					document.activeElement.blur();
				}

				clearTimeout(this.hoverTimeout);

				this._bTouched = false;
				this._ensureSelection(oOverlay);

				clearTimeout(this.clickTimeout);

				this.lockMenuOpening();
				this.oMiniMenu.bOpenNew = true;
				this.open(oEvent, oOverlay, true);
				oEvent.stopPropagation();
			}
		}
	};

	/**
	 * Called when a context menu item gets selected by user
	 * @param {sap.ui.base.Event} oEvent event object
	 * @override
	 * @private
	 */
	MiniMenu.prototype._onItemSelected = function (oEvent) {
		this.oMiniMenu.close();
		this._ensureSelection(this._oCurrentOverlay);
		this.setFocusLock(true);

		var aSelection = [],
			oContextElement = this.getContextElement(),
			sId = oEvent.data("id");

		this._aMenuItems.some(function (mMenuItemEntry) {
			if (sId === mMenuItemEntry.menuItem.id) {
				var oItem = mMenuItemEntry.menuItem;
				aSelection = this.getSelectedOverlays();
				jQuery.sap.assert(aSelection.length > 0, "sap.ui.rta - Opening context menu, with empty selection - check event order");
				var mPropertiesBag = {};
				mPropertiesBag.eventItem = oEvent;
				mPropertiesBag.contextElement = oContextElement;
				oItem.handler(aSelection, mPropertiesBag);
				oItem = null;
				return true;
			}
		}, this);

	};


	/**
	 * Called when the user touches an overlay
	 * @param {sap.ui.base.Event} oEvent event object
	 * @private
	 */
	MiniMenu.prototype._onTouch = function (oEvent) {

		this._bTouched = true;

		var oOverlay = sap.ui.getCore().byId(oEvent.currentTarget.id);
		if (oOverlay && oOverlay.isSelectable()) {
			oEvent.stopPropagation();
			if (this.touchTimeout) {
				clearTimeout(this.touchTimeout);
			}
			this.touchTimeout = setTimeout(function () {
				this._bTouched = true;
				this._startOpening(oEvent);
			}.bind(this), this.iMenuTouchOpeningDelay);
		}
	};


	/**
	 * Called when the user clicks on an overlay
	 * @param {sap.ui.base.Event} oEvent event object
	 * @private
	 */
	MiniMenu.prototype._onClick = function (oEvent) {

		if (!Device.os.ios && !oEvent.ctrlKey) {
			var oOverlay = sap.ui.getCore().byId(oEvent.currentTarget.id);
			if (oOverlay && oOverlay.isSelectable()) {

				if (this.isMenuOpeningLocked() && !this._bTouched) {
					this.resetFocus();
					sap.ui.getCore().byId(oEvent.currentTarget.id).setSelected(false);
					this.unlockMenuOpening();
					this._onHover(oEvent);
					this._bTouched = false;
					this.oMiniMenu.close();
					return;
				}

				this._bTouched = false;
				this.clickTimeout = setTimeout(function () {
					this._startOpening(oEvent, true);
				}.bind(this), this.iMenuLeftclickOpeningDelay);
				oEvent.stopPropagation();
			}
		}
	};

	/**
	 * Called before the MiniMenu is opened (except by contextMenu event)
	 * Checks whether a new MiniMenu should been opened and does so, if check returned true
	 * @param {sap.ui.base.Event} oEvent event object
	 * @param {boolean} bLockOpening should the Opening of the MiniMenu be locked
	 * @return {boolean} Whether a new MiniMenu has been opened or not
	 * @private
	 */
	MiniMenu.prototype._startOpening = function (oEvent, bLockOpening) {

		clearTimeout(this.hoverTimeout);
		this._bOpenedByHover = false;

		if (this._oTempTarget != oEvent.currentTarget.id) {
			clearTimeout(this.clickTimeout);
		}

		this._oTempTarget = oEvent.currentTarget.id;

		var oOverlay = sap.ui.getCore().byId(oEvent.currentTarget.id);
		var sTargetClasses = oEvent.target.className;

		if (oOverlay && oOverlay.isSelectable() && sTargetClasses.indexOf("sapUiDtOverlay") > -1 && (!this.isMenuOpeningLocked() || this._bTouched)) {

			oEvent.stopPropagation();

			if (this._shouldMiniMenuOpen(oEvent, !this.oMiniMenu.bOpen)) {
				this._ensureSelection(oOverlay);
				if (this._oCurrentOverlay.isSelected() || Device.os.android) {
					if (bLockOpening) {
						this.lockMenuOpening();
					}
					this.oMiniMenu.bOpenNew = true;
					this.open(oEvent, oOverlay);

					return true;
				}
			}
		}
	};

	/**
	 * Called when the user hovers over an overlay
	 * @param {sap.ui.base.Event} oEvent event object
	 * @private
	 */
	MiniMenu.prototype._onHover = function (oEvent) {
		if (this._oMousePosition.iMouseX === oEvent.clientX && this._oMousePosition.iMouseY === oEvent.clientY) {
			return;
		}

		var oOverlay = sap.ui.getCore().byId(oEvent.currentTarget.id);
		if (oOverlay && oOverlay.isSelectable() && !oEvent.ctrlKey && this.getOpenOnHover()) {
			oEvent.stopPropagation();
			if (this._shouldMiniMenuOpen(oEvent, true, true)) {
				this._oMousePosition = {
					iMouseX: oEvent.clientX,
					iMouseY: oEvent.clientY
				};
				if (this.iMenuHoverClosingDelay >= this.iMenuHoverOpeningDelay) {
					jQuery.error("sap.ui.dt MiniMenu iMenuHoverClosingDelay is bigger or equal to iMenuHoverOpeningDelay!");
				}

				if (this.oMiniMenu.getPopover().isOpen()) {
					this._closingTimeout = setTimeout(function () {
						if (!this._bTouched && this.oMiniMenu.getPopover().isOpen()) {
							this.oMiniMenu.close();
						}
					}.bind(this), this.iMenuHoverClosingDelay);
				}

				this.hoverTimeout = setTimeout(function () {
					if (!this._bTouched) {
						sap.ui.getCore().byId(oEvent.currentTarget.id).focus();
						this._startOpening(oEvent);
						this._bOpenedByHover = true;
					}
				}.bind(this), this.iMenuHoverOpeningDelay);
			}
		}
	};

	/**
	 * Called when the user stops hovering over an overlay
	 * @param {sap.ui.base.Event} oEvent event object
	 * @private
	 */
	MiniMenu.prototype._onHoverExit = function (oEvent) {
		if (this.hoverTimeout) {
			clearTimeout(this.hoverTimeout);
			this.hoverTimeout = null;
		}
		if (this._closingTimeout) {
			clearTimeout(this._closingTimeout);
			this._closingTimeout = null;
		}
	};

	/**
	 *Called when user presses key on keyboard. Opens the MiniMenu for Keyboard Controls
	 @param {sap.ui.base.Event} oEvent the event which was fired
	 */
	MiniMenu.prototype._onKeyDown = function (oEvent) {
		if ((oEvent.keyCode === jQuery.sap.KeyCodes.F10) && (oEvent.shiftKey === true) && (oEvent.altKey === false) && (oEvent.ctrlKey === false)) {
			var oOverlay = sap.ui.getCore().byId(oEvent.currentTarget.id);

			if (oOverlay && oOverlay.isSelectable()) {
				oEvent.preventDefault();

				oEvent.clientX = oOverlay.$().offset().left + oOverlay.$().width() / 2;
				oEvent.clientY = oOverlay.$().offset().top + oOverlay.$().height() / 2;

				this._onContextMenu(oEvent);

			}
		}
	};

	/**
	 * Checks whether a new Minimenu should be opened
	 * @param {sap.ui.base.Event} oEvent event object
	 * @param {boolean} bOverwriteOpenValue should the check skip the test whether there is already a MiniMenu opened
	 * @param {boolean} onHover if true, the new overlay doesn't get stored in this._oCurrentOverlay
	 * @return {boolean} whether the check was sucessfull and a new MiniMenu should be opened
	 * @private
	 */
	MiniMenu.prototype._shouldMiniMenuOpen = function (oEvent, bOverwriteOpenValue, onHover) {
		if ((!this.isMenuOpeningLocked() || this._bTouched)) {
			if (!onHover) {
				this._oCurrentOverlay = sap.ui.getCore().byId(oEvent.currentTarget.id);
			}
			return true;
		} else {
			return false;
		}
	};

	/**
	 * Called when overflow button is pressed on MiniMenu
	 */
	MiniMenu.prototype._pressedOverflowButton = function () {

		if (!this._bTouched) {
			this.lockMenuOpening();
		}
		this.setFocusLock(true);
	};

	/**
	 * Called when MiniMenu gets closed
	 */
	MiniMenu.prototype._miniMenuClosed = function () {
		this._bTouched = false;
		this.unlockMenuOpening();
		this.setFocusLock(false);
	};

	/**
	 * Locks the Opening of the MiniMenu, no new one gets opened
	 * Note: should be called BEFORE a new MiniMenu is opened
	 * @param {boolean} bOverwriteOpenValue overwrites the "isOpen" value from the MiniMenuControl
	 */
	MiniMenu.prototype.lockMenuOpening = function (bOverwriteOpenValue) {
		if ((this.oMiniMenu.getPopover(true).isOpen() || this.oMiniMenu.getPopover(false).isOpen()) && bOverwriteOpenValue !== true) { //sometimes this function needs to be called after the old MiniMenu is closed
			this._bAsyncLock = true;
		} else {
			this._bOpeningLocked = true;
		}
	};

	/**
	 * Unlocks the Opening of the MiniMenu
	 */
	MiniMenu.prototype.unlockMenuOpening = function () {
		this._bOpeningLocked = false;
		if (this._bAsyncLock) {
			this.lockMenuOpening(true);
		}
		this._bAsyncLock = false;
		this.resetFocus();
	};

	/**
	 * @return {boolean} wether the Opening is locked or not
	 */
	MiniMenu.prototype.isMenuOpeningLocked = function () {
		return this._bOpeningLocked;
	};

	/**
	 * Locks/ Unlocks the focus reset
	 * @param {boolean} bIsLocked whether the Focus should be locked on the MiniMenu or not
	 */
	MiniMenu.prototype.setFocusLock = function (bIsLocked) {
		this._bFocusLocked = bIsLocked;
	};

	/**
	 * resets the focus to the Overlay
	 */
	MiniMenu.prototype.resetFocus = function () {
		if (!this._bFocusLocked && this._oCurrentOverlay && document.activeElement) { //IE sometimes doesn't get an active element and throws an error when trying to set focus
			if (!Device.os.ios) {
				this._oCurrentOverlay.focus();
			}
		}
	};

	/**
	 * checks wehther the given Overlay is selected, if not it does so
	 * @param {object} oOverlay the Overlay which should be checked for
	 */
	MiniMenu.prototype._ensureSelection = function (oOverlay) {
		if ((!this._bTouched || Device.os.ios) && oOverlay && !oOverlay.isSelected()) {
			oOverlay.setSelected(true);
		}
	};

	/**
	 * checks wether a Plugin locks the opening of a new MiniMenu
	 * @param {object} oOverlay the Overlay which should be checked for
	 * @return {boolean} true, if locked; false if not
	 */

	MiniMenu.prototype._checkForPluginLock = function () {

		//As long as Selection doesn't work correctly on ios we need to ensure that the MiniMenu opens even if a plugin mistakenly locks it
		if (Device.os.ios) {
			return false;
		}

		if (this._aPluginsWithBusyFunction.some(function (oPlugin) {
				return (typeof oPlugin.isBusy === "function" && oPlugin.isBusy());
			})) {
			return true;
		}

		this.setFocusLock(false);
		return false;
	};

	/**
	 * Adds single items to an array of groups
	 * @param {object} mMenuItem The menu item to add to a group
	 */
	MiniMenu.prototype._addMenuItemToGroup = function (mMenuItem) {

		var bGroupExists = this._aGroupedItems.some(function (_oGroupedItem) {

			if (_oGroupedItem.sGroupName === mMenuItem.group) {
				_oGroupedItem.aGroupedItems.push(mMenuItem);
				return true;
			}
		});

		if (!bGroupExists) {
			this._aGroupedItems.push({
				sGroupName: mMenuItem.group,
				aGroupedItems: [mMenuItem]
			});
		}
	};

	/**
	 * Adds a submenu to the list of submenus
	 * @param {object} mMenuItem The menu item to add to a group
	 * @param {sap.ui.base.Event} oEvent A event which was called on the Overlay
	 * @param {sap.ui.dt.Overlay} oOverlay The Overlay on which the MiniMenu was opened
	 */
	MiniMenu.prototype._addSubMenu = function (mMenuItem, oEvent, oOverlay) {

		mMenuItem.submenu.forEach(function (oSubMenuItem) {
			oSubMenuItem.handler = mMenuItem.handler;
		});

		mMenuItem.handler = function (sMenuItemId, oEvent, oOverlay, aOverlays, mPropertiesBag) {
			this._aSubMenus.some(function (_oMenuItem) {
				if (_oMenuItem.sSubMenuId === sMenuItemId) {
					_oMenuItem.aSubMenuItems.forEach(function (oSubMenuItem) {
						this.addMenuItem(oSubMenuItem, true, true);
					}.bind(this));
					return true;
				}
			}.bind(this));

			if (!this._bContextMenu) {
				oEvent.clientX = null;
				oEvent.clientY = null;
			}

			this.oMiniMenu.close();
			setTimeout(function () {
				this.open(oEvent, oOverlay, true, true);
			}.bind(this), 0);
			this.lockMenuOpening();

		}.bind(this, mMenuItem.id, oEvent, oOverlay);

		this._aSubMenus.push({
			sSubMenuId: mMenuItem.id,
			aSubMenuItems: mMenuItem.submenu
		});

		this.addMenuItem(mMenuItem, true);
	};

	/**
	 * Adds the grouped Button to the collapsed version of a MiniMenu
	 * @param {sap.ui.base.Event} oEvent A event which was called on the Overlay
	 * @param {sap.ui.dt.Overlay} oOverlay The Overlay on which the MiniMenu was opened
	 */
	MiniMenu.prototype._addItemGroupsToMenu = function (oEvent, oOverlay) {
		this._aGroupedItems.forEach(function (oGroupedItem, iIndex) {

			//If there is only one button that belongs to a group we don't need that group
			if (oGroupedItem.aGroupedItems.length === 1) {
				this.addMenuItem(oGroupedItem.aGroupedItems[0], true, false);
			} else {

				var fHandlerForGroupedButton = function (iIndex, oEvent, oOverlay) {

					this._aGroupedItems[iIndex].aGroupedItems.forEach(function (mMenuItem) {
						this.addMenuItem(mMenuItem, true, true);
					}.bind(this));

					oEvent.clientX = null;
					oEvent.clientY = null;

					this.oMiniMenu.close();
					setTimeout(function () {
						this.open(oEvent, oOverlay, true, true);
					}.bind(this), 0);
					this.lockMenuOpening();
				};

				this.addMenuItem({
						id: oGroupedItem.sGroupName + "-groupButton",
						enabled: true,
						text: oGroupedItem.sGroupName,
						icon: oGroupedItem.aGroupedItems[0].icon,
						rank: oGroupedItem.aGroupedItems[0].rank,
						handler: fHandlerForGroupedButton.bind(this, iIndex, oEvent, oOverlay)
				}, true);
			}
		}.bind(this));
	};

	return MiniMenu;

}, /* bExport= */ true);