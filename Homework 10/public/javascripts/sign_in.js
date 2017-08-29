function toggleError(name, toggle, msg) {
    var errorLabel = $('input[name=' + name + ']').closest('.input-box').find('.error-label').eq(0);
    if (msg) {
        errorLabel.text(msg);
    } else {
        errorLabel.text('');
    }
    errorLabel.toggleClass('error-show', toggle);
}

function toggleSignInButton(toggle, label) {
    var button = $('.submit-box input').eq(0);
    button.prop('disabled', !toggle);
    button.toggleClass('submit-active', toggle);
    button.val(label);
}

function signIn() {
    var inputBoxes = $('.input-box input');
    var userInfo = {};
    inputBoxes.each(function () {
        userInfo[$(this).attr('name')] = $(this).val();
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
    toggleSignInButton(false, '登录中');
    $.post('./api/sign_in', userInfo, function (json) {
        var result = JSON.parse(json);
        if (result.status === true) {
            window.location.replace('./?username=' + userInfo.username);
        } else {
            inputBoxes.each(function () {
                var n = $(this).attr('name');
                toggleError(n, !result[n].status, result[n].error);
            });
            toggleSignInButton(true, '登录');
        }
    }).fail(function () {
        toggleError('username', true, '未知错误');
        toggleSignInButton(true, '登录');
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
        $(this).closest('.input-box').find('.error-label').toggleClass('error-inactive', true);
        var v = validate($(this).attr('name'), $(this).val());
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
        signIn();
    });
    $('#username-input').focus();
});