/*jshint esversion: 6 */
const mysql = require('/Users/zhengxiang/.nvm/versions/node/v10.10.0/lib/node_modules/mysql');

// 创建连接池
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1214',
    database: 'qixqi_web'
});

// 从连接池中获取一个连接
pool.getConnection((err, connection) => {
    // 查询数据库
    connection.query('SELECT * FROM upload', (err, result) => {
        if (err) throw err;
        console.log(result);
    });
    // 释放连接
    connection.release();
    
    pool.end();     // 连接池关闭后终端才退出
});

