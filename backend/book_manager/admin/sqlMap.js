//sqlMap.js??sql??
var sqlMap = {
    book_man_api: {
      insert:'INSERT INTO book(booktitle,isbn,publisher,author,status) VALUES(?,?,?,?,?)',
      search:'SELECT * FROM book',
      check_isbn:'SELECT * FROM book WHERE isbn= ? '
    }
  }
  module.exports = sqlMap;

/*
 CREATE TABLE Book (
      booktitle  varchar(255) NOT NULL,
      isbn  varchar(255) NOT NULL,
      publisher  varchar(255) NULL,
      author  varchar(255) NULL,
      status  varchar(255) NULL,
      PRIMARY KEY (isbn)
);
*/