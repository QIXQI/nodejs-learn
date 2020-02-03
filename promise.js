function runAsync(){
    // new Promise对象时，传进去的对象已经执行，所以一般将Promise包含在一个函数中，需要时调用
    var p = new Promise(function(resolve, reject) {     // resolve: fullfield状态, reject: rejected状态
        // 异步操作
        setTimeout(function() {
            console.log('执行完成');
            resolve('随便嘛');
        }, 2000);
    });

    return p;       // 返回Promise对象
}

/* runAsync().then(function(data){
    // then方法中函数参数的参数data是resolve方法传进去的数据
    console.log(data);
});*/




// 链式回调
function runAsync1(){
    var p = new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('执行任务1');
            resolve('呵呵1');
        }, 2000);
    });
    return p;
}

function runAsync2(){
    var p = new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('执行任务2');
            resolve('呵呵2');
        }, 1000);
    });
    return p;
}

function runAsync3(){
    var p = new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('执行任务3');
            resolve('呵呵3');
        }, 1000);
    });
    return p;
}

/* runAsync1()
.then(function(data){
    console.log(data);
    return runAsync2();
})
.then(function(data){
    console.log(data);
    return runAsync3();
})
.then(function(data){
    console.log(data);
    return '直接返回数据';      // 后面的then方法直接接收数据
})
.then(function(data){
    console.log(data);
});*/




// reject方法
function getNumber(){
    var p = new Promise(function(resolve, reject){
        // 异步操作
        setTimeout(function(){
            var num = Math.ceil(Math.random() * 10);    // 1-10随机数, Math.ceil向上取整
            if(num <= 5){
                resolve(num);
            } else{
                reject('数字太大了');
            }
        }, 1000);
    });
    return p;
}

/* getNumber()
.then(
    // then方法中可以有两个参数，第一个对应resolve的回调，第二个对应reject的回调
    function(data){
        console.log('resolved');
        console.log(data);
        // console.log(somedata);
    }, 
    function(reason, data){
        console.log('rejected');
        console.log(reason);
        // console.log(data);       // undefined
    }
);*/



// catch方法
/* getNumber()
.then(function(data){
    console.log('resolved');
    console.log(data);
    console.log(somedata);
})
.catch(function(reason){
    // catch方法和then方法中的第二个参数方法类似，但还可以捕捉resolve回调中的异常
    console.log('rejected');
    console.log(reason);
});*/




// all方法
Promise
.all([
    // all 接收一个数组参数
        runAsync1(), 
        runAsync2(), 
        runAsync3()]
    )       // 并行执行异步操作，所有异步操作执行完成后才执行回调
.then(function(results){
    // all 方法把所有异步操作的结果生成数组，回调给then方法
    console.log(results);
});



// race 方法
Promise
.race([runAsync1(), runAsync2(), runAsync3()])     // race 方法和all方法类似，不过以最快异步操作为准执行回调（输出结果只有一个异步操作的结果回调）
.then(function(results) {
    console.log(results);
});





// race 方法应用
function requestImg(){
    // 异步操作，请求图片资源
    var p = new Promise(function(resolve, reject){
        var img = new Image();      // nodejs 中似乎没有Image
        img.onload = function(){
            resolve(img);
        };
        img.src = 'xxxxxx';
    });
    return p;
}

function timeout(){
    // 异步操作，延时函数，请求计时
    var p = new Promise(function(resolve, reject){
        setTimeout(function(){
            reject('图片请求超时');
        }, 5000);
    });
    return p;
}


Promise
.race([requestImg(), timeout()])
.then(function(results){
    console.log(results);
})
.catch(function(reason){
    console.log(reason);
});