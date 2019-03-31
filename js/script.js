$(() => {
    const $payment = $('#payment');

    $('#name').focus();
    $('#other-title').hide();
    $payment.val('credit card');
    $payment.find('option:first').prop('disabled', true);

    /**
     * Shows other input field when user selects other option
     */
    $('#title').change(e => {
        let title = e.target.value;

        if (title === 'other') {
            $('#other-title').show();
        } else {
            $('#other-title').hide();
        }
    });

    /**
     * Adds event listener for design
     * Displays colors base on theme, user selects
     */
    $('#design').change(e => {
        let design = e.target.value;
        const $color = $('#color');
        const $colorOptions = $color.find('option');
        let colorDefaultIndex = 0;

        $colorOptions.each((index, item) => {
            if (design === 'js puns' && index >= 0 && index <= 2) {
                colorDefaultIndex = 0;
                $(item).show();

                return true;
            } else if (design === 'heart js' && index > 2 && index <= 5) {
                colorDefaultIndex = 3;
                $(item).show();

                return true;
            }
            $(item).hide();
        });

        if (design === 'Select Theme') {
            $color.val('');
        } else {
            $color.val($colorOptions.eq(colorDefaultIndex).val());
        }
    });

    // Trigger design change in order to update color
    $('#design').trigger('change');

    /**
     * Disables checkbox in case there is the same day and time
     * @param {Object} $checkbox 
     * @param {boolean} isDisabled 
     */
    var controlActivityCheckbox = ($checkbox, isDisabled) => {
        if ($checkbox.hasClass('fristActivity')) {
            $('.fristActivity').prop('disabled', isDisabled);
        } else if ($checkbox.hasClass('secondActivity')) {
            $('.secondActivity').prop('disabled', isDisabled);
        }
    };

    /**
     * Calculates total price of activity
     */
    var calculateActivityPrice = () => {
        const $activeCheckbox = $('.activities input[type=checkbox]:checked');
        const $totalPriceLabel = $('.activities').find('#totalPrice');
        let totalPrice = 0;

        if ($activeCheckbox.length) {
            $activeCheckbox.each((index, item) => {
                if ($(item).hasClass('mainActivity')) {
                    totalPrice += 200;
                } else {
                    totalPrice += 100;
                }
            });
        }

        if ($totalPriceLabel.length && totalPrice) {
            $totalPriceLabel.html('Total Price: ' + totalPrice);
        } else if (!$totalPriceLabel.length && totalPrice) {
            $('.activities').append('<label id="totalPrice">Total Price: ' + totalPrice + '</label>');
        } else {
            $('.activities').find('#totalPrice').remove();
        }
    };

    /**
     * Adds event listener for activity
     */
    $('.activities input[type=checkbox]').click(e => {
        const $checkbox = $(e.target);

        if ($checkbox.is(':checked')) {
            controlActivityCheckbox($checkbox, true);
            $checkbox.prop('disabled', false);
        } else {
            controlActivityCheckbox($checkbox, false);
        }

        calculateActivityPrice();
    });

    /**
     * Adds event listener for payment method
     */
    $payment.change(e => {
        let payment = e.target.value;
        const $creditCard = $('#credit-card');
        const $paypal = $creditCard.next();
        const $bitCoin = $paypal.next();

        if (payment === 'credit card') {
            $creditCard.show();
            $paypal.hide();
            $bitCoin.hide();
        } else if (payment === 'paypal') {
            $creditCard.hide();
            $paypal.show();
            $bitCoin.hide();
        } else {
            $creditCard.hide();
            $paypal.hide();
            $bitCoin.show();
        }
    });

    /**
     * Checks wether email is valid or not
     */
    var isValidEmail = () => {
        const emailRegex = /^[\w.]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/;
        let email = $('#mail').val();

        return emailRegex.test(email);
    };

    /**
     * Checks wether credit card is valid or not
     */
    var isValidCCNum = () => {
        const ccNumRegex = /^[\d]{13,16}$/;
        let ccNum = $('#cc-num').val();

        return ccNumRegex.test(ccNum);
    };

    /**
     * Checks wether zip code is valid or not
     */
    var isValidZip = () => {
        const zipRegex = /^[\d]{5}$/;
        let zip = $('#zip').val();

        return zipRegex.test(zip);
    };

    /**
     * Checks wether CVV is valid or not
     */
    var isValidCVV = () => {
        const cvvRegex = /^[\d]{3}$/;
        let cvv = $('#cvv').val();

        return cvvRegex.test(cvv);
    };

    /**
     * Shows error message in case isDisplay parameter
     * is provided true and appends the message
     * according to their selector's parent base on
     * hasParent parameter is provided
     * @param {Object} selector 
     * @param {Boolean} isDisplay 
     * @param {Boolean} hasParent 
     * @param {string} errorMessage 
     */
    var showErrorMessage = (selector, isDisplay, hasParent, errorMessage) => {
        const $parentSelector = $(selector).parent();
        const $errorMessage = $parentSelector.find(selector + 'Message');

        if (!isDisplay) {
            $errorMessage.hide();
            $(selector).css('border', 'none');
            return;
        }

        $(selector).css('border', '2px solid rgb(228, 46, 46)');
        if ($errorMessage.length) {
            $errorMessage.show();
            $errorMessage.html(errorMessage);
        } else {
            let errorMessageId = selector.replace(/#/, '');
            let errorHtml = '<span id="' + errorMessageId + 'Message" class="error-message">' + errorMessage + '</span>';

            if (!hasParent) {
                $(errorHtml).insertAfter($(selector));
            } else {
                $parentSelector.append(errorHtml);
            }
        }
    };

    /**
     * Shows error message for activity
     * @param {Boolean} isDisplay 
     */
    var showActivityErrorMessage = (isDisplay) => {
        const $activityMessage = $('.activities').find('#activityMessage');

        if (!isDisplay) {
            $activityMessage.hide();
            return;
        }

        if ($activityMessage.length) {
            $activityMessage.show();
        } else {
            $('.activities').append('<span id="activityMessage" class="error-message">Please select at least one activity!</span>');
        }
    };

    /**
     * Adds event listener for form
     * Shows error message in case
     * each field is invalid
     */
    $('#interactiveFrom').on('submit', e => {
        const $interactiveFrom = $(e.target);
        const $activeCheckbox = $('.activities input[type=checkbox]:checked');

        if (!$('#name').val()) {
            e.preventDefault();
            showErrorMessage('#name', true, false, 'This field is mandatory!');
        } else {
            showErrorMessage('#name', false);
        }

        if (!isValidEmail()) {
            let errorMessage = !$('#mail').val() ? 'This field is mandatory!' : 'This email is invalid!';

            e.preventDefault();
            showErrorMessage('#mail', true, false, errorMessage);
        } else {
            showErrorMessage('#mail', false);
        }
        
        if (!$activeCheckbox.length) {
            e.preventDefault();
            showActivityErrorMessage(true);
        } else {
            showActivityErrorMessage(false);
        }

        if (!$('#color').val()) {
            e.preventDefault();
            showErrorMessage('#color', true, false, 'Please select a T-shirt theme');
        } else {
            showErrorMessage('#color', false);
        }
        
        if ($('#payment').val() === 'credit card') {
            if (!isValidCCNum()) {
                let errorMessage = !$('#cc-num').val() ? 'This field is mandatory!' : 'This credit card number is invalid!';

                e.preventDefault();
                showErrorMessage('#cc-num', true, true, errorMessage);
            } else {
                showErrorMessage('#cc-num', false);
            }

            if (!isValidZip()) {
                let errorMessage = !$('#zip').val() ? 'This field is mandatory!' : 'This zip code is invalid!';

                e.preventDefault();
                showErrorMessage('#zip', true, true, errorMessage);
            } else {
                showErrorMessage('#zip', false);
            }

            if (!isValidCVV()) {
                let errorMessage = !$('#cvv').val() ? 'This field is mandatory!' : 'This CCV is invalid!';

                e.preventDefault();
                showErrorMessage('#cvv', true, true, errorMessage);
            } else {
                showErrorMessage('#cvv', false);
            }
        }

    });

    // Triggers change payment after setting payment default value
    $payment.trigger('change');
});