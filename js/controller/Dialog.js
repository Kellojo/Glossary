
function DialogController(oElement) {
    this.element = oElement;

    /**
     * Closes this dialog
     * @public
     */
    this.close = function() {
        this.onExit();
        this.element.parentNode.removeChild(this.element);
    };

    /**
     * Called right before destroying this control
     */
    this.onExit = function() {

    };

};