// nodejs 事件请求和处理分开，异步执行，高并发
var events = require('events');

// 创建EventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 创建事件驱动程序
var connectHandler = function connected(){
    console.log('连接成功');
    eventEmitter.emit('data_received');      // 触发 data_received事件
};

// 绑定connection事件处理程序
eventEmitter.on('connection', connectHandler);

// 绑定data_received事件处理程序 -- 匿名函数
eventEmitter.on('data_received', function(){
    console.log('数据接收成功');
});


// 触发connection事件
eventEmitter.emit('connection');

console.log('程序执行完成');