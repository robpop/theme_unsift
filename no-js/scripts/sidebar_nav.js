/*

Hide and show the sidebar navigation
when the hamburger is clicked

*/

$(() => {
    let sideBarNav = document.getElementById("sideBarNav");
    let navHamburger = document.getElementById("navHamburger");

    // Toggle the sidebar nav when the hamburger icon is clicked with animate.css
    navHamburger.addEventListener("click", function(e){
        $(sideBarNav).css("display") == "none" ? $(sideBarNav).show() : 0;
        if( $(sideBarNav).hasClass("slideInRight") ) {
            $(sideBarNav).removeClass("slideInRight").addClass("slideOutRight");
            $(".-non-mobile").css("display") == "none" ? $("body").css("overflow-y", "visible") : 0;
        } else {
            $(sideBarNav).removeClass("slideOutRight").addClass("slideInRight");
            $(".-non-mobile").css("display") == "none" ? $("body").css("overflow-y", "hidden") : 0;
        }
    });

    $(window).resize(() => {
        if ( $(sideBarNav).hasClass("slideInRight") && $(".-non-mobile").css("display") == "none" ) {
            $("body").css("overflow-y", "hidden");
        } else {
            $("body").css("overflow-y", "visible");
        }
    });
});