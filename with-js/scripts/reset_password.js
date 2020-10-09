"use strict";
$(() => {
    let resetPasswordSubmit = document.getElementById("resetPasswordSubmit");
    let resetPasswordNew = document.getElementById("resetPasswordNew");
    let resetPasswordNewRetype = document.getElementById("resetPasswordNewRetype");

    // Disable and enable update password button when password is long enough and if it matches retype password
    $(resetPasswordNew).keyup((e) => {
        if ( $(e.target).val().length >= 14 && $(e.target).val() === $(resetPasswordNewRetype).val() && /\d/.test($(e.target).val()) && /([<>@!#$%^&*()_+[\]{}?:;|'\"\\,./~`\-=])+/g.test($(e.target).val()) ) {
            $(resetPasswordSubmit).removeClass("disabled");
        } else {
            $(resetPasswordSubmit).addClass("disabled");
        }
    });
    $(resetPasswordNewRetype).keyup((e) => {
        if ( $(resetPasswordNew).val().length >= 14 && $(e.target).val() === $(resetPasswordNew).val() && /\d/.test($(resetPasswordNew).val()) && /([<>@!#$%^&*()_+[\]{}?:;|'\"\\,./~`\-=])+/g.test($(resetPasswordNew).val()) ) {
            $(resetPasswordSubmit).removeClass("disabled");
        } else {
            $(resetPasswordSubmit).addClass("disabled");
        }
    });
});