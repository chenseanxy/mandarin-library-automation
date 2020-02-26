
# User

User用户：用于保存用户的ID、用户名、密码和用户类型等登录信息。

## 属性

- `id`: UUID类型，主键，创建时会随机生成一个新的，JSON化需转为字符串
- `username`: 用户名，字符串类型，unique
- `hash`, `salt`: 存储加盐哈希后的密码，均为256位二进制值
- `role`: 角色，字符串，有效值："admin", "librarian", "reader"

## 方法

- 静态方法`new_user`: 创建指定的用户
  - 参数: username:用户名，password:密码（明文），role:角色
  - 行为：创建一个新的User对象（不会保存到数据库），为其随机生成一个ID并将其密码加盐哈希，而后返回该User对象。
    - 若username已被占用则会抛出`Value Error: Invalid role`的异常。
  - 注：使用完后请务必`db.session.add`, `db.session.commit`

- 静态方法`create_hash`: 创建哈希并加盐
  - 参数：password:明文密码，salt:（可选）已经存储过的salt
  - 行为：根据给出的密码和salt得出哈希值，如果没给出salt则随机生成一个，而后返回hash和salt值。

- 静态方法`username_available`: 检查用户名是否能够使用
  - 参数：username:期望使用的用户名
  - 行为：判断是否可用，如果不可用返回false

- `check_password`: 检查密码是否正确
  - 参数：password:登录使用的密码
  - 行为：若密码正确返回True

- `json`: 返回用户的json形式，包含id, username
