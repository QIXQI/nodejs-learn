const express = require('/Users/zhengxiang/.nvm/versions/node/v10.10.0/lib/node_modules/express');
const bodyParser = require('/Users/zhengxiang/.nvm/versions/node/v10.10.0/lib/node_modules/body-parser');
var app = express();


// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({extended: false});


app.use('/static', express.static('static'));


app.get('/', (req, res) => {
    res.send('Hello world');
    console.log('[GET] - 主页请求');
});


app.post('/', (req, res) => {
    res.send('Hello world');
    console.log('[POST] - 主页请求');
});


app.get('/del_user', (req, res) => {
    res.send('删除用户');
    console.log('[GET] - /del_user 请求');
});

app.get('/list_user', (req, res) => {
    res.send('用户列表');
    console.log('[GET] - /list_user 请求');
});


// 正则匹配：abcd, abbcd ...
app.get('/ab*cd', (req, res) => {
    res.send('正则匹配');
    console.log('[GET] - /ab*cd 请求');
});


// 传送到静态文件
// http://127.0.0.1:8081/index.htm
app.get('/index.htm', (req, res) => {
    res.sendFile(__dirname + '/' + 'express_demo.htm');
});



// http://127.0.0.1:8081/process_get
app.get('/process_get', (req, res) => {
    var response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
}); 


app.post('/process_post', urlencodedParser, (req, res) => {
    var response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});











var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('访问地址 http://%s:%s', host, port);
    // console.log(host, port);
});