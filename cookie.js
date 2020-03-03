const express = require('/Users/zhengxiang/.nvm/versions/node/v10.10.0/lib/node_modules/express');
const cookieParser = require('/Users/zhengxiang/.nvm/versions/node/v10.10.0/lib/node_modules/cookie-parser');
var util = require('util');

var app = express();
app.use(cookieParser());

app.get('/', function(req, res){
    console.log('Cookies: ', util.inspect(req.cookies));        // util.inspect 将任意对象转为字符串
});

app.listen(8081);