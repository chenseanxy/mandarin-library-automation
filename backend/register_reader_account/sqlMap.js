//sqlMap.js??sql??
var sqlMap = {
    librarian_api: {
      search_right: 'SELECT * FROM LibrarianAccount WHERE librarian_account = ? AND password = ?' ,
      change_password: 'INSERT INTO librarian_change_password VALUES(?)' ,
      register_account: 'INSERT INTO readeraccount VALUES(?,?,?,?)' ,
      search_all:'SELECT reader_account,email,status FROM readeraccount'
    }
  }
  module.exports = sqlMap;