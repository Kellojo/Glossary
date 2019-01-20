
function NavContainer(domRef) {

    //settings
    this.animationDuration = 500;

    //private properties
    this.history = [];
    this.currentPage = null;
    this.domRef = domRef;
    this.isNavigating = false;
    
    this.back = function() {
        if (this.isNavigating) {
            return false;
        }

        var previousItem = this.history[history.length - 1];
        if (previousItem) {
            var previousPage = $("#" + previousItem);

            //animate out the current page
            if (this.currentPage) {
                this.currentPage.show();
                this._removeNavClassesFromElement(this.currentPage);
                this.currentPage.addClass("navedAwayFrom");
            }

            //animate in the new element
            previousPage.show();
            previousPage.addClass("navLeft");

            //handle after navigation events
            this.navTimeout = setTimeout(function (oldPage, newPage) {
                if (oldPage) {
                    oldPage.hide();
                    this._removeNavClassesFromElement(oldPage);
                }

                newPage.show();
                this.isNavigating = false;
            }.bind(this, this.currentPage, previousPage), this.animationDuration);


            //update history and current page
            this.history.pop();
            this.currentPage = previousPage;
        }
    };

    this.navigateTo = function(sId) {

        if (this.isNavigating) {
            return false;
        }

        var childPage = this.domRef.find("#" + sId);
        if (childPage && !childPage.is(this.currentPage)) {
            this.isNavigating = true;

            //animate out the previous page
            if (this.currentPage) {
                this.currentPage.show();
                this._removeNavClassesFromElement(this.currentPage);
                this.currentPage.addClass("navedAwayFrom");
            }
            //animate in the new element
            childPage.show();
            childPage.addClass("navLeft");

            //handle after navigation events
            this.navTimeout = setTimeout(function(oldPage, newPage) {
                if (oldPage) {
                    oldPage.hide();
                    this._removeNavClassesFromElement(oldPage);
                }

                newPage.show();
                this.isNavigating = false;
            }.bind(this, this.currentPage, childPage), this.animationDuration);

            //store the navigation in the history
            this.history.push(sId);
            this.currentPage = childPage;
        } else {

            if (!childPage.is(this.currentPage)) {
                console.error("Control with id '" + sId + "' could not be found as child of the nav container");
            }
        }

    };

    this._removeNavClassesFromElement = function(oElement) {
        oElement.removeClass("navedAwayFrom");
        oElement.removeClass("navRight");
        oElement.removeClass("navLeft");
        oElement.removeClass("showInstantly");
    };

    this._showFirstElement = function() {

        var oChildren = this.domRef.children();
        if (oChildren.length > 0) {
            $(oChildren[0]).addClass("showInstantly");
        }
    }


    this._showFirstElement();
};