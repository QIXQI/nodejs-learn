const MongoClient = require('/Users/zhengxiang/.nvm/versions/node/v10.10.0/lib/node_modules/mongodb');
const url = 'mongodb://localhost:27017/test';

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};


MongoClient.connect(url, options, (err, db) => {
    if (err) throw err;
    console.log('连接test成功');

    const dbase = db.db('test');
    
    // createIndex
    var simpleIndex = {name: 1, url: -1};
    dbase.collection('site').createIndex(simpleIndex, null, (err, res) => {
        if (err) throw err;
        console.log('Simple Index created: ', res);     // res: name_1_url_-1
        db.close();
    });


    // createIndexes
    var rawIndex = [{
        key: {name: 1, url: -1, type: 1},
        name: 'site_name_url_type'
    }];
    dbase.collection('site').createIndexes(rawIndex, null, (err, res) => {
        if (err) throw err;
        console.log('rawIndex created: ', res);
        db.close();
    });
});
