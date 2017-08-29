var userModel = require('../model/users');
var pagesModel = require('../model/pages');
var debug = require('debug')('signin:router');

/** 
* @brief handle url query.
     and check cookies
*/
module.exports = function (req, res, next) {
    /** 
    * @brief get url
    */
    var path = req.path;
    /** 
    * @brief get cookies info
    */
    var queryUser = req.query.username;
    var cookiesUser = req.cookies.username;
    if (path === '/') {
        if (queryUser !== undefined && cookiesUser !== undefined) {
            /** 
            * @brief get cookies info & get query info
            */
            if (queryUser === cookiesUser) {
                /** 
                * @brief get cookies info & get query info
                */
                userModel.readUser(queryUser, function (items) {
                    if (items.length > 0) {
                        next();
                    } else {
                        /** 
                        * @brief user not exsited
                        */
                        res.clearCookie('username', { path: '/' });
                        res.redirect('./');
                    }
                });
            } else if (queryUser !== '') {
                /** 
                * @brief login user try to query other users
                * @func send warnings
                */
                userModel.readUser(cookiesUser, function (items) {
                    if (items.length === 0) {
                        res.clearCookie('username', { path: '/' });
                        res.redirect('./');
                    } else {
                        console.log(cookiesUser + ' try to query other users! send warnings!');
                        debug(cookiesUser + ' try to query other users! send warnings!');
                        pagesModel.setWarnings();
                        res.redirect('./?username=' + cookiesUser);
                    }
                });
            } else {
                /** 
                * @brief login user try to query other users
                * @func send warnings
                */
                userModel.readUser(cookiesUser, function (items) {
                    if (items.length === 0) {
                        res.clearCookie('username', { path: '/' });
                        res.redirect('./');
                    } else {
                        console.log(cookiesUser + ' try to query other users! send warnings!');
                        debug(cookiesUser + ' try to query other users! send warnings!');
                        pagesModel.setWarnings();
                        res.redirect('./?username=' + cookiesUser);
                    }
                });
            }
        } else if (queryUser === undefined && cookiesUser !== undefined) {
            res.redirect('./?username=' + cookiesUser);
        } else if (queryUser !== undefined && cookiesUser === undefined) {
            /** 
            * @brief when try to query other users illegal
            * @func send warnings
            */
            console.log('Warning : someone try to query other users!');
            debug('Warning : someone try to query other users!');
            res.render('warn', {});
        } else {
            next();
        }
    } else if (path === '/regist') {
        if (cookiesUser !== undefined) {
            res.redirect('./?username=' + cookiesUser);
        } else {
            next();
        }
    } else {
        next();
    }
};
