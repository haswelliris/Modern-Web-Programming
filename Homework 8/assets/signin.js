var checkCases = {
//正则表达式检查
    name: {
        '只能包含英文字母、数字或下划线': /^\w*$/,
        '必须以英文字母开头': /^[a-z]/i,
        '用户名长度6~18位': /^\w{6,18}$/
    },
    id: {
        '只允许输入数字': /^\d*$/,
        '不能以0开头': /^[1-9]/,
        '学号需包含8位数字': /^\d{8}$/
    },
    tel: {
        '只允许输入数字': /^\d*$/,
        '不能以0开头': /^[1-9]/,
        '电话需包含11位数字': /^\d{11}$/
    },
    email: {
        "只能包含数字，字母， . ， _ ， - 和 @": /^(\w|\.|-|@)*$/i,
        '有且仅有一个 @': /^(\w|\.|-)*@(\w|\.|-)*$/i,
        "@ 前后应当只有数字或字母": /\w@\w/,
        '必须以数字或字母开头': /^[a-z0-9]/i,
        '必须以字母结尾': /[a-z]$/i,
        "- 或 . 不能连续出现": /^[a-z0-9]([\-\.]?\w+)*@(\w+[\-\.]?)*[a-z]$/i,
        '域名后缀必须合法': /\.[a-z]{2,4}$/i
    }
}

var timer = {};
function delayTillLast(id, fn, wait) {
    if (timer[id]) {
        window.clearTimeout(timer[id]);
        delete timer[id];
    }
    return timer[id] = window.setTimeout(function () {
        fn();
        delete timer[id];
    }, wait);
}

function inputCheck(input) {
    for (var checkCase in checkCases[input.name]) {
        if (!checkCases[input.name][checkCase].test(input.value)) {
            showError(input, checkCase);
            return;
        }
    }
    $.post('./dataCheck', input.name + '=' + input.value, function (data) {
        if (data) {
            showError(input, data);
        } else {
            $(input).removeClass('error').addClass("pass");
            checkAllValid();
        }
    });
}

function showError(input, message) {
    var messageBar;
    $(input).removeClass("pass").addClass('error');
    $(input).after(messageBar = $('<div />', {
        class: "error"
    }).text(message).hide());
    messageBar.animate({
        right: 'toggle'
    }, 400);
}

function hideError(input) {
    $(input).removeClass('error pass');
    $(input).siblings('div.error').animate({
        right: 'toggle'
    }, 200, function () {
        $(this).remove();
    });
}

function check(input) {
    delayTillLast(input.name, function () {
        if (input.value) {
            inputCheck(input);
        }
    }, 700);
    hideError(input);
}

function checkAllValid() {
    var flag = true;
    $('.textfield').each(function () {
        if (!$(this).hasClass('pass'))
            flag = false;
    });
    if (flag) {
        $('#submit').removeAttr("disabled");
    } else {
        $('#submit').attr("disabled", "disabled");
    }
}

window.onload = function () {
    $('.textfield').each(function () {
        var that = this;
        this.oninput = function () {
            check(this);
        };
    });
    $('#reset').click(function () {
        $('.textfield').each(function () {
            hideError(this);
        });
    });
    /*
    * using function to submit
    *  and get post_back
    *
    $('#submit').click(function () {
        event.preventDefault();
        var postdata = "";
        var flag = true;
        $('.textfield').each(function () {
            if (flag) {
                flag = false;
            } else {
                postdata += '&';
            }
            postdata += this.name + '=' + this.value;
        });
        $.post('/signup', postdata, function (result) {
            if (result)
                alert(result);
            else {
                alert("注册成功！");
                window.location.href='/?username=' + $('#name')[0].value;
            }
        });
    });
    */
}