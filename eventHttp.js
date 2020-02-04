let http = require('http');

// 返回 http.Server
let server = http.createServer((req, res) => {
    // http模块的STATUS_CODES方法，获取一个包含状态码和状态信息的对象
    res.writeHead(418, http.STATUS_CODES['418'], {
        'Content-Type': 'text/html'
    });
    // http.ServerResponse 对象绑定finish事件的监听
    res.addListener('finish', () => {
        console.log('server response is finished');
    });
}).listen(1234, () => {
    console.log('http server starts http://127.0.0.1:1234');
});


// http.Server 继承自 net.Server 
// net.Server 继承自 EventEmitter
server.on('connection', () => {
    console.log('a client has connected to the server!');
});