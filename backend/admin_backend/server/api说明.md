api格式为'/api/user/...'

其中'...'部分可替换为下列的 子api名称 以实现相关功能
子api的名称、功能、sql语句如下：

search_id_exist
（获得一个id 返回该id）
'SELECT id FROM l_account WHERE id = ?'

add
（获得id，email，password 插入到数据表l_account中）
'insert into l_account(id,em,pw) values(?,?,?)'

select_one_info
（获得一个id 返回该行（即账号、邮箱、密码））
'select * from l_account where id = ?'

select_all_info
（返回l_account中所有行）
'select * from l_account'