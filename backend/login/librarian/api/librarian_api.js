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


router.post('/search_right',function(req, res, next) {
  var sql = $sql.librarian_api.search_right;
  var param = {
    account : req.body.account,
    password : req.body.password
  }
  console.log(param);
  conn.query(sql, [param.account,param.password], function(err, doc) {
    console.log(doc);
    if (err) {
      res.json({
        code: "1",
        msg : "账号密码不对"
      });
    }
      if(doc)
      {
        jsonWrite(res, doc);
      }
    })
})

router.post('/change_password',function(req, res, next) {
  var sql = $sql.librarian_api.change_password;
  var param = {
    account : req.body.account,
    password : req.body.password
  }
  console.log(param);
  conn.query(sql, [param.account,param.password], function(err, doc) {
    console.log(doc);
    if (err) {
      res.json({
        code: "1",
        msg : "账号密码不对"
      });
    }
      if(doc)
      {
        jsonWrite(res, doc);
      }
    })
})

module.exports = router
