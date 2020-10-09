/*

Pull the product information from the card and 
display it in the modal when the modal is clicked

*/
"use strict";
$(() => {
    let action_modal = document.getElementById("actionModal");
    let model_reviews_btn = document.getElementById("actionModalShowReviews");
    let modal_main_btn = document.getElementById("actionModalShowMain");

    let modal_main_view = document.getElementById("actionModalMain");
    let modal_reviews_view = document.getElementById("actionModalReviews");

    let sideBar = document.getElementById("sideBar");
    let body = document.getElementsByTagName("body")[0];
    let exploreMobileExpandSideBar = document.getElementById("exploreMobileExpandSideBar");
    let hammertime_body = null;
    let hammertime_sideBar = null
    let sideBarOpen = null;

    model_reviews_btn.addEventListener("click", function(e) {
        $(modal_main_view).hide();
        $(modal_reviews_view).show();

        // Set height of scrollable comments section based on modal height
        $("#actionModalReviewsRightPanel").css("height", $("#actionModalReviewsLeftPanel").height()).show();
    });

    modal_main_btn.addEventListener("click", function(e) {
        $(modal_reviews_view).hide();
        $(modal_main_view).show();

        $("#actionModalReviewsRightPanel").hide();
        $("#actionModalReviewsDraft").val("");
        $("#actionModalReviewsDraft").blur();
    });

    $(action_modal).on('hidden.bs.modal', function(){
        $(modal_reviews_view).hide();
        $(modal_main_view).show();

        $("#actionModalReviewsRightPanel").hide();
        $("#actionModalReviewsDraft").val("");
        $("#actionModalReviewsDraft").blur();
    });


    // Enable swipe events on side bar when mobile
    if ($(".-mobile").css("display") !== "none") {
        sideBarOpen = false;
        hammertime_body = new Hammer(body);
        hammertime_body.on('swiperight', function(ev) {
            // open sideBar
            $(sideBar).addClass("show")
            $(sideBar).find(".col-lg-12").addClass("show");
            $(sideBar).find(".list-group-item").addClass("show");
            $(exploreMobileExpandSideBar).children().eq(0).addClass("d-none");
            $(exploreMobileExpandSideBar).children().eq(1).removeClass("d-none");
            $(exploreMobileExpandSideBar).addClass("close");
            $(body).addClass("noscroll");
            sideBarOpen = true;
        });
        hammertime_sideBar = new Hammer(sideBar);
        hammertime_sideBar.on('swipeleft', function(ev) {
            // close sideBar
            $(sideBar).removeClass("show")
            $(sideBar).find(".col-lg-12").removeClass("show");
            $(sideBar).find(".list-group-item").removeClass("show");
            $(exploreMobileExpandSideBar).children().eq(1).addClass("d-none");
            $(exploreMobileExpandSideBar).children().eq(0).removeClass("d-none");
            $(exploreMobileExpandSideBar).removeClass("close");
            $(body).removeClass("noscroll");
            sideBarOpen = false;
        });

        $(exploreMobileExpandSideBar).click(() => {
            if (sideBarOpen) {
                $(sideBar).removeClass("show")
                $(sideBar).find(".col-lg-12").removeClass("show");
                $(sideBar).find(".list-group-item").removeClass("show");
                $(exploreMobileExpandSideBar).children().eq(1).addClass("d-none");
                $(exploreMobileExpandSideBar).children().eq(0).removeClass("d-none");
                $(exploreMobileExpandSideBar).removeClass("close");
                $(body).removeClass("noscroll");
                sideBarOpen = false;
            } else {
                $(sideBar).addClass("show")
                $(sideBar).find(".col-lg-12").addClass("show");
                $(sideBar).find(".list-group-item").addClass("show");
                $(exploreMobileExpandSideBar).children().eq(0).addClass("d-none");
                $(exploreMobileExpandSideBar).children().eq(1).removeClass("d-none");
                $(exploreMobileExpandSideBar).addClass("close");
                $(body).addClass("noscroll");
                sideBarOpen = true;
            }
            
        });
    }
    
});