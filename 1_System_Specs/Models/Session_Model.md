# Session

Session会话：用于保存用户登陆状态相关信息。

## 属性

- `id`: Session ID, UUID类型，主键，创建时会随机生成一个新的。
- `uid`: 对应用户的id，UUID类型，外键对应user.id
- `user`: 对应的用户
- `expire`: 过期时间，DateTime类型

## 关系

- session.user -> User
- user.sessions -> Session

## 方法

- 静态方法`new_session`: 创建对应用户的一个会话
  - 参数: username:用户名，expire:(可选)过期时间(可为时间戳或datetime)
  - 行为：创建一个新的Session对象（不会保存到数据库），为其随机生成一个ID，而后返回该User对象。
    - 若未给出expire则默认datetime.now + 3h
    - 若username无效则会抛出`Value Error: User '{username}' not found.`的异常。
  - 注：使用完后请务必`db.session.add`, `db.session.commit`

- `json`: 返回用户的json形式，形如：

    ```json
    {
        "id": "Session UUID",
        "user": {"user对象"},
        "expire": "过期时间时间戳"
    }
    ```

- 静态方法`get_by_id`: 返回id所对应的用户
  - 参数：id:会话ID
  - 行为：返回该id所对应的会话对象
    - 若给出的ID格式无效，则抛出`AttributeError: Invalid UUID`异常
    - 若未找到对应会话，或是会话过期，抛出`ValueError: Session {id} not found.`

- `expired`: 返回该会话是否过期
