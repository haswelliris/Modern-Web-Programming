var express = require('express');
var router = express.Router();
var debug = require('debug')('signin:router');
var userModel = require('../model/users');
var pagesModel = require('../model/pages');

/** 
* @brief GET home page(Sign In page).
*/
router.get('/', function (req, res, next) {
    var username = req.query.username;
    if (username === undefined) {
        res.render('sign_in', pagesModel.getSignIn());
        return;
    } else {
        userModel.readUser(username, function (items) {
            if (items.length === 0) {
                res.redirect('./');
            } else {
                res.render('home', pagesModel.getDetails(items[0]));
            }
        });
    }
});

/** 
* @brief GET Sign up page.
*/
router.get('/regist', function (req, res, next) {
    res.render('sign_up', pagesModel.getSignUp());
});

module.exports = router;
