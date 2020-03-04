const express = require('/Users/zhengxiang/.nvm/versions/node/v10.10.0/lib/node_modules/express');
const bodyParser = require('/Users/zhengxiang/.nvm/versions/node/v10.10.0/lib/node_modules/body-parser');
const multer = require('/Users/zhengxiang/.nvm/versions/node/v10.10.0/lib/node_modules/multer');
const fs = require('fs');
var app = express();

app.use('/static', express.static('static'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest: '/tmp/'}).array('image'));


app.get('/index.htm', (req, res) => {
    res.sendFile(__dirname + '/' + 'file_upload.htm');
});


app.post('/file_upload', (req, res) => {
    console.log(req.files[0]);      // 上传文件信息
    var des_file = __dirname + '/static/images/' + req.files[0].originalname;
    fs.readFile( req.files[0].path, (err, data) => {
        fs.writeFile( des_file, data, (err) => {
            if (err) throw err;
            var response = {
                message: '文件上传成功',
                filename: req.files[0].originalname
            };
            console.log(response);
            // 声明头，处理中文乱码
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            // 和上面效果相同
            res.write('<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>');
            res.end(JSON.stringify(response));
        });
    });
});



var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('visit http://%s:%s', host, port);
});

