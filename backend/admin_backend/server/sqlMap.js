
var sqlMap = {
    librarian_api: {
      search_id_exist: 'SELECT id FROM l_account WHERE id = ?',
      add: 'insert into l_account(id,em,pw) values(?,?,?)',
      select_one_info: 'select * from l_account where id = ?',
      select_all_info: 'select * from l_account',
      select_admin_info: 'select * from a_account',
      change_admin_pw: 'update a_account set pw=? where id=?'
    }
  }
  module.exports = sqlMap;
  