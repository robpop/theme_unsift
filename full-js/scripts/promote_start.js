"use strict";

$(() => {

    let mobile_text_width_setter = document.getElementsByClassName("-mobile-text-width-setter");
    let mobile_text_width_getter = document.getElementsByClassName("-mobile-text-width-getter");

    $(mobile_text_width_setter).eq(0).width($(mobile_text_width_getter).eq(0).width());
    $(mobile_text_width_setter).eq(1).width($(mobile_text_width_getter).eq(1).width());

    $(window).resize(() => {
        $(mobile_text_width_setter).eq(0).width($(mobile_text_width_getter).eq(0).width());
        $(mobile_text_width_setter).eq(1).width($(mobile_text_width_getter).eq(1).width());
    });
});