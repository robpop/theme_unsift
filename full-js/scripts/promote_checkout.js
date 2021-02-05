"use strict";

$(() => {
    
    let advertiseBudgetInput = $("#advertiseBudgetInput");
    let advertiseBudgetSlider = $("#advertiseBudgetSlider");
    let advertiseTotalCost = $("#advertiseTotalCost");
    let advertiseTotalClicks = $("#advertiseTotalClicks");

    let advertiseStep1 = $("#advertiseStep1");
    let advertiseStep2 = $("#advertiseStep2");
    let advertiseStep3 = $("#advertiseStep3");

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


    let sync_input_slider = function(is_slider) {
        if (is_slider) {
            // sync input
            advertiseBudgetInput.val(selected_denomination+advertiseBudgetSlider.val());
        } else {
            // sync slider
            advertiseBudgetSlider.val(advertiseBudgetInput.val().substr(1));
        }

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
    }

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

});