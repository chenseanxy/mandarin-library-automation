
var sqlMap = {
    librarian_api: {
      search_id_exist: 'SELECT id FROM l_account WHERE id = ?',
      add: 'insert into l_account(id,em,pw) values(?,?,?)',
      select_one_info: 'select * from l_account where id = ?',
      select_all_info: 'select * from l_account',

      select_admin_pw: 'select * from a_account where pw=?',
      change_admin_pw: 'update a_account set pw=? where id="root"',

      select_fine: 'select fine from borrow where id="1"',
      select_period: 'select period from borrow where id="1"',
      select_deposit: 'select deposit from borrow where id="1"',
      change_fine:'update borrow set fine=? where id="1"',
      change_period:'update borrow set period=? where id="1"',
      change_deposit:'update borrow set deposit=? where id="1"'
    }
  }
  module.exports = sqlMap;
  