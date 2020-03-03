## MongoDB 学习
### 安装
1. [官网下载](https://www.mongodb.com/download-center#community)
2. 解压到 /usr/local/，重命名为mongodb
3. 添加环境变量，在 ~/.bash_profile 中追加

```bash
export PATH=/usr/local/mongodb/bin:$PATH
```

4. 开启服务端

```bash
sudo mongod --dbpath=sudo mongod --dbpath=/Users/zhengxiang/Desktop/hello/data/mongodb
```

5. 客户端运行

```bash
mongo
```

### 概念解析

|     SQL     |   MongoDB   |                说明                |
| :---------: | :---------: | :--------------------------------: |
|  database   |  database   |               数据库               |
|    table    | collection  |              表/集合               |
|     row     |  document   |              行/文档               |
|   column    |    field    |              字段/域               |
|    index    |    index    |                索引                |
| table joins |             |       表连接；MongoDB不支持        |
| primary key | primary key | 主键，MongoDB自动将_id字段设为主键 |

#### 集合

* capped collections 固定大小的collection

```bash
db.createCollection('mycoll', {capped: true, size: 100000})
```

* capped collections特性
  * 高性能自动的维护对象的插入顺序，可以按照文档的插入顺序保存到集合中
  * 存储空间固定，不会增加
  * 增添数据效率高
  * 可以更新数据
  * 不可以删除单个文档，可以删除全部
  * 删除后必需显示重新创建

#### 元数据

|   （数据库名: dbname）   |        说明        |
| :----------------------: | :----------------: |
| dbname.system.namespaces |      命名空间      |
|  dbname.system.indexes   |        索引        |
|  dbname.system.profile   |   数据库概要信息   |
|   dbname.system.users    |     可访问用户     |
|  dbname.system.sources   | 服务器的信息和状态 |



**注意**

*1. document 不需要设置相同字段，相同字段也不需要相同的数据类型*

*2. document 键值对有序，键是字符串*

*3. mongoDB 区分大小写*

#### 常用命令

1. show dbs   显示数据库列表
2. db              显示当前数据库对象或集合
3.  use local   连接local数据库

#### 常用数据类型

1. ObjectId，文档中必须有_id键，默认是ObjectId对象，ObjectId包含了时间戳

```bash
> var newObject = new ObjectId()
> newObject.getTimestampe()
ISODate("2020-03-03T06:21:22Z")

> newObject.str
5e5df762f33a8f1a76a1119e
```

2. 时间戳，MongoDB内部使用，与日期类型无关
3. 日期

```javascript
> var date = new Date()
> date
ISODate("2020-03-03T06:24:41.242Z")

> date.toString()
Tue Mar 03 2020 14:24:41 GMT+0800 (CST)
```



### MongoDB 连接

* Uri 连接

```bash
mongodb://[user:pass@]host1[:port1][,host2:port2],...,[/dbname][?options]
```



### MongoDB 创建数据库

```bash
use dbnam			# 不存在则创建
```

*数据库（或集合）只有在插入数据时，才真正创建*



### MongoDB 删除数据库

```bash
db.dropDatebase()		# 删除当前数据库
```

### MongoDB 创建集合

```bash
db.createCollection(name, options)		# 在当前数据库下创建集合
```

* options

| key         | type    | 说明                        |
| ----------- | ------- | --------------------------- |
| capped      | boolean | true: 创建固定集合          |
| autoIndexId | boolean | true: 自动在_id字段创建索引 |
| size        | number  | 固定集合的最大值            |
| max         | number  | 固定集合包含文档的最大数    |

```bash
db.createCollection('qixqi', {capped: true, size: 100000})

# MongoDB 不需要创建集合，插入document自动创建
db.qixqi.insert({"name": "qixqi"})
```



### MongoDB 删除集合

```bash
# 删除集合
show collections	# 列出当前数据库的集合
db.qixqi.drop()		# 删除集合 qixqi
```



### MongoDB 插入文档

* MongoDB 数据格式是BSON(JSON二进制形式)

```bash
db.qixqi.insert({
	title: "qixqi",
	site: "www.qixqi.cn"
})

# 不指定 _id字段，两者类似，如果指定，则更新 _id 的数据
db.qixqi.save({
	title: "qixqi",
	site: "www.qixqi.cn"
})
```

* 一次插入多条数据

```bash
var arr = [];

for (var i=1; i<=2000; i++){
	arr.push({num: i});
}

db.qixqi.insert(arr);
```

* 3.2 版本之后
  * db.collection.insertOne()
  * db.collection.insertMany()

```bash
db.qixqi.insertOne({"a": 3})

db.qixqi.insertMany([{"b": 3}, {"c":4}])
```

