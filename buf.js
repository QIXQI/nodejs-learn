// javascript 只有字符串数据类型，转换为二进制类型需要buffer
// Buffer 类似一个整数数组

// 创建Buffer
/**
 * Buffer.alloc(size, fill, encoding)   返回指定大小Buffer, 填充fill(默认0)
 * Buffer.allocUnsafe(size)    指定大小，不会初始化，需要Buffer.write() 或者 Buffer.fill()重写
 * 
 * Buffer.from(string, encoding)
 * Buffer.from(buffer)      复制
 * Buffer.from(array)       array元素只能是数字，否则为0
 * Buffer.from(bufferArray) 与bufferArray共享内存的buffer
 */


// encoding
/**
 * ascii, 7位
 * utf8
 * utf16le、ucs2
 * base64
 * latin1、binary   一字节编码字符串
 * hex 
 * 还可以指定undefined
 */ 


const buf1 = Buffer.alloc(10);
const buf2 = Buffer.alloc(10, 1);
// 比Buffer.alloc更快，危险
const buf3 = Buffer.allocUnsafe(10);

const buf4 = Buffer.from([1, 2, 3]);
const buf5 = Buffer.from('qixqi');



// 写入缓冲区
// Buffer.write(string, offset, length, encoding)  返回实际写入的大小
// 默认utf8编码
buf = Buffer.alloc(256);
len = buf.write('www.qixqi.club');
console.log('写入字节数: ' + len);

len5 = buf5.write('abcdef');
console.log('buf5重写后字节数：' + len5);



// 从缓存区读取数据
// Buffer.toString(encoding, start, end) 
// 默认utf8编码
buf = Buffer.alloc(26);
for(var i=0; i<26; i++){
    buf[i] = i + 97;
}
console.log(buf.toString('ascii'));
console.log(buf.toString('utf8', 0, 5));
console.log(buf.toString(undefined, 0, 5));



// Buffer 转换为 JSON
// Buffer.toJSON()
// JSON.stringify(buffer) 隐式调用 Buffer.toJSON()
buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
console.log('buf: ' + buf);     // buf没有输出
const json = JSON.stringify(buf);
console.log('buffer对象转为JSON字符串：' + json);

copy = JSON.parse(json);
console.log('JSON字符串解析为JSON对象：' + copy.data);
copy = JSON.parse(json, (key, value) => {
    // console.log('key: ' + key + ', value: ' + value + ', type: ' + value.type);
    // console.log('value: ' + value);
    // return value && value.type === 'Buffer' ? 1 : 2;
    return value && value.type === 'Buffer' ? Buffer.from(value.data) : value;
});
console.log(copy);      // Buffer
console.log(typeof(copy));      // 判断基本数据类型
console.log(Object.prototype.toString.call(copy));      // 判断具体对象类型，不可以判断自定义对象
console.log(copy instanceof Buffer);        // 判断具体对象类型，可以判断自定义对象
for(var i = 0; i<copy.length; i++){
    console.log(copy[i]);
}


// 缓冲区合并
// Buffer.concat(list, totalLength)     返回Buffer对象
buffer1 = Buffer.from('小象study ');
buffer2 = Buffer.from('www.qixqi.club');
buffer3 = Buffer.concat([buffer1, buffer2]);
console.log('buffer合并后：' + buffer3.toString());




// 缓冲区比较
// Buffer.compare(buffer2)  返回数字
buffer1 = Buffer.from('ABC');
buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);      //（从负到正）buffer1 在 buffer2 之前、相同、之后


// 缓冲区复制
// Buffer.copy(targetBuffer, targetStart, sourceStart, sourceEnd)  void
buffer1 = Buffer.from('abcdefghijk');
buffer2 = Buffer.from('QIXQI');
buffer2.copy(buffer1, 2);       // buffer2 复制到 buffer1指定位置
console.log(buffer1.toString());




// 缓冲区裁剪
// Buffer.slice(start, end)    返回Buffer
buffer1 = Buffer.from('qixqi');
buffer2 = buffer1.slice(0, 2);
console.log(buffer2.toString());




// 缓冲区长度
// Buffer.length   缓冲区分配的内存数，与内容无关
buffer1 = Buffer.from('qixqi');
console.log(buffer1.length);




// 缓冲区填充
// Buffer.fill(value, offset, end)
// 指定value填充缓冲区
buffer = Buffer.alloc(6);
buffer.fill(1, 0, 2);
console.log(buffer);
