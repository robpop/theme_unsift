"use strict";
$(() => {

    // check for dark theme in local storage and set css attribute on body element accordingly
    let darkThemeSelected = (localStorage.getItem("darkTheme") !== null && localStorage.getItem("darkTheme") === "dark");
    darkThemeSelected ? document.body.setAttribute("data-theme", "dark") : document.body.removeAttribute("data-theme");

});