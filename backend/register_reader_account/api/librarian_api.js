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
    account : req.body.account
  }
  console.log(param);
  conn.query(sql, [param.account], function(err, doc) {
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


router.post('/register_account',function(req, res, next) {
  var sql = $sql.librarian_api.register_account;
  var param = {
    account : req.body.account,
    password : req.body.password,
    email : req.body.email
  }
  console.log(param);
  conn.query(sql, [param.account,param.password,param.email], function(err, doc) {
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

router.post('/search_all', (req, res) => {
  var sql = $sql.librarian_api.search_all;
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

router.get('/getAccountList', (req, res) => {
  var sql_name = $sql.librarian_api.getAccountList;
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