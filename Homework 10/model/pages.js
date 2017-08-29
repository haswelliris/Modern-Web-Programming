var debug = require('debug')('signin:pagesModel');
var template = {
    jqueryLink: './javascripts/jquery-2.2.4.js',
    jsLink: './javascripts/home.js',
    md5Link: './javascripts/jQuery.md5.js',
    baseCssLink: './stylesheets/index.css',
    extraCssLink: './stylesheets/style.css',
    bootstrapLink: './stylesheets/bootstrap.min.css',
    usernameTitle : '用户名',
    illegalwarning : false
}

function setWarnings() {
    template.illegalwarning = true;
}

function getDetails(userInfo) {
    var temp = '\n';
    for (var k in userInfo) {
        temp += k + " " + userInfo[k] + "\n";
    }
    debug("process details of " + temp);
    // get template
    var m = new Array();
    for (var i in template) {
        m[i] = template[i];
    }
    m.pageTitle = '我的主页';
    m.formTitle = '我的资料';
    m.idTitle = '学号';
    m.phoneTitle = '电话';
    m.emailTitle = '邮箱';
    m.submitTitle = '登出';
    for (var k in userInfo) {
        m[k] = userInfo[k];
    }
    m.signInLink = './';
    if (m.illegalwarning) {
        template.illegalwarning = false;
    }
    debug("porcess completed");
    debug(m);

    return m;
}

function getSignIn() {
    debug("process Sign In");
    // get template
    var m = new Array();
    for (var i in template) {
        m[i] = template[i];
    }
    m.validatorJsLink = './javascripts/validator.js';
    m.jsLink = './javascripts/sign_in.js';
    m.cssLink = './stylesheets/index.css';
    m.pageTitle = '登录';
    m.formTitle = '登录';
    // TODO
    m.usernameErrorMsg = 'Error';
    m.passwordTitle = '密码';
    // TODO
    m.passwordErrorMsg = 'Error';
    m.submitTitle = '登录';
    m.registerTitle = '没有账号？立即注册';
    m.registerLink = './regist';
    return m;
}

function getSignUp() {
    //url /regist (without regist/)
    debug("process Sign Up Page");
    // get template
    var m = new Array();
    for (var i in template) {
        m[i] = template[i];
    }
    m.validatorJsLink = './javascripts/validator.js';
    m.jsLink = './javascripts/sign_up.js';
    m.cssLink = './stylesheets/index.css';
    m.pageTitle = '注册';
    m.formTitle = '注册';
    // TODO
    m.usernameErrorMsg = 'Error';
    m.passwordTitle = '密码';
    // TODO
    m.passwordErrorMsg = 'Error';
    m.confirmPasswordTitle = '确认密码';
    // TODO
    m.confirmPasswordErrorMsg = '';
    m.idTitle = '学号';
    // TODO
    m.idErrorMsg = '';
    m.phoneTitle = '电话';
    // TODO
    m.phoneErrorMsg = '';
    m.emailTitle = '邮箱';
    // TODO
    m.emailErrorMsg = '';
    m.submitTitle = '注册';
    m.signInTitle = '已有账号？立即登录';
    m.signInLink = './';
    return m;
}

exports.getSignUp = getSignUp;
exports.getSignIn = getSignIn;
exports.getDetails = getDetails;
exports.setWarnings = setWarnings;