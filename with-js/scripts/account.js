"use strict";
function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#accountUploadLogoAreaPreview').attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
}

$(() => {
    let accountUploadLogoAreaInput = document.getElementById("accountUploadLogoAreaInput");
    let accountUploadLogoAreaWrapper = document.getElementById("accountUploadLogoAreaWrapper");
    let accountUploadLogoAreaPreview = document.getElementById("accountUploadLogoAreaPreview");

    let accountNameFirstInput = document.getElementById("accountNameFirstInput");
    let accountNameFirstInputLabel = document.getElementById("accountNameFirstInputLabel");
    let accountNameLastInput = document.getElementById("accountNameLastInput");
    let accountNameLastInputLabel = document.getElementById("accountNameLastInputLabel");
    let current_fname = $(accountNameFirstInput).attr("data-current-fname");
    let current_lname = $(accountNameLastInput).attr("data-current-lname");

    let accountEmailInput = document.getElementById("accountEmailInput");
    let accountEmailInputLabel = document.getElementById("accountEmailInputLabel");
    let current_email = $(accountEmailInput).attr("data-current-email");

    let accountDeleteInput = document.getElementById("accountDeleteInput");
    let accountDeleteButton = document.getElementById("accountDeleteButton");

    let accountPasswordInput = document.getElementById("accountPasswordInput");
    let accountPasswordRetypeInput = document.getElementById("accountPasswordRetypeInput");
    let accountPasswordButton = document.getElementById("accountPasswordButton");

    let accountNSFWVerify = document.getElementById("accountNSFWVerify");
    let accountNSFWButton = document.getElementById("accountNSFWButton");

    let accountSettingsDarkTheme = document.getElementById("accountSettingsDarkTheme");

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

    // Check for existing first and last name from attributes data-current-fname and data-current-lname
    if (typeof current_fname !== typeof undefined && current_fname !== false && current_fname !== "") {
        $(accountNameFirstInput).attr("placeholder", current_fname);
        $(accountNameFirstInputLabel).addClass("active");
    }

    if (typeof current_lname !== typeof undefined && current_lname !== false && current_lname !== "") {
        $(accountNameLastInput).attr("placeholder", current_lname);
        $(accountNameLastInputLabel).addClass("active");
    }

    // Check for existing email from attribute data-current-email
    if (typeof current_email !== typeof undefined && current_email !== false && current_email !== "") {
        $(accountEmailInput).attr("placeholder", current_email);
        $(accountEmailInputLabel).addClass("active");
    }

    $(accountDeleteInput).keyup((e) => {
        $(e.target).val().length >= 14 ? $(accountDeleteButton).removeClass("disabled") : $(accountDeleteButton).addClass("disabled");
    });


    // Disable and enable update password button when password is long enough and if it matches retype password
    $(accountPasswordInput).keyup((e) => {
        if ( $(e.target).val().length >= 14 && $(e.target).val() === $(accountPasswordRetypeInput).val() && /\d/.test($(e.target).val()) && /([<>@!#$%^&*()_+[\]{}?:;|'\"\\,./~`\-=])+/g.test($(e.target).val()) ) {
            $(accountPasswordButton).removeClass("disabled");
        } else {
            $(accountPasswordButton).addClass("disabled");
        }
    });
    $(accountPasswordRetypeInput).keyup((e) => {
        if ( $(accountPasswordInput).val().length >= 14 && $(e.target).val() === $(accountPasswordInput).val() && /\d/.test($(accountPasswordInput).val()) && /([<>@!#$%^&*()_+[\]{}?:;|'\"\\,./~`\-=])+/g.test($(accountPasswordInput).val()) ) {
            $(accountPasswordButton).removeClass("disabled");
        } else {
            $(accountPasswordButton).addClass("disabled");
        }
    });


    // Disable and enable NSFW toggle button when verify checkbox is changed
    $(accountNSFWVerify).change((e) => {
        e.target.checked ? $(accountNSFWButton).removeClass("disabled") : $(accountNSFWButton).addClass("disabled");
    });


    // Handle when dark theme toggle switch is clicked
    $(accountSettingsDarkTheme).click(() => {

        if((localStorage.getItem('darkTheme') !== null && localStorage.getItem('darkTheme') === 'dark')) { // dark theme has been selected
            document.body.removeAttribute('data-theme');
            localStorage.removeItem('darkTheme'); // reset theme selection 
            $(accountSettingsDarkTheme).text("Turn On");
            $(accountSettingsDarkTheme).removeClass("enabled");
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('darkTheme', 'dark'); // save theme selection 
            $(accountSettingsDarkTheme).text("Turn Off");
            $(accountSettingsDarkTheme).addClass("enabled");
        }

    });

    // update toggle switch
    if((localStorage.getItem('darkTheme') !== null && localStorage.getItem('darkTheme') === 'dark')) {
        $(accountSettingsDarkTheme).text("Turn Off");
        $(accountSettingsDarkTheme).addClass("enabled");
    } else {
        $(accountSettingsDarkTheme).text("Turn On");
        $(accountSettingsDarkTheme).removeClass("enabled");
    }
});