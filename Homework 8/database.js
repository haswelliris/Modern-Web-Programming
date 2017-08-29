var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'isysu.cc',
    user: 'mwp_common',
    password: 'dUxo3NL',
    database: 'MWP_homework',
    port: 3306
});

//查询
function query_user(content, value, fn) {
    conn.query('SELECT * FROM user WHERE ' + content + '="' + value + '"', function (err, rows, fields) {
        fn(err,rows);
        //console.log(err + " " + typeof(rows) + " "+fields);
    });
}

//插入
function add_user(user, fn) {
    conn.query('INSERT INTO user (name, id, tel, email) values("' + user.name + '", "' + user.id + '", "' + user.tel + '", "' + user.email + '")', function (err, rows, fields) {
        fn(err, rows);
    });
}

//查重
function check_user(user, fn) {
    conn.query('SELECT * FROM user WHERE name="' + user.name + '" OR id="' + user.id + '" OR tel="' + user.tel + '" OR email="' + user.email + '"', function (err, rows, fields) {
        fn(rows);
    });
}

function get_all_user(fn) {
    conn.query('SELECT * FROM user', function (err, rows, fields) {
        fn(rows);
    });
}

conn.connect(function(err){
    if(err) {
        console.log('[ERROR]:MySQL connect Failed!\n' +err);
    } else {
        console.log('connected to database succeed!');
    }
});

//check the table is existed
var TABLE_NAME='user';
conn.query('CREATE TABLE if not exists '+TABLE_NAME+
  '(name VARCHAR(40) NOT NULL, '+
  'id INT NOT NULL, '+
  'tel VARCHAR(20) NOT NULL, '+
  'email VARCHAR(200) NOT NULL)'
  ,function(err){
  if(err) {
      console.log('[ERROR]:MySQL initial failed!\n'+err);
  } else {
      console.log('MySQL initial completed!');
  }
  });

exports.showUser = get_all_user;
exports.addUser = add_user;
exports.checkUser = check_user;
exports.query = query_user;