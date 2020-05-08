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

----------2020.04.15新增（用于修改超管自己的密码）--------------
select_admin_pw
(获得一个pw 返回该行（包括id，pw）)
'select * from a_account where pw=?'

change_admin_pw
(获得一个pw 查找数据库中id=root的行并且修改该行pw)
'update a_account set pw=? where id="root"'

---------2020.05.08新增（用于修改罚金 期限 保证金）-----------
（获得一个数值
更新数据库中对应的
罚金fine
期限period
保证金deposit）
change_fine:'update borrow set fine=? where id="1"',
change_period:'update borrow set period=? where id="1"',
change_deposit:'update borrow set deposit=? where id="1"'