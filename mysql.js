const mysql = require('/Users/zhengxiang/.nvm/versions/node/v10.10.0/lib/node_modules/mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1214',
    port: '3306', 
    database: 'qixqi_web'
});

// 连接 mysql
conn.connect();

// 查询数据
var sql = 'select * from upload';
conn.query(sql, function(err, results, fields){
    // if (err) throw err;
    if (err){
        console.log('[SELECT ERROR] - ', err.message);
        return;
    }
    console.log('-------------------------------查询数据-----------------------------\n');
    console.log(results);
    console.log('----------------------------------------------------------------\n\n');
});


// 添加数据
sql = 'insert into upload(filename, filetype, filesize, username, uploadtime, uploadPath) values (?, ?, ?, ?, ?, ?)';
var params = ['node深入浅出.txt', 'text/txt', '2.41M', 'nodejs', '2020-03-02 21:23:00', '../upload/node深入浅出.txt'];
conn.query(sql, params, function(err, results, fields){
    if (err){
        console.log('INSERT ERROR - ', err.message);
        return;
    }
    console.log('-------------------------------插入数据-----------------------------\n');
    console.log('insert id: ', results);
    console.log('----------------------------------------------------------------\n\n');
});



// 更新数据
sql = 'update upload set username = ?, uploadtime = ? where filename = ?';
params = ['node', '2020-03-02 21:30:12', 'node深入浅出.txt'];
conn.query(sql, params, function(err, results){
    if (err){
        console.log('[UPDATE ERROR] - ', err.message);
        return;
    }
    console.log('-------------------------------更新数据-----------------------------\n');
    console.log('update affectedRows: ', results.affectedRows);     // 更改多少行：1
    console.log('----------------------------------------------------------------\n\n');
});


// 删除数据
sql = 'delete from upload where filename = ?';
params = ['node深入浅出.txt'];
conn.query(sql, params, function(err, results){
    if (err){
        console.log('[DELETE ERROR] - ', err.message);
        return;
    }
    console.log('-------------------------------删除数据-----------------------------\n');
    console.log('delete affectedRows: ', results.affectedRows);     // 删除多少行：1
    console.log('----------------------------------------------------------------\n\n');
});


// 关闭 mysql
conn.end();
