// 直接使用Hello对象
function Hello(){
    var name = 'qixqi';
    this.setName = function(name){
        this.name = name;
    };
    this.sayHello = function(){
        console.log('hello, ' + this.name);
    };
}

module.exports = Hello;