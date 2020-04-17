//sqlMap.js??sql??
var sqlMap = {
    librarian_api: {
      search_right: 'SELECT * FROM LibrarianAccount WHERE librarian_account = ? AND password = ?' ,
      change_password: 'INSERT INTO librarian_change_password VALUES(?,?)'
    }
  }
  module.exports = sqlMap;