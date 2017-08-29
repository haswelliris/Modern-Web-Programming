var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var database = require('./database.js');

var MIME = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript'
}

var regexp = {
//正则表达式检查
    name: /^[a-z]\w{5,17}$/i,
    id: /^[1-9]\d{7}$/,
    tel: /^[1-9]\d{10}$/,
    email: /^[a-z0-9]([\-_\.]?[a-z0-9]+)*@([a-z0-9_\-]+\.)+[a-zA-Z]{2,4}$/i
}

var signin_page = "/signin.html";
var detail_page = "/detail.html";
var warning_page = "/warning.html";

function redirect(pathname, query, response, postData) {
    console.log("[redirect] to " + pathname);
    response.writeHead(302, {
        'Location': pathname
        //add other headers here...
    });
    response.end();
}

function dataCheck(pathname, query, response, postData) {
    console.log("checking data for '" + postData + "'");
    //console.log(typeof (postData));
    if (!postData.length) {
        response.writeHead(302, {
            'Location': './'
            //add other headers here...
        });
        response.end();
    } else {
        var data = querystring.parse(postData);
        //just query the first data
        for (var i in data) {
            database.query(i, data[i], function (err, rows) {
                if (rows.length) {
                    //if (rows==undefined) {
                    response.writeHead(200, { 'Content-Type': 'text/plain;charset=UTF-8' });
                    console.log(data[i] + " is already existed");
                    response.end(data[i] + " 已注册，请重新输入");
                    return;
                } else {
                    //do nothing
                    response.end();
                }
            });
            break;
        }
    }
}



function getPath(pathname, query, response, postData) {
    console.log("Getting file " + pathname);
    var local_path = "assets" + pathname;
    fs.exists(local_path, function (exists) {
        if (!exists) {
            //response.writeHead(404, { 'Content-Type': 'text/plain' });
            //response.end('file not found');
            response.writeHead(302, {
                'Location': './'
                //add other headers here...
            });
            response.end();
        } else {
            fs.readFile(local_path, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, { 'Content-Type': 'text/plain;charset=UTF-8' });
                    response.end(err);
                } else {
                    response.writeHead(200, { 'Location': './', 'Content-Type': MIME[path.extname(local_path)] + ';charset=UTF-8' });
                    response.write(file, 'binary');
                    response.end();
                }
            });
        }
    });
}

function response_warn(pathname, query, response, postData) {
    //返回非法警告页面
    response.writeHead(302, {
        'Location': './warning.html'
    });
    response.end();
    /*
    * 返回错误提示，作为ajax post的回调参数
    var local_path = "assets" + warning_page;
    response.writeHead(200, { 'Location': '/', 'Content-Type': 'text/plain;charset=UTF-8' });
    response.end("嘿，你在干什么？\n请勿故意提交非法数据！");
    */
}

function checkUser(user, callback) {
    for (var i in user) {
        if (!regexp[i].test(user[i])) {
            callback(false);
            return;
        }
    }
    database.checkUser(user, function (rows) {
        //callback(!rows[0]);
        callback(!rows.length);
    });
}

function signup(pathname, query, response, postData) {
    if (postData) {
        var user = querystring.parse(postData);
        delete user.submit;
        console.log("Get POST User Info :\n", user);
        checkUser(user, function (pass) {
            if (pass) {
                console.log("Check user '" + user.name + "' passed");
                database.addUser(user, function (err, res) {
                    if (err) {
                        console.log("Adding failed error : " + err + "\n result:" + res[0]);
                        response_warn(warning_page, query, response, postData);
                    }
                    else {
                        console.log("Adding succeed ");
                        redirect('./?username=' + user.name, query, response, postData);
                        /*
                        * this mode is post_back null
                        *  so that html will href to the link
                        response.end();
                        */
                    }
                });
                /*
                console.log("All users:");
                database.showUser(function (rows) {
                    console.log(rows);
                });
                */
            } else {
                console.log("Check user '" + user.name + "' failed");
                console.log("[WARNING] recieved illegal post");
                //getPath(signin_page, query, response, postData);
                response_warn(warning_page, query, response, postData);
            }
        });
    } else {
        console.log("[WARNING] illegal url, recieved empty post");
        response_warn(warning_page, query, response, postData);
        //getPath(signin_page, query, response, postData);
        /*
        response.writeHead(302, {
            'Location': './'
            //add other headers here...
        });
        response.end();
        */
    }
}

function signin(pathname, query, response, postData) {
    console.log("[request] for signin");
    if (query != null) {
        var userName;
        //console.log(typeof (querystring.parse(query).username));
        if (querystring.parse(query).username != undefined) {
            userName = querystring.parse(query).username;
        } else {
            console.log("invalid query !");
            //getPath(signin_page, query, response, postData);
            redirect('./', query, response, postData);
            return;
        }
        console.log("query userName: " + userName);
        if (userName == '') {
            console.log("error : username should not be null");
            //getPath(signin_page, query, response, postData);
            redirect('./', query, response, postData);
            return;
        } else {
            showDetail(pathname, query, response, postData, userName);
        }
    } else {
        console.log("no query ! send signin page..");
        getPath(signin_page, query, response, postData);
        //response_warn(warning_page, query, response, postData);
    }
}

function showDetail(pathname, query, response, postData, userName) {
    console.log("Showing detail for user " + userName);
    if (userName != '') {
        console.log("[query] "+userName+" from database");
        database.query('name', userName, function (err, rows) {
            console.log(typeof (rows));
            //if (rows[0]) {
            if (rows.length) {
                console.log("query " + userName + " succeed!");
                var local_path = "assets" + detail_page, user = rows[0];
                fs.readFile(local_path, "utf8", function (err, file) {
                    response.writeHead(200, { 'Location': './', 'Content-Type': MIME[path.extname(local_path)] + ';charset=UTF-8' });
                    for (var i in user) {
                        file = file.replace('[' + i + ']', user[i]);
                    }
                    response.write(file, 'utf8');
                    response.end();
                });
            } else {
                console.log(userName + " do not exists!");
                redirect('./', query, response, postData);
                //getPath(signin_page, query, response, postData);
                /*
                response.writeHead(302, {
                    'Location': './'
                    //add other headers here...
                });
                response.end();
                */
            }
        })
    } else {
        console.log("error!");
        //getPath(signin_page, query, response, postData);
        redirect('./', query, response, postData);
    }
}

var handle = {
    '/signup': signup,
    '/': signin,
    '/dataCheck': dataCheck,
    'getPath': getPath
};

exports.handle = handle;