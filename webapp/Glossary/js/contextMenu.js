var selectedElement = null;

/* binds the context menu to the table */
function addContextMenuListener() {
	$("#table").bind("contextmenu", function(event) {
	    event.preventDefault();
	    selectedElement = event.target;
	    $("ul.contextMenu")
	        .show()
	        .css({top: event.pageY + 15, left: event.pageX + 10});
	});
}

/* Closes the context menu */
$(document).click(function() {
  	isHovered = $("ul.contextMenu").is(":hover");
  	if (isHovered == false){
    	$("ul.contextMenu").fadeOut("fast");
  	}
});
