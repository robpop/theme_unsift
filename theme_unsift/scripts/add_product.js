function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#addProductUploadLogoAreaPreview')
          .attr('src', e.target.result)
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
    let addProductUploadLogoAreaWrapper = document.getElementById("addProductUploadLogoAreaWrapper");
    let addProductUploadLogoAreaPreview = document.getElementById("addProductUploadLogoAreaPreview");

    // Grab the already existing tags to show in autocomplete from data-tags
    let tags = $(addProductTagSearch).attr("data-tags");
    let max_tag_length = 3;
    let num_tag = 0;

    addProductUploadFileAreaInput.addEventListener("mouseover", function(e) {
        $(addProductUploadFileAreaWrapper).css("background-color", "#f5f5f5");
    });
    addProductUploadFileAreaInput.addEventListener("mouseout", function(e) {
        $(addProductUploadFileAreaWrapper).css("background-color", "");
    });
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


    addProductUploadLogoAreaInput.addEventListener("mouseover", function(e) {
        $(addProductUploadLogoAreaWrapper).css("background-color", "#f5f5f5");
    });
    addProductUploadLogoAreaInput.addEventListener("mouseout", function(e) {
        $(addProductUploadLogoAreaWrapper).css("background-color", "");
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
                let tag = $(".badge-dummy").clone(true, true);
                $(tag).text(ui.item.value);
                $(addProductTagSearch).val("");
                $(addProductTagSearch).autocomplete("close");
                $(tag).removeClass("badge-dummy").addClass("chosen-badge").appendTo(addProductTagList);

                update_tag_restraint();
            }
        }
    });

    // Create a tag when the enter key is pressed on the tag input field
    $(addProductTagSearch).on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            let tag = $(".badge-dummy").clone(true, true);
            $(tag).text($(addProductTagSearch).val());
            $(addProductTagSearch).val("");
            $(addProductTagSearch).autocomplete("close");
            $(tag).removeClass("badge-dummy").addClass("chosen-badge").appendTo(addProductTagList);

            update_tag_restraint();
        }
    });

    // Remove tag when one is clicked
    $(addProductTagList).children().click((e) => {
        $(e.target).remove();

        update_tag_restraint();
    });

});