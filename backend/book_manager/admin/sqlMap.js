//sqlMap.js??sql??
var sqlMap = {
    book_man_api: {
      insert:'INSERT INTO book(book_id,bookname,author,category,location,price,state) VALUES(?,?,?,?,?,?,?)',
      search_all:'SELECT * FROM book ORDER BY book_id',
      check_id:'SELECT * FROM book_id',
      change_id:'UPDATE book_id SET value = value+1',
      search_one:'SELECT * FROM book WHERE book_id LIKE ? OR bookname LIKE ? OR author LIKE ? OR category LIKE ? OR location LIKE ?  ORDER BY BOOK_id',
      update_one:'UPDATE book SET bookname=?,author=?,category=?,location=?,price=?,state=? WHERE book_id=?',
      delete_one:'DELETE FROM book WHERE book_id=?'
    }
  }
  module.exports = sqlMap;

/*
 CREATE TABLE book (
  book_id varchar(255) NOT NULL,
  bookname  varchar(255) NOT NULL,
  author  varchar(255) ,
  category varchar(255) NOT NULL,
  location varchar(255) NOT NULL,
  price  int NOT NULL,
  state  varchar(255) NOT NULL,
  PRIMARY KEY (book_id)
);

CREATE TABLE book_id(
   value int not NULL
)
Insert into book_id(value) VALUES(1);
*/