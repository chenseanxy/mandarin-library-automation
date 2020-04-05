//sqlMap.js??sql??
var sqlMap = {
    librarian_api: {
      search_right: 'SELECT * FROM LibrarianAccount WHERE librarian_account = ? AND password = ?'
    }
  }
  module.exports = sqlMap;