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

router.post('/insert_one',(req, res)=> {
    var sql = $sql.announce_man_api.insert_one;
    var param = req.body;
    console.log("sql",sql);
    console.log(param);
    conn.query(sql, [param.title,param.content], function (err, doc) {
        console.log(doc);
        if (err) {
            console.log(err);
            //res.send('-1');
        }
        if (doc) {
            jsonWrite(res,doc);
        }
    })
})

router.post('/search_all', (req, res) => {
  var sql = $sql.announce_man_api.search_all;
  var param = req.body;
  console.log("sql", sql);
  console.log(param);
  conn.query(sql, function (err, doc) {
    if (err) {
      console.log(err);
    }
    if (doc) {
      jsonWrite(res, doc);
    }
  })
})

router.post('/search_one', (req, res) => {
  var sql = $sql.announce_man_api.search_one;
  var ask=req.body.ask;
  var param = [ask, ask];
  console.log("sql", sql);
  console.log(param);
  conn.query(sql,param,function (err, doc) {
    if (err) {
      console.log(err);
    }
    if (doc) {
      jsonWrite(res, doc);
    }
  })
})

router.post('/update_one', (req, res) => {
  var sql = $sql.announce_man_api.update_one;
  var param = [req.body.titel, req.body.content,req.body.id];
  console.log("sql", sql);
  console.log(param);
  conn.query(sql, param, function (err, doc) {
    if (err) {
      console.log(err);
    }
    if (doc) {
      jsonWrite(res, doc);
    }
  })
})

router.post('/delete_one', (req, res) => {
  var sql = $sql.announce_man_api.delete_one;
  console.log("sql", sql);
  conn.query(sql,req.body.id, function (err, doc) {
    if (err) {
      console.log(err);
    }
    if (doc) {
      jsonWrite(res, doc);
    }
  })
})

module.exports = router
