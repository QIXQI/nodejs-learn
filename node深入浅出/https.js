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
}).listen(8080, function(){
    console.log('visit https://www.ourvultr.club:8080');
});