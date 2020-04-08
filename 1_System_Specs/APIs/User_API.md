# User APIs

## /api/user: UserRootAPI

### GET

返回用户列表。

#### 成功响应

Code: `200`

返回值：完整的用户列表，每个用户信息包含`id`, `username`，`role`.

返回值示例：

```json
[
  {
    "id": "1f0f44fe-b651-4200-8a2b-0b01271271f1",
    "username": "admin",
    "role": "admin"
  },
  {
    "id": "0414bd54-43ab-43de-8d94-2b57b0d4bc0e",
    "username": "lib",
    "role": "librarian"
  },
  {
    "id": "426c84ab-f1f3-4da3-92f5-4df68d5057d9",
    "username": "reader",
    "role": "reader"
  }
]
```

#### 失败响应

无。

### POST

注册新的用户（等待审核）。

#### 请求格式

```json
{
  "username": "期望使用的用户名",
  "password": "明文密码",
  "role": "(可选)admin/librarian/reader, 默认reader"
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

成功完成了注册用户的操作。

Code: `201 Created`

返回值：用户对象，包含`id`, `username`, role

返回值示例：

```json
{
  "id": "41e7934c-1aa8-45be-9ae4-c967ab371601",
  "username": "admin",
  "role": "admin"
}
```

#### 失败响应

未能成功完成注册操作。

Code: `400 Bad Request`

可能原因：

- 请求无效
  - 未包含username/password：`Request must contain username and password.`
  - 用户名无效：`Username '{username}' has been taken.`
  - 其他错误

返回值格式：

```json
{
  "error": "错误信息"
}
```

## /api/user/[id]

数据段：id：所请求用户的id

示例：`/api/user/41e7934c-1aa8-45be-9ae4-c967ab371601

### GET

返回用户信息。

#### 成功响应

Code: `200 OK`

返回值：用户信息，包含`id`, `username`.

返回值示例：

```json
{
  "id": "41e7934c-1aa8-45be-9ae4-c967ab371601",
  "username": "admin",
  "role": "admin"
}
```

#### 失败响应

- 用户id格式无效：
  - Code: `400 Bad Request`
  - Message: `Invalid UUID`
- 用户未找到：
  - Code: `404 Not Found`
  - Message: `User {id} not found.`

返回值格式：

```json
{
  "error": "错误信息"
}
```
