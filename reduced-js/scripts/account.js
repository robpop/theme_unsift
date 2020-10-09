"use strict";
function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#accountUploadLogoAreaPreview')
          .attr('src', e.target.result)
      };
      reader.readAsDataURL(input.files[0]);
    }
}

$(() => {
    let accountUploadLogoAreaInput = document.getElementById("accountUploadLogoAreaInput");
    let accountUploadLogoAreaWrapper = document.getElementById("accountUploadLogoAreaWrapper");
    let accountUploadLogoAreaPreview = document.getElementById("accountUploadLogoAreaPreview");

    accountUploadLogoAreaInput.addEventListener("mouseover", function(e) {
        $(accountUploadLogoAreaWrapper).css("background-color", "#f5f5f5");
    });
    accountUploadLogoAreaInput.addEventListener("mouseout", function(e) {
        $(accountUploadLogoAreaWrapper).css("background-color", "");
    });

    accountUploadLogoAreaInput.addEventListener("change", function(e) {
        if (e.target.value) {
          $(".upload_logo").hide();
          $(".upload_logo_done").show();
          readURL(accountUploadLogoAreaInput);
        } else {
          $(".upload_logo").show();  
          $(".upload_logo_done").hide();
          $(accountUploadLogoAreaPreview).attr("src", "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
        }
    });
});