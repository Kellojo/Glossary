/*
  This file contains some wrapper functions for the NotifyIf plugin
  GitHub: https://github.com/naoxink/notifIt
*/


/* Shows a success message */
function showSuccessNotf(text) {
  if (text == null) {
    text = "Erfolgreich!";
  }
  text = "<b>" + text + "</b>";

  notif({
  	msg: text,
  	type: "success",
  	position: "right",
    autohide: true,
    opacity: 0.8,
    fade: true,
    timeout: 2000,
    bgcolor: "#4e8c25"
  });
}

/* Shows an error message */
function showErrorNotf(text) {
  if (text == null) {
    text = "Ein Fehler ist aufgetreten!";
  }
  text = "<b>" + text + "</b>";

  notif({
  	msg: text,
  	type: "error",
  	position: "right",
    autohide: true,
    opacity: 0.8,
    fade: true,
    timeout: 2000,
    bgcolor: "#932410"
  });
}
