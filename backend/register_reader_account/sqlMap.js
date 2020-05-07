//sqlMap.js??sql??
var sqlMap = {
    librarian_api: {
      search_right: 'SELECT * FROM LibrarianAccount WHERE librarian_account = ? AND password = ?' ,
      change_password: 'INSERT INTO librarian_change_password VALUES(?)' ,
      register_account: 'INSERT INTO readeraccount VALUES(?,?,?,?)' ,
      search_all:'SELECT reader_account,email,status FROM readeraccount',
      search_from_id:'SELECT reader_account,email,status FROM LibrarianAccount WHERE reader_account = ? or email = ?',
      show_book_record:'select * from BookRecording'
    }
  }
  module.exports = sqlMap;