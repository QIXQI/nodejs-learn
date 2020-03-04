# nodejs-learn

### Problem
1. express 框架，默认采用ipv6模式，地址最好显示指定为 '127.0.0.1' 或 'localhost'
```javascript
var express = require('express');
var app = express();

var server = app.listen(8081, '127.0.0.1', (){      // address 不指定时：visit http://:::8081
    var host = server.address().address;
    var port = server.address().port;
    console.log('visit http://%s:%s', host, port);      // visit http://127.0.0.1:8081
});
```
