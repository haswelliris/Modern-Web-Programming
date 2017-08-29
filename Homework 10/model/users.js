var mongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/signin';
var debug = require('debug')('signin:usersModel');
var db;
var errorMessage = {
    username: '用户名已存在',
    id: '学号已存在',
    phone: '电话已存在',
    email: '邮箱已存在'
};

/** 
* @brief start connection with mongoDB
*/
debug('start connection with mongoDB');
mongoClient.connect(mongoUrl, function (err, getDB) {
    if (err) {
        debug("Connecttion to mongodb " + mongoUrl + " failed with error: ", err);
        throw (err);
    } else {
        db = getDB;
        debug("Connection to mongodb " + mongoUrl + " succeed");
    }
});


/** 
* @brief create user
*/
function createUser(userInfo, callback) {
    db.collection('users').insertOne(userInfo, function () {
        callback();
    });
}

/** 
* @brief get user info
*/
function readUser(u, callback) {
    db.collection('users').find({ username: u }).toArray(function (err, items) {
        if (err) {
            console.log('DB ERROR : ' + err);
            return;
        }
        callback(items);
    });
}

/** 
* @brief check user info uniqueness from database
*/
function infoCheck(user, callback) {
    var result = {
        status: true,
        username: {
            status: true,
            error: ''
        },
        id: {
            status: true,
            error: ''
        },
        email: {
            status: true,
            error: ''
        },
        phone: {
            status: true,
            error: ''
        }
    };
    /** 
    * @brief check user info uniqueness from database
    */
    db.collection('users').find({ username: user.username }).toArray(function (err, items) {
        result['username'].status = items.length === 0;
        result['username'].error = result['username'].status ? '' : errorMessage['username'];
        result.status = result.status && result['username'].status;
        db.collection('users').find({ id: user.id }).toArray(function (err, items) {
            result['id'].status = items.length === 0;
            result['id'].error = result['id'].status ? '' : errorMessage['id'];
            result.status = result.status && result['id'].status;
            db.collection('users').find({ phone: user.phone }).toArray(function (err, items) {
                result['phone'].status = items.length === 0;
                result['phone'].error = result['phone'].status ? '' : errorMessage['phone'];
                result.status = result.status && result['phone'].status;
                db.collection('users').find({ email: user.email }).toArray(function (err, items) {
                    result['email'].status = items.length === 0;
                    result['email'].error = result['email'].status ? '' : errorMessage['email'];
                    result.status = result.status && result['email'].status;
                    callback(result);
                });
            });
        });
    });
}

exports.createUser = createUser;
exports.readUser = readUser;
exports.infoCheck = infoCheck;