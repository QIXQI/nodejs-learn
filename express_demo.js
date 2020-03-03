const express = require('/Users/zhengxiang/.nvm/versions/node/v10.10.0/lib/node_modules/express');
var app = express();


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











var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('访问地址 http://%s:%s', host, port);
    // console.log(host, port);
});