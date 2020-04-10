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

router.post('/check_isbn', (req, res) => {
  var sql = $sql.book_man_api.check_isbn;
  var param = req.body;
  console.log("sql", sql);
  console.log(param);
  conn.query(sql, [param.isbn], function (err, doc) {
    //console.log(doc);
    if (err) {
      console.log(err);
      res.send('-1');
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
    conn.query(sql, [ param.booktitle, param.isbn,param.publisher,param.author,param.status], function (err, doc) {
        //console.log(doc);
        if (err) {
            console.log(err);
            res.send('-1');
        }
        if (doc) {
            jsonWrite(res,doc);
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
