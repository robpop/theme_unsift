"use strict";
$(() => {

    let cookieNotice = document.getElementById("cookieNotice");
    let cookieNoticeAcceptBtn = document.getElementById("cookieNoticeAccept");
    // check if cookie notice was shown (if this is the first page load) in local storage and show if not
    let cookieNoticeAccepted = (localStorage.getItem("cookieShown") !== null && localStorage.getItem("cookieShown") === "true");
    if(!cookieNoticeAccepted) {
        $(cookieNotice).show();
    }

    // don't show cookie notice again once the "Accept & Close" button is clicked
    cookieNoticeAcceptBtn.addEventListener("click", function() {
        localStorage.setItem("cookieShown", "true");
        $(cookieNotice).hide();
    });


});