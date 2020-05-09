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

router.post('/check_id', (req, res) => {
  var sql = $sql.book_man_api.check_id;
  var param = req.body;
  console.log("sql", sql);
  console.log(param);
  conn.query(sql, function (err, doc) {
    //console.log(doc);
    if (err) {
      console.log(err);
    }
    if (doc) {
      jsonWrite(res, doc);
    }
  })
})

router.post('/change_id', (req, res) => {
  var sql = $sql.book_man_api.change_id;
  var param = req.body;
  
  console.log("sql", sql);
  console.log(param);
  conn.query(sql,[], function (err, doc) {
    if (err) {
      console.log(err);
    }
    if (doc) {
      jsonWrite(res, doc);
    }
  })
})

router.post('/addbook',(req, res)=> {
    var sql = $sql.book_man_api.insert;
    var param = req.body;
    console.log("sql",sql);
    console.log(param);
    conn.query(sql, [ param.book_id, param.bookname,param.author,param.category,param.location,param.price,param.state], function (err, doc) {
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
  var sql = $sql.book_man_api.search_all;
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
  var sql = $sql.book_man_api.search_one;
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

router.get('/getBookList', (req, res) => {
  var sql_name = $sql.book_man_api.search;
  var params = req.body;
  console.log(params);
  if (params) {
    sql_name += "where username ='" + params.name + "'";
  }
  conn.query(sql_name, params.name, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
    if (result[0] === undefined) {
      res.send('-1');
    } else {
      jsonWrite(res, result);
    }
  })
}
);

module.exports = router
