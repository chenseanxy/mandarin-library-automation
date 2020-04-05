//sqlMap.js??sql??
var sqlMap = {
    superadmin_api: {
      search_right: 'SELECT * FROM AdminAccount WHERE admin_account = ? AND password = ?'
    }
  }
  module.exports = sqlMap;
  