/*

Show a loading screen when grabbing product data

*/
"use strict";
$(window).on("load", () => {
    let majorPlatformLoaderOverlay = document.getElementById("majorPlatformLoaderOverlay");
    
    // Hide loading screen after page content loads + 750 milliseconds
    setTimeout(() => {
        $(majorPlatformLoaderOverlay).addClass("fadeOut");
    }, 750);

    majorPlatformLoaderOverlay.addEventListener('animationend', () => {
        $(majorPlatformLoaderOverlay).hide();    
    });
});