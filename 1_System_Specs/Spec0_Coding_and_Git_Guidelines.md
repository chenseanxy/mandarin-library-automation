# Coding and Git Guidelines

Spec 0: 代码与Git规范

## 代码规范

TODO

## Git规范

### Commit规范

#### Commit消息

在`git commit`时应配上相应的说明性文字：其中commit消息的第一行说明应简要总结修改内容，其后几行则进行更加具体的说明。

该消息使用英文、中文均可，以表达清楚意思为准。

一个简单的commit消息例子如下：

> 修改了set_borrow_date函数的形参  
> 去掉了原来的year, month, day三个参数，换成了统一的Date类对象。

在简单的Commit消息中（如新建文件、纠正拼写错误等），推荐采用单行Commit消息来提高效率。如：

> Added book.py

在Commit消息中需要避免模糊的描述，如"修正了bug"或是"更新了函数"等。同样也需要避免长篇大论。

#### 包含在Git中的文件

TODO

#### 分支策略

TODO
