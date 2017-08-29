var rgx = {
    username: /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/,
    id: /^[1-9][0-9]{7}$/,
    password: /[a-zA-Z0-9]+/,
    phone: /^[1-9][0-9]{10}$/,
    email: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
};
var errorMessage = {
    username: '6~18位英文字母、数字或下划线，英文字母开头',
    id: '8位数字，不能以0开头',
    password: '6~12位数字、大小写字母、中划线、下划线',
    confirm_password: '密码两次输入不一致',
    phone: '11位数字，不能以0开头',
    email: '邮箱不合法'
};

function validate(k, v) {
    var result = {};
    result.status = v.match(rgx[k]) !== null;
    result.error = result.status ? '' : errorMessage[k];
    return result;
}

function validateAll(userInfo) {
    var result = { status: true };
    for (var k in rgx) {
        if (userInfo.hasOwnProperty(k)) {
            result[k] = validate(k, userInfo[k]);
            result.status = result.status && result[k].status;
        }
    }
    return result;
}

function validateConfirmPassword(p, cp) {
    var result = {};
    result.status = p === cp;
    result.error = result.status ? '' : errorMessage['confirm_password'];
    return result;
}

if (typeof (exports) === 'object') {
    exports.validateAll = validateAll;
}
