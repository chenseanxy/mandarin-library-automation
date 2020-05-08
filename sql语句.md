Admin部分：

图管账户表：
从上至下：
账号（主键）
邮箱
密码
create table l_account(
id varchar(50),
em varchar(50),
pw varchar(50),
primary key(id)
);

超管账户表：
从上至下：
账号（主键）
密码
create table a_account(
id varchar(50),
pw varchar(50),
primary key(id)
);

初始化：
insert into a_account(id,pw) values("root","root");


书籍逾期罚金/归还期限/保证金表：
从上至下：
罚金
归还日期
保证金
create table borrow(
id varchar(50),
fine numeric(10,2),
period int,
deposit numeric(10,2),
primary key(id)
);

初始化：
insert into borrow(id,fine,period,deposit) values("1",1,30,300);
