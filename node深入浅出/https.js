// 卧槽，太奇怪了，在阿里云ubuntu服务器中，443、80端口需要在root下执行 node https.js 才行，否则报端口占用的error
// 其他端口在普通用户下执行就可以

const https = require('https');
const fs = require('fs');

const options = {
    // IIS
    pfx: fs.readFileSync('/home/ubuntu/RSA/www.ourvultr.club/IIS/www.ourvultr.club.pfx'),
    passphrase: 'l78a9zlc8q2'
};

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('Hello World!\n');
}).listen(443, function(){
    console.log('visit https://www.ourvultr.club');     
});