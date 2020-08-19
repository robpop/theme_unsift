/*

Pull the product information from the card and 
display it in the modal when the modal is clicked

*/

$(() => {
    let cards = document.getElementsByClassName("card");
    let action_modal = document.getElementById("actionModal");
    let modal_logo = document.getElementById("actionModalLogo");
    let modal_tags = document.getElementById("actionModalBodyTags").getElementsByTagName("span");
    let modal_rating = document.getElementById("actionModalRating");
    let model_reviews_btn = document.getElementById("actionModalShowReviews");
    let modal_main_btn = document.getElementById("actionModalShowMain");

    let modal_main_view = document.getElementById("actionModalMain");
    let modal_reviews_view = document.getElementById("actionModalReviews");

    let star_full = "<svg width='1.2em' height='1.2em' viewBox='0 0 16 16' class='bi bi-star-fill m-1' fill='#4285F4' xmlns='http://www.w3.org/2000/svg'><path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z'/></svg>";
    let star_half = "<svg width='1.2em' height='1.2em' viewBox='0 0 16 16' class='bi bi-star-half m-1' fill='#4285F4' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M5.354 5.119L7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.519.519 0 0 1-.146.05c-.341.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.171-.403.59.59 0 0 1 .084-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027c.08 0 .16.018.232.056l3.686 1.894-.694-3.957a.564.564 0 0 1 .163-.505l2.906-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.002 2.223 8 2.226v9.8z'/></svg>";
    let star_empty = "<svg width='1.2em' height='1.2em' viewBox='0 0 16 16' class='bi bi-star m-1' fill='#4285F4' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z'/></svg>";
        

    // Fill product modal with corresponding information from clicked card
    let update_modal_information = function(e) {
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
    
});