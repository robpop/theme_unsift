/*

Perform some front-end validation on the password field
- should be at least 14 characters long
- should contain at least 1 number
- should contain at least 1 symbol

*/
"use strict";
$(() => {
    let signUpPassword = document.getElementById("signUpPassword");
    let signUpSubmit = document.getElementById("signUpSubmit");
    $(signUpPassword).keyup((e) => {
        if( $(e.target).val().length >= 14 && /\d/.test($(e.target).val()) && /([<>@!#$%^&*()_+[\]{}?:;|'\"\\,./~`\-=])+/g.test($(e.target).val()) )
            $(signUpSubmit).removeClass("disabled");
        else
            $(signUpSubmit).addClass("disabled");
    });
});