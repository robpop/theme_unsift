"use strict";
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
    let addProductUploadFileName = document.getElementById("addProductUploadFileName");
    let addProductUploadLogoAreaInput = document.getElementById("addProductUploadLogoAreaInput");
    let addProductUploadLogoAreaPreview = document.getElementById("addProductUploadLogoAreaPreview");

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
});