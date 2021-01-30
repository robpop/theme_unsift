"use strict";

function count_to(id, start, end, duration) {
    console.log(id+" "+start+" "+end+" "+duration);
    if (start === end) return;
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var timer = setInterval(function() {
        current += increment;
        id.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

$(() => {
    
    let advertiseBudgetInput = $("#advertiseBudgetInput");
    let advertiseBudgetSlider = $("#advertiseBudgetSlider");
    let advertiseTotalCost = document.getElementById("advertiseTotalCost");
    let advertiseTotalClicks = document.getElementById("advertiseTotalClicks");

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

    let selected_denomination = denominations[advertiseBudgetInput.attr("data-denomination")];
    let last_value = advertiseBudgetSlider.val();

    let sync_input_slider = function(is_slider, value) {
        if (is_slider) {
            // sync input
            advertiseBudgetInput.val(selected_denomination+advertiseBudgetSlider.val());
        } else {
            // sync slider
            advertiseBudgetSlider.val(advertiseBudgetInput.val().substr(1));
        }
        count_to(advertiseTotalCost, parseInt(last_value), parseInt(advertiseBudgetSlider.val()), 250);
        last_value = advertiseBudgetSlider.val();
    }
    
    let format_budget_input = function() {
        if (advertiseBudgetInput.val().length < 2) {        
            advertiseBudgetInput.val(selected_denomination);
            advertiseBudgetSlider.val(1);
            sync_input_slider(true);
        }
    }

    $(document).on("input", "#advertiseBudgetSlider", () => {
        format_budget_input();
        sync_input_slider(true);
    });

    $(document).on("input", "#advertiseBudgetInput", (e) => {
        console.log(Number.isInteger(parseInt(e.originalEvent.data)));
        if (e.originalEvent.data && !Number.isInteger(parseInt(e.originalEvent.data))) {
            advertiseBudgetInput.val(advertiseBudgetInput.val().substr(0, advertiseBudgetInput.val().indexOf(e.originalEvent.data)));
        }
        format_budget_input();
        sync_input_slider(false);
    });


    advertiseBudgetInput.val(selected_denomination+advertiseBudgetInput.val());

});