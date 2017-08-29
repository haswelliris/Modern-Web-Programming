//api for user check,sign_in,sign_up,log_out
var express = require('express');
var router = express.Router();
var debug = require('debug')('signin:router');
var validator = require('../model/validator');
var userModel = require('../model/users');

var cookiesMaxLiveTime = 12 * 30 * 24 * 60 * 60 * 1000;
//                     Month Day Hour Minitue Second

/** 
* @brief Deal ileggal request.
*/
router.get('/', function (req, res, next) {
    res.status(200);
    res.send('illegal url');
    debug("recieved an illegal request : " + req.body);
});

/** 
* @brief exceed sign in.
*/
router.post('/sign_in', function (req, res, next) {
    /** 
    * @brief get sign_in info
    */
    var userInfo = {
        username: req.body.username,
        password: req.body.password
    };
    var result = {
        status: true,
        username: {
            status: true,
            error: ''
        },
        password: {
            status: true,
            error: ''
        }
    };
    /** 
    * @brief read user info from database and check
    */
    userModel.readUser(userInfo.username, function (items) {
        if (items.length > 0) {
            if (items[0].password === userInfo.password) {
                result.username.status = true;
                result.username.error = '';
                result.password.status = true;
                result.password.error = '';
                res.cookie('username', userInfo.username, { maxAge: cookiesMaxLiveTime, httpOnly: true });
            } else {
                result.username.status = true;
                result.username.error = '';
                result.password.status = false;
                result.password.error = '密码错误';
                result.status = false;
            }
        } else {
            result.username.status = false;
            result.username.error = '账户不存在';
            result.password.status = true;
            result.password.error = '';
            result.status = false;
        }
        console.log('Sign in ' + JSON.stringify(userInfo) + JSON.stringify(result));
        debug('Sign in ' + JSON.stringify(userInfo) + JSON.stringify(result));
        res.send(JSON.stringify(result));
    });
});

/** 
* @brief exceed sign up.
*/
router.post('/sign_up', function (req, res, next) {
    /** 
    * @brief get sign_up info
    * @warning: password has been encrypted
    */
    var userInfo = {
        username: req.body.username,
        password: req.body.password,
        id: req.body.id,
        phone: req.body.phone,
        email: req.body.email
    };
    debug('check user info ' + JSON.stringify(userInfo));
    /** 
    * @brief check user info validation by static rule
    */
    var result = validator.validateAll(userInfo);
    if (result.status) {
        /** 
        * @brief check user info uniqueness from database
        */
        userModel.infoCheck(userInfo, function (re) {
            for (var k in re) {
                result[k].error = result[k].status ? re[k].error : result[k].error;
                result[k].status = result[k].status && re[k].status;
            }
            result.status = result.status && re.status;
            if (result.status) {
                console.log('Sign up succeed' + JSON.stringify(userInfo));
                debug('Sign up succeed ' + JSON.stringify(userInfo));
                userModel.createUser(userInfo, function () {
                    res.cookie('username', userInfo.username, { maxAge: cookiesMaxLiveTime, httpOnly: true });
                    res.send(JSON.stringify(result));
                });
            } else {
                debug('user checking unpassed : ' + JSON.stringify(result));
                res.send(JSON.stringify(result));
            }
        })
    } else {
        debug('illegal post data');
        res.send(JSON.stringify(result));
    }
});

router.post('/sign_out', function (req, res, next) {
    /** 
    * @brief log out
    */
    console.log(req.cookies.username + ' log out');
    debug(req.cookies.username + ' log out');
    res.clearCookie('username', { path: '/' });
    res.send(JSON.stringify({ status: true }));
});

module.exports = router;