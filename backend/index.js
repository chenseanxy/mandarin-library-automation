// node 后端服务器
const Api_an = require('./announce_manager/admin/api/announce_man_api');
const Api_book = require('./book_manager/admin/api/book_man_api');

const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/announce', Api_an);
app.use('/api/book', Api_book);
// 后端api路由

// 监听端口
app.listen(3000);

console.log('success listen at port:3000......');
