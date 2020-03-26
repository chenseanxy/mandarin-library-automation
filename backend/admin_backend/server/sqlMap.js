//sqlMap.js??sql??
var sqlMap = {
    librarian_api: {
      search_id_exist: 'SELECT id FROM l_account WHERE id = ?',
      add: 'insert into l_account(id,em,pw) values(?,?,?)'
    }
  }
  module.exports = sqlMap;
  