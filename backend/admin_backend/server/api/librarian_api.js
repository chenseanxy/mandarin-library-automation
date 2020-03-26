var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

// 定义 接口 为图书管理员注册账号
router.post('/add', (req, res) => {
  var sql = $sql.librarian_api.add;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.id, params.em, params.pw], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
})

router.post('/search_id_exist', (req, res) => {
  var sql = $sql.librarian_api.search_id_exist;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.id], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
})

module.exports = router
