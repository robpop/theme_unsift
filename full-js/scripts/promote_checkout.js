"use strict";

$(() => {
    
    let advertiseProductSelected = $("#advertiseProductSelected");
    let advertiseProductSelection = $("#advertiseProductSelection");

    let advertiseBudgetInput = $("#advertiseBudgetInput");
    let advertiseBudgetSlider = $("#advertiseBudgetSlider");
    let advertiseTotalCost = $("#advertiseTotalCost");
    let advertiseTotalClicks = $("#advertiseTotalClicks");

    let advertiseStep1 = $("#advertiseStep1");
    let advertiseStep2 = $("#advertiseStep2");
    let advertiseStep3 = $("#advertiseStep3");

    let advertiseStepWrapper0 = $("#advertiseStepWrapper0");
    let advertiseStepWrapper1 = $("#advertiseStepWrapper1");
    let advertiseStepWrapper2 = $("#advertiseStepWrapper2");

    let advertiseMobileStepper = $("#advertiseMobileStepper");
    let advertiseMobileStepperText = $("#advertiseMobileStepperText");

    // This indicates the current step the user is on when purchasing ad space for their product
    // Step 0: pick a product to advertise
    // Step 1: select a budget
    // Step 2: Stripe checkout
    let current_step = 0;

    let next_btns = $(".next_step");
    let back_btns = $(".back_step");

    let advertiseOrderSummaryProduct = $("#advertiseOrderSummaryProduct");
    let advertiseOrderSummaryClicks = $("#advertiseOrderSummaryClicks");
    let advertiseOrderSummaryTotal = $("#advertiseOrderSummaryTotal");

    // These currency denominations are supported by default
    // You can add any denomination you need for your platform to the map below
    // Once you add the denomination to this map, modify the attribute data-denomination for the input element advertiseBudgetInput to change the currency symbol shown
    let denominations = {
        "USD": "\u0024",
        "EUR": "\u20AC",
        "GBP": "\u00A3",
        "JPY": "\u00A5",
        "AUD": "\u0024",
        "CAD": "\u0024",
        "CNY": "\u00A5",
        "RUB": "\u20bd",
        "INR": "\u20B9"
    };

    // Use a maximum budget of $5,000 by default
    // Change this to fit with your platform's needs
    let maximum_budget = 5000;
    let minimum_budget = 0;


    let selected_denomination = denominations[advertiseBudgetInput.attr("data-denomination")];
    let update_cost_clicks = null;

    // This is the number of clicks a buyer gets per $1
    // Change this to fit with your platform's needs
    let clicks_unit_multiplier = 15;


    String.prototype.removeCharAt = function (i) {
        var tmp = this.split('');
        tmp.splice(i - 1 , 1);
        return tmp.join('');
    }


    let update_checkout_price = function(clicks, price) {
        advertiseOrderSummaryClicks.text(clicks);
        advertiseOrderSummaryTotal.text(price);
    }


    let sync_input_slider = function(is_slider) {
        if (is_slider) {
            // sync input
            advertiseBudgetInput.val(selected_denomination+advertiseBudgetSlider.val());
        } else {
            // sync slider
            advertiseBudgetSlider.val(advertiseBudgetInput.val().substr(1));
        }

        update_checkout_price(numeral(parseInt(advertiseBudgetInput.val().substr(1))*clicks_unit_multiplier).format('0,0'), numeral(parseInt(advertiseBudgetInput.val().substr(1))).format('0,0'));

        window.clearTimeout(update_cost_clicks);
        update_cost_clicks = setTimeout(() => {
            advertiseTotalCost.parent().removeClass("fadeInUp delay-150ms");
            advertiseTotalClicks.parent().removeClass("fadeInUp");
            advertiseTotalCost.parent().addClass("fadeOutDown");
            advertiseTotalClicks.parent().addClass("fadeOutDown delay-150ms");
            setTimeout(() => {
                advertiseTotalCost.text(numeral(parseInt(advertiseBudgetInput.val().substr(1))).format('0,0'));
                advertiseTotalClicks.text(numeral(parseInt(advertiseBudgetInput.val().substr(1))*clicks_unit_multiplier).format('0,0'));
                advertiseTotalCost.parent().removeClass("fadeOutDown");
                advertiseTotalClicks.parent().removeClass("fadeOutDown delay-150ms");
                advertiseTotalCost.parent().addClass("fadeInUp delay-150ms");
                advertiseTotalClicks.parent().addClass("fadeInUp");
            }, 700);
        }, 500);
    }
    
    let format_budget_input = function() {
        if (advertiseBudgetInput.val().length < 2) {        
            advertiseBudgetInput.val(selected_denomination);
            advertiseBudgetSlider.val(minimum_budget);
            sync_input_slider(true);
        }
    };

    $(document).on("input", "#advertiseBudgetSlider", () => {
        format_budget_input();
        sync_input_slider(true);
    });

    $(document).on("input", "#advertiseBudgetInput", (e) => {
        if (e.originalEvent.data && !Number.isInteger(parseInt(e.originalEvent.data))) {
            advertiseBudgetInput.val(advertiseBudgetInput.val().substr(0, advertiseBudgetInput.val().indexOf(e.originalEvent.data)));
        }
        
        // Enforce maximum and minimum budget selections here
        if (parseInt(advertiseBudgetInput.val().substr(1)) > maximum_budget) {
            advertiseBudgetInput.val(selected_denomination+maximum_budget);
        } else if (parseInt(advertiseBudgetInput.val().substr(1)) < minimum_budget) {
            advertiseBudgetInput.val(selected_denomination+minimum_budget);
        }

        if (parseInt(advertiseBudgetInput.val()[1]) === 0) {
            advertiseBudgetInput.val(advertiseBudgetInput.val().removeCharAt(2));
        }

        format_budget_input();
        sync_input_slider(false);
    });


    advertiseBudgetInput.val(selected_denomination+advertiseBudgetInput.val());

    advertiseStep3.addClass("invisible position-absolute");
    advertiseStep2.addClass("invisible position-absolute");
    advertiseStep1.removeClass("invisible position-absolute");

    // Move forward or backward in the checkout process
    let stepper = function(step) {
        console.log(step);
        switch (step) {
            case 0:
                advertiseStep3.addClass("invisible position-absolute");
                advertiseStep2.addClass("invisible position-absolute");
                advertiseStep1.removeClass("invisible position-absolute");

                advertiseStepWrapper2.removeClass("active_before active_after");
                advertiseStepWrapper1.removeClass("active_before active_after");
                advertiseStepWrapper0.removeClass("active_before active_after");

                advertiseMobileStepper.attr("progress", "0");
                advertiseMobileStepperText.children().eq(0).removeClass("d-none");
                advertiseMobileStepperText.children().eq(1).addClass("d-none");
                advertiseMobileStepperText.children().eq(2).addClass("d-none");
                break;

            case 1:
                advertiseStep3.addClass("invisible position-absolute");
                advertiseStep1.addClass("invisible position-absolute");
                advertiseStep2.removeClass("invisible position-absolute");

                advertiseStepWrapper2.removeClass("active_before active_after");
                advertiseStepWrapper1.removeClass("active_after");
                advertiseStepWrapper1.addClass("active_before");
                advertiseStepWrapper0.addClass("active_after");

                advertiseMobileStepper.attr("progress", "50");
                advertiseMobileStepperText.children().eq(0).addClass("d-none");
                advertiseMobileStepperText.children().eq(1).removeClass("d-none");
                advertiseMobileStepperText.children().eq(2).addClass("d-none");
                break;

            case 2:
                advertiseStep2.addClass("invisible position-absolute");
                advertiseStep1.addClass("invisible position-absolute");
                advertiseStep3.removeClass("invisible position-absolute");

                advertiseStepWrapper2.addClass("active_before");
                advertiseStepWrapper1.addClass("active_before active_after");
                advertiseStepWrapper0.addClass("active_after");

                advertiseMobileStepper.attr("progress", "100");
                advertiseMobileStepperText.children().eq(0).addClass("d-none");
                advertiseMobileStepperText.children().eq(1).addClass("d-none");
                advertiseMobileStepperText.children().eq(2).removeClass("d-none");
        }
    };


    advertiseProductSelection.children().click((e) => {
        advertiseProductSelection.children().attr("data-selected-product", false);
        $(e.target).attr("data-selected-product", true);

        advertiseOrderSummaryProduct.text($(e.target).text());
        advertiseProductSelected.text($(e.target).text());
    });


    next_btns.click(() => {
        current_step < 2 ? stepper(++current_step) : 0;
    });

    back_btns.click(() => {
        current_step > 0 ? stepper(--current_step) : 0;
    });

    // Set checkout order summary to default values
    update_checkout_price(numeral(parseInt(advertiseBudgetInput.val().substr(1))*clicks_unit_multiplier).format('0,0'), numeral(parseInt(advertiseBudgetInput.val().substr(1))).format('0,0'));
    advertiseOrderSummaryProduct.text(advertiseProductSelected.text());
});