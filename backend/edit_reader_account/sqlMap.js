//sqlMap.js??sql??
var sqlMap = {
    librarian_api: {
      search_right: 'SELECT * FROM LibrarianAccount WHERE librarian_account = ? AND password = ?' ,
      change_password: 'INSERT INTO librarian_change_password VALUES(?)' ,
      register_account: 'INSERT INTO readeraccount VALUES(?,?,?,?)' ,
      search_all:'SELECT reader_account,email,status FROM readeraccount',
      delete_reader_account:'DELETE from readeraccount where reader_account = ?',
      search_from_id:'SELECT reader_account,email,status FROM readeraccount WHERE reader_account = ? or email = ?',
      show_book_record:'select * from BookRecording',
      show_book:'select * from book',
      search_for_loan_and_return:'select * from BookRecording WHERE operator = ? or account = ? or book_id = ? or book_title = ?',
      search_for_penalty_records:'select * from BookRecording WHERE operator = ? or account = ? or book_id = ? or book_title = ?',
      search_for_books:'SELECT * FROM book WHERE book_title = ? or Author = ? or publisher = ? or ISBN = ?'
    }
  }
  module.exports = sqlMap;