"use strict";

// Create an instance of the Stripe object
// Your Stripe publishable API key is required when calling this function, as it identifies your website to Stripe.
// This is a sample key which needs be replaced with your Stripe API key for your site
// See: https://stripe.com/docs/js/initializing
var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

function registerElements(elements, exampleName) {
    
    var formClass = '.' + exampleName;
    var example = document.querySelector(formClass);
  
    var form = example.querySelector('form');
    //var resetButton = example.querySelector('a.reset');
    var error = form.querySelector('.error');
    //var errorMessage = error.querySelector('.message');
  
    function enableInputs() {
      Array.prototype.forEach.call(
        form.querySelectorAll(
          "input[type='text'], input[type='email'], input[type='tel']"
        ),
        function(input) {
          input.removeAttribute('disabled');
        }
      );
    }
  
    function disableInputs() {
      Array.prototype.forEach.call(
        form.querySelectorAll(
          "input[type='text'], input[type='email'], input[type='tel']"
        ),
        function(input) {
          input.setAttribute('disabled', 'true');
        }
      );
    }
  
    function triggerBrowserValidation() {
      // The only way to trigger HTML5 form validation UI is to fake a user submit
      // event.
      var submit = document.createElement('input');
      submit.type = 'submit';
      submit.style.display = 'none';
      form.appendChild(submit);
      submit.click();
      submit.remove();
    }
  
    // Listen for errors from each Element, and show error messages in the UI.
    var savedErrors = {};
    elements.forEach(function(element, idx) {
      element.on('change', function(event) {
        if (event.error) {
          error.classList.add('visible');
          savedErrors[idx] = event.error.message;
          errorMessage.innerText = event.error.message;
        } else {
          savedErrors[idx] = null;
  
          // Loop over the saved errors and find the first one, if any.
          var nextError = Object.keys(savedErrors)
            .sort()
            .reduce(function(maybeFoundError, key) {
              return maybeFoundError || savedErrors[key];
            }, null);
  
          if (nextError) {
            // Now that they've fixed the current error, show another one.
            errorMessage.innerText = nextError;
          } else {
            // The user fixed the last error; no more errors.
            error.classList.remove('visible');
          }
        }
      });
    });
  
    // Listen on the form's 'submit' handler...
    form.addEventListener('submit', function(e) {
      console.log("submit form");
      e.preventDefault();
  
      // Trigger HTML5 validation UI on the form if any of the inputs fail
      // validation.
      var plainInputsValid = true;
      Array.prototype.forEach.call(form.querySelectorAll('input'), function(
        input
      ) {
        if (input.checkValidity && !input.checkValidity()) {
          plainInputsValid = false;
          return;
        }
      });
      if (!plainInputsValid) {
        triggerBrowserValidation();
        return;
      }
  
      // Show a loading screen...
      example.classList.add('submitting');
  
      // Disable all inputs.
      disableInputs();
  
      // Gather additional customer data we may have collected in our form.
      var name = form.querySelector('#' + exampleName + '-name');
      var address1 = form.querySelector('#' + exampleName + '-address');
      var city = form.querySelector('#' + exampleName + '-city');
      var state = form.querySelector('#' + exampleName + '-state');
      var additionalData = {
        name: name ? name.value : undefined,
        address_line1: address1 ? address1.value : undefined,
        address_city: city ? city.value : undefined,
        address_state: state ? state.value : undefined,
      };
  
      // Use Stripe.js to create a token. We only need to pass in one Element
      // from the Element group in order to create a token. We can also pass
      // in the additional customer data we collected in our form.
      stripe.createToken(elements[0], additionalData).then(function(result) {
        // Stop loading!
        example.classList.remove('submitting');
  
        if (result.token) {
          // If a token is received, show success message.
          // Token id -> result.token.id
          $("#advertiseStep3").children().eq(0).hide();
          $("#advertiseStep3").children().eq(0).removeClass("d-flex");
          $("#advertisePaymentSuccess").removeClass("d-none");
          example.classList.add('submitted');
        } else {
          // Otherwise, un-disable inputs.
          enableInputs();
        }
      });
    });
  
    /*resetButton.addEventListener('click', function(e) {
      e.preventDefault();
      // Resetting the form (instead of setting the value to `''` for each input)
      // helps us clear webkit autofill styles.
      form.reset();
  
      // Clear each Element.
      elements.forEach(function(element) {
        element.clear();
      });
  
      // Reset error state as well.
      error.classList.remove('visible');
  
      // Resetting the form does not un-disable inputs, so we need to do it separately:
      enableInputs();
      example.classList.remove('submitted');
    });*/
}

$(() => {
    
    var elements = stripe.elements({
        fonts: [
          {
            cssSrc: 'https://fonts.googleapis.com/css?family=Source+Code+Pro',
          },
        ],
        // Stripe's examples are localized to specific languages, but if
        // you wish to have Elements automatically detect your user's locale,
        // use `locale: 'auto'` instead.
        locale: window.__exampleLocale
      });
    
      // Floating labels
      var inputs = document.querySelectorAll('.cell.example.example2 .input');
      Array.prototype.forEach.call(inputs, function(input) {
        input.addEventListener('focus', function() {
          input.classList.add('focused');
        });
        input.addEventListener('blur', function() {
          input.classList.remove('focused');
        });
        input.addEventListener('keyup', function() {
          if (input.value.length === 0) {
            input.classList.add('empty');
          } else {
            input.classList.remove('empty');
          }
        });
      });
    
      let text_color = "#32325D";
      let darkThemeSelected = (localStorage.getItem("darkTheme") !== null && localStorage.getItem("darkTheme") === "dark");
      if (darkThemeSelected) {
          text_color = "#fafafa";
      }

      var elementStyles = {
        base: {
          color: text_color,
          fontWeight: 500,
          fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
          fontSize: '1.1rem',
          fontSmoothing: 'antialiased',
    
          '::placeholder': {
            color: '#CFD7DF',
          },
          ':-webkit-autofill': {
            color: '#e39f48',
          },
        },
        invalid: {
          color: '#E25950',
    
          '::placeholder': {
            color: '#FFCCA5',
          },
        },
      };
    
      var elementClasses = {
        focus: 'focused',
        empty: 'empty',
        invalid: 'invalid',
      };
    
      var cardNumber = elements.create('card', {
        style: elementStyles,
        classes: elementClasses,
      });
      cardNumber.mount('#example2-card-number');
    
    
      registerElements([cardNumber], 'example2');

});