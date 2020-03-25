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
      for(var i = 0; i < result.length; i++){//这几行感觉好像没用 。。。 暂时先不删了反正可以跑
        console.log("请求回来！",result[i])
        console.log("请求结果！",typeof result[i],result[i].userpsw);
        if (result[i].userpsw == params.userpsw) {
            res.send("返回回来了！");
        }
    }
    }
  })
})

module.exports = router
