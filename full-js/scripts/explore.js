"use strict";

// This input sanitization function is only a front-end protection
// A back-end, server-sided input validation scheme should be used as well
// This function should not be 100% relied on
// You can add your own sanitization logic here as needed
function sanitize_search(term) {
    // escape() is a Validator.js function
    let clean = validator.escape(term.trim());
    return clean;
}

// Fill product modal with corresponding information from clicked card
let update_modal_information = function(e) {
    let modal_logo = document.getElementById("actionModalLogo");
    let modal_preview_image = document.getElementById("actionModalPreviewImage");
    let modal_tags = document.getElementById("actionModalBodyTags").getElementsByTagName("span");
    let modal_rating = document.getElementById("actionModalRating");

    let star_full = "<svg width='1.2em' height='1.2em' viewBox='0 0 16 16' class='bi bi-star-fill m-1' fill='#4285F4' xmlns='http://www.w3.org/2000/svg'><path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z'/></svg>";
    let star_half = "<svg width='1.2em' height='1.2em' viewBox='0 0 16 16' class='bi bi-star-half m-1' fill='#4285F4' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M5.354 5.119L7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.519.519 0 0 1-.146.05c-.341.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.171-.403.59.59 0 0 1 .084-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027c.08 0 .16.018.232.056l3.686 1.894-.694-3.957a.564.564 0 0 1 .163-.505l2.906-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.002 2.223 8 2.226v9.8z'/></svg>";
    let star_empty = "<svg width='1.2em' height='1.2em' viewBox='0 0 16 16' class='bi bi-star m-1' fill='#4285F4' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z'/></svg>";
        
    document.getElementById("actionModalTitle").innerText = e.target.querySelector(".card-title").innerText;
    document.getElementById("actionModalBody").innerText = e.target.querySelector(".card-text").innerText;

    // Set tags associated with product
    $(modal_tags).text("");
    let tags = e.target.getAttribute("data-tags").split(" ");
    let tags_length = tags.length;
    for (let i = 0; i < tags_length; ++i) {
        $(modal_tags[i]).text(tags[i]);
    }

    // Set logo associated with product
    let logo = e.target.getAttribute("data-logo");
    $(modal_logo).attr("src", logo);

    // If using a preview image with Lightbox - set the Lightbox image as well
    if ($(modal_preview_image).length) {
        $(modal_preview_image).attr("href", logo);
        refreshFsLightbox();
    }

    // Set star rating associated with product
    $(modal_rating).empty();
    let rating = e.target.getAttribute("data-rating");
    for (let i = 0; i < Math.floor(rating); ++i) {
        $(modal_rating).append(star_full);
    }
    rating % 1 != 0 ? $(modal_rating).append(star_half) : 0;
    for (let i = 0; i < 5; ++i) {
        $(modal_rating).children().eq(i).length == 0 ? $(modal_rating).append(star_empty) : 0;
    }
};

function LoadMoreContent(contentLoadingZoneLoader) {

    // Replace this placeholder code with your own loading logic i.e. Ajax + API calls
    /////////// YOUR LOADING LOGIC HERE ///////////
    let children = $("#exploreSection").find(".grid").children().slice(0,17).clone(true, true);
    console.log(children);
    for (let i = 0; i < children.length; ++i) {
        children[i].addEventListener('click', update_modal_information, false);
    }
    $("#exploreSection").find(".grid").append(children).masonry('appended', children);
    ///////////////////////////////////////////////
    
    // hide loader once content is loaded in
    $(contentLoadingZoneLoader).css("display", "none");

}

$(() => {
    let cards = document.getElementsByClassName("product-card");
    let action_modal = document.getElementById("actionModal");
    
    let model_reviews_btn = document.getElementById("actionModalShowReviews");
    let modal_main_btn = document.getElementById("actionModalShowMain");

    let modal_main_view = document.getElementById("actionModalMain");
    let modal_reviews_view = document.getElementById("actionModalReviews");

    let exploreSearchBar = document.getElementById("exploreSearchBar");
    let exploreSearchLoader = document.getElementsByClassName("exploreSearchLoader")[0];

    let sideBar = document.getElementById("sideBar");
    let body = document.getElementsByTagName("body")[0];
    let exploreMobileExpandSideBar = document.getElementById("exploreMobileExpandSideBar");
    let hammertime_body = null;
    let hammertime_sideBar = null
    let sideBarOpen = null;

    let contentLoadingZone = document.getElementById("contentLoadingZone");
    let contentLoadingZoneLoader = $(contentLoadingZone).find("#majorPlatformLoaderWrapper");

    let $win = $(window);
    let $doc = $(document);

    $('#exploreSection .grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        gutter: 20,
        percentPosition: true
    });

    // Attach click event to each card
    for (let i = 0; i < cards.length; ++i)
        cards[i].addEventListener('click', update_modal_information, false);

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

    // Don't remove this - resizes autocomplete box to fit width of search bar
    jQuery.ui.autocomplete.prototype._resizeMenu = function () {
        var ul = this.menu.element;
        ul.outerWidth(this.element.outerWidth());
    };

    // Autocomplete functionality for search bar
    $(exploreSearchBar).autocomplete({
        source: function(request, response) {
            $.ajax({
                dataType: "json",
                type : 'GET',
                // Replace url with your own search terms API
                url: 'https://api.publicapis.org/entries?title='+sanitize_search($(exploreSearchBar).val())+'&https=true',
                /////////////////////////////////////////////
                success: function(data) {
                    // hide search bar loader
                    $(exploreSearchLoader).css("visibility", "hidden");

                    let source_data = [];

                    let i = 0;
                    for (i; i < data.count; ++i) {
                        // Replace "entries" and "API" with your desired JSON keys
                        source_data.push(data.entries[i].API);
                    }

                    response(source_data);
                },
                error: function(data) {
                    $(exploreSearchLoader).css("visibility", "hidden");
                }
            });
        },
        search: function(event, ui) {
            // show search bar loader when search term is entered
            $(exploreSearchLoader).css("visibility", "visible");
        }
    });


    // Load more content when contentLoadingZone is scrolled down to
    $win.scroll(() => {
        if($win.height() + $win.scrollTop() >= $doc.height() - $(contentLoadingZone).height()) {
            // show loader
            $(contentLoadingZoneLoader).css("display", "flex");

            // load in more content
            LoadMoreContent(contentLoadingZoneLoader);
        }
    });


    // Enable swipe events on side bar when mobile
    if ($(".-mobile").css("display") !== "none") {
        sideBarOpen = false;
        hammertime_body = new Hammer(body);
        hammertime_body.on('swiperight', function(ev) {
            // open sideBar
            $("body").css({
                "position":"fixed",
                "overflow":"hidden"
            });
            $(sideBar).addClass("show");
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
            $("body").css({
                "position":"",
                "overflow":""
            });
            $(sideBar).removeClass("show");
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
                $("body").css({
                    "position":"",
                    "overflow":""
                });
                $(sideBar).removeClass("show");
                $(sideBar).find(".col-lg-12").removeClass("show");
                $(sideBar).find(".list-group-item").removeClass("show");
                $(exploreMobileExpandSideBar).children().eq(1).addClass("d-none");
                $(exploreMobileExpandSideBar).children().eq(0).removeClass("d-none");
                $(exploreMobileExpandSideBar).removeClass("close");
                $(body).removeClass("noscroll");
                sideBarOpen = false;
            } else {
                $("body").css({
                    "position":"fixed",
                    "overflow":"hidden"
                });
                $(sideBar).addClass("show");
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