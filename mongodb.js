const MongoClient = require('/Users/zhengxiang/.nvm/versions/node/v10.10.0/lib/node_modules/mongodb').MongoClient;
const url = 'mongodb://localhost:27017/test';

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// 创建数据库
MongoClient.connect(url, options, (err, db) => {
    if (err) throw err;
    console.log('数据库创建成功');

    // 创建集合
    var dbase = db.db('test');
    dbase.createCollection('site', function(err, res) {
        if (err) throw err;
        console.log('创建集合成功');

        // 插入一条数据
        var mysite = {name: 'qixqi', url: 'www.qixqi.cn'};
        dbase.collection('site').insertOne(mysite, (err, res) => {
            if (err) throw err;
            console.log('文档插入一条成功');

            // 插入多条数据
            var mysites = [
                {name: 'ourvultr', url: 'www.ourvultr.club'},
                {name: 'zhengxiang4056', url: 'www.zhengxiang4056.club'},
                {name: 'qixqi', url: 'www.qixqi.club'}
            ];
            dbase.collection('site').insertMany(mysites, (err, res) => {
                if (err) throw err;
                console.log('文档插入多条成功，插入数量：', res.insertedCount);


                // 查询数据
                var whereStr = {name: 'qixqi'};
                dbase.collection('site').find(whereStr).toArray(function(err, res){
                    if (err) throw err;
                    console.log(res);
                   
                    
                    // 更新一条数据
                    whereStr = {name: 'zhengxiang4056'};
                    var updateStr = {$set: {url: 'https://wwww.zhengxiang4056.club'}};
                    dbase.collection('site').updateOne(whereStr, updateStr, function(err, res){
                        if (err) throw err;
                        console.log('文档更新一条数据成功');


                        // 更新多条数据
                        whereStr = {name: 'qixqi'};
                        updateStr = {$set: {url: 'https://wwww.qixqi.cn'}};
                        dbase.collection('site').updateMany(whereStr, updateStr, function(err, res){
                            if (err) throw err;
                            console.log('文档更新多条数据成功，', res.result.nModified + '条被修改');


                            // 删除一条数据
                            whereStr = {name: 'qixqi'};
                            dbase.collection('site').deleteOne(whereStr, function(err, res){
                                if (err) throw err;
                                console.log('文档删除一条数据成功');

                                // 删除多条数据
                                whereStr = {name: 'qixqi'};
                                dbase.collection('site').deleteMany(whereStr, function(err, res){
                                    if (err) throw err;
                                    console.log('文档删除多条数据成功', res.result.n + '条数据被删除');


                                    // 排序
                                    var sitesort = {name: 1};       // 1 按name字段升序， -1 降序
                                    dbase.collection('site').find().sort(sitesort).toArray(function(err, res){
                                        if (err) throw err;
                                        console.log(res);


                                        // 查询分页
                                        // skip() 跳过指定条数
                                        // limit() 指定返回条数
                                        dbase.collection('site').find().skip(2).limit(2).toArray(function(err, res){
                                            if (err) throw err;
                                            console.log(res);


                                            // 删除集合
                                            dbase.collection('site').drop(function(err, res){
                                                if (err) throw err;
                                                if (res) console.log('集合删除成功');
                                                db.close();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});