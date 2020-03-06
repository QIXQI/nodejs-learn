var Hello1 = require('./module_hello1');
var hello1 = new Hello1();
hello1.setName('zhengxiang');
hello1.sayHello();


var hello2 = require('./module_hello2');
hello2.world();
