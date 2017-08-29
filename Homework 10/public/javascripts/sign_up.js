function toggleError(name, toggle, msg) {
    var errorLabel = $('input[name=' + name + ']').closest('.input-box').find('.error-label').eq(0);
    if (msg) {
        errorLabel.text(msg);
    } else {
        errorLabel.text('');
    }
    errorLabel.toggleClass('error-show', toggle);
}

function toggleSignUpButton(toggle, label) {
    var button = $('.submit-box input').eq(0);
    button.prop('disabled', !toggle);
    button.toggleClass('submit-active', toggle);
    button.val(label);
}

function signUp() {
    var inputBoxes = $('.input-box input');
    var userInfo = {};
    inputBoxes.each(function () {
        if ($(this).attr('name') !== 'confirm_password') {
            userInfo[$(this).attr('name')] = $(this).val();
        }
    });
    var v = validateAll(userInfo);
    if (!v.status) {
        return;
    }
    /** 
    * @brief encrypt password
    * @warning: password has been encrypted
    */
    userInfo['password'] = $.md5(userInfo['password']);
    //console.log(userInfo['password']);
    toggleSignUpButton(false, '注册中');
    $.post('./api/sign_up', userInfo, function (json) {
        var result = JSON.parse(json);
        if (result.status === true) {
            window.location.replace('./?username=' + userInfo.username);
        } else {
            inputBoxes.each(function () {
                var n = $(this).attr('name');
                if (n !== 'confirm_password') {
                    toggleError(n, !result[n].status, result[n].error);
                }
            });
            toggleSignUpButton(true, '注册');
        }
    }).fail(function () {
        toggleSignUpButton(true, '注册');
    });
}

$(window).load(function () {
    var inputBoxes = $('.input-box input');
    var submitButton = $('.submit-box input').eq(0);
    var errorLabels = $('.error-label');
    inputBoxes.focus(function () {
        $(this).toggleClass('input-active', true);
        $(this).closest('.input-box').find('.error-label').toggleClass('error-active', true);
    });
    inputBoxes.blur(function () {
        $(this).toggleClass('input-active', false);
        $(this).closest('.input-box').find('.error-label').toggleClass('error-active', false);
        var v;
        if ($(this).attr('name') === 'confirm_password') {
            v = validateConfirmPassword(inputBoxes.filter('input[name="password"]').val(), $(this).val());
        } else {
            v = validate($(this).attr('name'), $(this).val());
        }
        toggleError($(this).attr('name'), !v.status, v.error);
    });
    submitButton.mouseenter(function () {
        $(this).toggleClass('submit-active', true);
    });
    submitButton.mouseleave(function () {
        $(this).toggleClass('submit-active', false);
    });
    submitButton.click(function (event) {
        event.preventDefault();
        signUp();
    });
    $('input[name="username"]').focus();
});