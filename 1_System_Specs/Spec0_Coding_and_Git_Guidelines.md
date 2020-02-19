# Coding and Git Guidelines

Spec 0: 代码与Git规范

## 代码规范

TODO

## Git规范

### Commit规范

Commit为git版本管理的一个最小单元，git会追踪两次commit之间的代码修改。理想中，应在完成系统的一个关键部分的修改后commit一次。需要避免以下两种情况：

- 一次commit未包含完整的修改，比如：只改了声明的函数名，没有更改该函数的所有引用就commit
- 一次commit包含多个无逻辑关系部分的修改，比如：将模块A的函数A更改与模块C的函数B更改放在同一个提交里面

#### Commit消息

在`git commit`时应配上相应的说明性文字：其中commit消息的第一行说明应简要总结修改内容，其后几行则进行更加具体的说明。

该消息使用英文、中文均可，以表达清楚意思为准。

一个简单的commit消息例子如下：

> 修改了set_borrow_date函数的形参  
> 去掉了原来的year, month, day三个参数，换成了统一的Date类对象。

在简单的Commit消息中（如新建文件、纠正拼写错误等），推荐采用单行Commit消息来提高效率。如：

> Added book.py

在Commit消息中需要避免模糊的描述，如"修正了bug"或是"更新了函数"等。同样也需要避免长篇大论。

### 包含在Git中的文件

理论上来说Git中只应有本项目创建的文档、源代码等，不应该包含编译结果、依赖的其他项目等等。

具体如何使git忽略项目文件夹内的文件，推荐搜索gitignore，以及使用[gitignore.io](https://www.gitignore.io/)来生成需要的gitignore文件。

### 分支策略

本项目中`master`分支为主分支，应保证该分支为干净、可用的（既这个分支中每个版本都应该能运行、通过测试）。

任何形式的开发都应该在其他分支进行，在开发进行完一个阶段后创建Pull Request以合并到master分支中。

开发分支命名应如`dev-name-of-branch`.

### Pull Request

当开发分支完成一个任务点或功能时，应由该任务点/功能的负责人创建一个Pull Request以请求合并到master分支中。
