
var sqlMap = {
    librarian_api: {
      search_id_exist: 'SELECT id FROM l_account WHERE id = ?',
      add: 'insert into l_account(id,em,pw) values(?,?,?)',
      select_one_info: 'select * from l_account where id = ?',
      select_all_info: 'select * from l_account',
      select_admin_pw: 'select * from a_account where pw=?',
      change_admin_pw: 'update a_account set pw=? where id="root"'
    }
  }
  module.exports = sqlMap;
  