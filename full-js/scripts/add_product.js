"use strict";
function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#addProductUploadLogoAreaPreview').attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
}


$(() => {
    let addProductUploadFileAreaInput = document.getElementById("addProductUploadFileAreaInput");
    let addProductUploadFileAreaWrapper = document.getElementById("addProductUploadFileAreaWrapper");
    let addProductUploadFileName = document.getElementById("addProductUploadFileName");
    let addProductTagSearch = document.getElementById("addProductTagSearch");
    let addProductTagSearchLabel = document.getElementById("addProductTagSearchLabel");
    let addProductTagList = document.getElementById("addProductTagList");
    let addProductTagCount = document.getElementById("addProductTagCount");
    let addProductUploadLogoAreaInput = document.getElementById("addProductUploadLogoAreaInput");
    let addProductUploadLogoAreaPreview = document.getElementById("addProductUploadLogoAreaPreview");
    let addProductEnterBtn = document.getElementById("addProductEnterBtn");

    // Any existing tags for this product can be displayed by putting them 
    // in the data-tags attribute of the addProductTagSearch input element
    // found in add-product.html
    let tags = $(addProductTagSearch).attr("data-tags");

    // The maximum number of tags a product can have is set to 3 by default
    // You can modify the limit by changing the number max_tag_length below
    let max_tag_length = 3;
    
    // num_tag keeps track of the current number of tags the publisher has selected for their product
    let num_tag = 0;

    addProductUploadFileAreaInput.addEventListener("change", function(e) {
        if (e.target.value) {
            addProductUploadFileName.innerText = e.target.value.replace("C:\\fakepath\\", "");
            $(".upload_file").hide();
            $(".upload_file_done").show();
        } else {
            addProductUploadFileName.innerText = "";
            $(".upload_file_done").hide();
            $(".upload_file").show();
        }
    });

    addProductUploadLogoAreaInput.addEventListener("change", function(e) {
        if (e.target.value) {
            $(".upload_logo").hide();
            $(".upload_logo_done").show();
            readURL(addProductUploadLogoAreaInput);
        } else {
            $(".upload_logo").show();  
            $(".upload_logo_done").hide();
            $(addProductUploadLogoAreaPreview).attr("src", "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
        }
    });

    // Helper function that updates the maximum tag limit
    let update_tag_restraint = function(e) {

        num_tag = $(addProductTagList).find(".chosen-badge").length;
        $(addProductTagCount).find("span").text(num_tag);
        if(num_tag >= max_tag_length) {
            $(addProductTagSearch).prop("disabled", true);
            $(addProductTagSearchLabel).addClass("disabled");
        } else {
            $(addProductTagSearch).prop("disabled", false);
            $(addProductTagSearchLabel).removeClass("disabled");
        }

    };

    // Helper function used to create a new tag when:
    // ENTER key is pressed
    // ADD button is clicked
    // Autocomplete option is selected
    let create_new_tag = function(value, searchBar) {

        let tag = $(".badge-dummy").clone(true, true);
        $(tag).text(value);
        searchBar.val("");
        searchBar.autocomplete("close");
        $(tag).removeClass("badge-dummy").addClass("chosen-badge").appendTo(addProductTagList);

        $(addProductEnterBtn).addClass("d-none");
        searchBar.blur();

        update_tag_restraint();

    };

    // See: https://stackoverflow.com/questions/5643767/jquery-ui-autocomplete-width-not-set-correctly
    jQuery.ui.autocomplete.prototype._resizeMenu = function () {
        var ul = this.menu.element;
        ul.outerWidth(this.element.outerWidth());
    }
    //////////////////////////////////////////////

    // Create a tag when an item from the autocomplete form is selected
    $(addProductTagSearch).autocomplete({
        source: tags.split(" "),
        select: function( event, ui ) {
            event.preventDefault();
            
            // Prevent firing both the keyup event and the autocomplete select event
            if(event.key !== 'Enter' || event.keyCode !== 13) {
                
                create_new_tag(ui.item.value, $(addProductTagSearch));

            }
        }
    });

    // Create a tag when the enter key is pressed on the tag input field
    $(addProductTagSearch).on('keyup', function (e) {

        let searchBar = $(addProductTagSearch);

        // Show the ADD button - will add tag to selection if clicked
        if (searchBar.val().length > 0) {
            $(addProductEnterBtn).removeClass("d-none");
        } else {
            $(addProductEnterBtn).addClass("d-none");
        }

        // Alternatively, if ENTER key is pressed - add tag to selection
        if (e.key === 'Enter' || e.keyCode === 13) {
            
            create_new_tag(searchBar.val(), searchBar);

        }

    });

    // Create a tag when the ADD button is clicked
    $(addProductEnterBtn).click(() => {

        create_new_tag($(addProductTagSearch).val(), $(addProductTagSearch));

    });

    // Remove tag when one is clicked
    $(addProductTagList).children().click((e) => {

        $(e.target).remove();

        update_tag_restraint();

    });

});