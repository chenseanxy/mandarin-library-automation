//sqlMap.js??sql??
var sqlMap = {
    announce_man_api: {
      insert_one:'INSERT INTO announcement(title,content) values(?,?)',
      delete_one:'DELETE FROM announcement WHERE id=?',
      update_one:'UPDATE announcement SET title=?,content=? WHERE id=?',
      search_one:'SELECT * FROM announcement WHERE title LIKE ? OR content LIKE ? ORDER BY id',
      search_all:'SELECT * FROM announcement ORDER BY id'
    }
  }
  module.exports = sqlMap;

/*
create table announcement(
  id int primary key not null auto_increment,
  title varchar(200),
  content varchar(10000),
  time timestamp default current_timestamp
);
*/