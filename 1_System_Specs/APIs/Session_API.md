# Session APIs

## /api/user: LoginAPI

### GET

#### 请求格式

Cookie中需含有Session ID（既用户需要登录才能访问）。

#### 成功响应

Code: `200`

返回值：提供的Cookie所对应的Session信息.

返回值示例：

```json
{
  "id": "ed18a4ef-0593-4b5c-8fd2-a64ab85aa284",
  "user": {
    "id": "0b2c9046-c3a1-40a2-9f85-387f5c3f68e4",
    "username": "admin",
    "role": "admin"
  },
  "expire": 1582822047
}
```

#### 失败响应

Code: `401 Unauthorized`

可能原因：用户未登录。

返回值：

```json
{
    "error": "Not authorized"
}
```

### POST

登录（产生新的session）。

#### 请求格式

请求的Header中应包含以下信息：

```json
{
  "username": "用户名",
  "password": "明文密码",
}
```

请求示例：

```json
{
  "username": "reader-a",
  "password": "super-secret-password"
}
```

#### 成功响应

成功登录并产生了Session。

Code: `201 Created`

返回值：Session对象相关信息。

返回值示例：

```json
{
  "id": "4fa04bfc-43d7-446e-9292-67070139a27e",
  "user": {
    "id": "0b2c9046-c3a1-40a2-9f85-387f5c3f68e4",
    "username": "admin",
    "role": "admin"
  },
  "expire": 1582822288
}
```

Cookie：

```json
{
  "session-id": "4fa04bfc-43d7-446e-9292-67070139a27e"
}
```

#### 失败响应

登陆失败。

可能原因：

- 请求无效
  - Code: `400 Bad Request`
  - 未包含username: `Username is required`
  - 未包含password: `Password is required`
- 验证失败
  - Code:
  - 用户名或密码不正确：`Username and/or password is incorrect.`

返回值格式：

```json
{
  "error": "错误信息"
}
```

### DELETE

从当前账户中登出，并删除Session。

#### 请求格式

Cookie中需含有Session ID（既用户需要登录才能访问）。

#### 成功响应

成功登出。

Code: `204 No Content`

返回值：无

#### 失败响应

Code: `401 Unauthorized`

可能原因：用户未登录。

返回值：

```json
{
    "error": "Not authorized"
}
```
