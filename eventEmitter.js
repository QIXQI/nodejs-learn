var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('some_event', function(){
    console.log('some_event 事件触发');
});

setTimeout(function(){
    eventEmitter.emit('some_event');
}, 1000);




// 一个事件可以有多个事件监听器
eventEmitter.on('someEvent', function(arg1, arg2){
    console.log('someEvent事件监听器1', arg1, arg2);
});

eventEmitter.on('someEvent', function(arg1, arg2){
    console.log('someEvent事件监听器2', arg1, arg2);
});

// 在监听器数组尾部添加一个监听器
// on 和 addListener等效
var listener1 = function listener1(arg1, arg2){
    console.log('someEvent添加监听器', arg1, arg2);
};
eventEmitter.addListener('someEvent', listener1);

// 注册单次监听器，触发后立刻解除绑定
eventEmitter.once('someEvent', function(arg1, arg2){
    console.log('someEvent单次监听器', arg1, arg2);
});

// 设置监听器限制的数量，默认10个
eventEmitter.setMaxListeners(11);

eventEmitter.emit('someEvent', 'arg1', 'arg2');     // 事件名，参数列表

// 指定事件的监听器数量
var count = eventEmitter.listenerCount('someEvent');
console.log(count);

// 在监听器数组中移除一个监听器
eventEmitter.removeListener('someEvent', listener1);
var count = eventEmitter.listenerCount('someEvent');
console.log(count);

// 指定事件的监听器数组
var listeners = eventEmitter.listeners('someEvent');
console.log(listeners);



// error 事件
// 一般要为error事件设置监听器，以防出现异常，程序直接终止
eventEmitter.on('error', function(err){
    console.error('Error: ', err);
});
eventEmitter.emit('error');
eventEmitter.emit('testError');     // 事件队列中没有该事件，触发error事件，但是没有输出
