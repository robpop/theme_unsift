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
        $(sideBarNav).hasClass("slideInRight") ? $(sideBarNav).removeClass("slideInRight").addClass("slideOutRight") : $(sideBarNav).removeClass("slideOutRight").addClass("slideInRight");
    });
});