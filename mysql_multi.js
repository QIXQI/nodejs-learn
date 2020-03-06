/* jshint esversion: 6 */
/**
 * mysql 执行多条查询语句
 */
const mysql = require('/Users/zhengxiang/.nvm/versions/node/v10.10.0/lib/node_modules/mysql');
var connection = mysql.createConnection({
    multipleStatements: true,       // 开启执行多条语句查询
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1214',
    database: 'qixqi_web'
});

connection.query('select * from upload; select * from twenties;', (err, results) => {
    if (err) throw err;
    console.log(results[0]);
    console.log(results[1]);
});

connection.end();