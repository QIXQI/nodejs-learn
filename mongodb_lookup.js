// 使用 look_up 实现左连接
const MongoClient = require('/Users/zhengxiang/.nvm/versions/node/v10.10.0/lib/node_modules/mongodb');
const url = 'mongodb://localhost:27017/test';

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};


// 连接数据库
MongoClient.connect(url, options, function(err, db){
    if (err) throw err;
    console.log('连接数据库成功');

    const dbase = db.db('test');
    var myorder = {_id: 1, product_id: 154, status: 1};
    dbase.collection('orders').insertOne(myorder, (err, res) => {
        if (err) throw err;
        console.log('创建orders集合成功');

        var myproducts = [
            {_id: 154, name: '笔记本'},
            {_id: 155, name: '耳机'},
            {_id: 156, name: '台式机'}
        ];
        dbase.collection('products').insertMany(myproducts, (err, res) => {
            if (err) throw err;
            console.log('创建products集合成功: ', res.insertedCount);

            
            // 左连接
            dbase.collection('orders').aggregate([{
                $lookup: { 
                    from: 'products', 
                    localField: 'product_id',
                    foreignField: '_id',
                    as: 'orderdetails'
                }
            }]).toArray(function(err, res){
                if (err) throw err;
                console.log(JSON.stringify(res));       // Object 数据输出
                // console.log(res);                    // Object 数据不输出

                dbase.collection('orders').drop((err, res) => {
                    if (err) throw err;
                    dbase.collection('products').drop((err, res) => {
                        if (err) throw err;
                        db.close();
                    });
                });
            });
        });
    });

});