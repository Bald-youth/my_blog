const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

// 获取默认连接
const db = mongoose.connection;

// 绑定连接错误事件
db.on('error', console.error.bind(console, '连接错误：'));

// 绑定连接成功事件
db.once('open', function() {
    console.log("数据库连接成功");
});
