# mandarin-library-automation 前端

基于Vue.js+Element

## 开发指南

- 在阅读这一部分前，你应当已经完成了本文底部的[Vue.js的环境配置](#环境配置)。如果你遇到困难，向小组Leader或PM求助。
- 如果你从未有过前端开发经验，可尝试阅读同目录下「[开发指南.md](./开发指南.md)」，它可能对你快速上手有所帮助。请相信Vue.js并没有看上去的那么高深莫测，开发本项目也并不需要你对Vue.js了如指掌。
- 如果你已经有成熟的开发经验，请忽略上述步骤。


## 开发日志

### 更新Librarian页面所有子页面

- 完成对Librarian所有子页面的设计

郭少聪
2020.03.11

------

### 完善美化添加书籍和搜索书籍页面

- 完善美化添加书籍和搜索书籍页面。

------

- Librarian/SearchBook.vue

  ![](https://pic.guoshaocong.cn/uploads/small/5156f797e21fda67be7ffb77258444dc.jpg)

- Librarian/AddBook.vue

  ![](https://pic.guoshaocong.cn/uploads/small/5a079641693923bad4d69edf282969de.jpg)
  

郭少聪
2020.03.10

------

### 图书管理员主页内容构建

- 新增图书管理员系统的所有页面。

- 美化了标题栏。新增了回到主页按钮。

- 为新增书籍页面（Librarian/AddBook.vue）新增了搜索框。

------

- LibrarianWelcome.vue（LibrarianHome.vue的子页面）

  ![](https://pic.guoshaocong.cn/uploads/small/16db7c5cb55fc29e40542200b1d84c33.jpg)

- Librarian/AddBook.vue

  ![](https://pic.guoshaocong.cn/uploads/small/8bba48fa7a26059e6354363c958c748a.jpg)
  

郭少聪
2020.03.09

------


### HomePage页面框架构建

- 新增LibrarianWelcome.vue，Librarian/AddBook.vue。

- 其他角色HomePage页面导航方式可依照上述页面创建，HomePage页面子页面文件放置在对应文件夹内。

------


- LibrarianWelcome.vue（LibrarianHome.vue的子页面）

  ![](https://pic.guoshaocong.cn/uploads/small/4f03ad0b45355e9435a32e6ca7e0206d.jpg)
  

郭少聪
2020.03.08

------

### 前端整体框架构建

- 新增AdminHome.vue，LibrarianHome.vue，ReaderLogin.vue，ReaderHome.vue。

- 注：鉴于项目要求 **==Hide Admin login page==** ，管理员与读者登陆页面分开设置。

  ![](https://pic.guoshaocong.cn/uploads/big/17867e1089c040ed539e688ea980fe63.jpg)

- 框架结构如下：

  ![](https://pic.guoshaocong.cn/uploads/small/7da58cd82113e1f7e0b2ddc93053e1ba.jpg)
  
- AdminLogin.vue

  ![](https://pic.guoshaocong.cn/uploads/small/09d8ec3b7801d12787a732ccee45a7e5.jpg)
  
- ReaderLogin.vue

  ![](https://pic.guoshaocong.cn/uploads/small/89464bbdc0f4ad66b3a068742dd55825.jpg)
  
- ReaderHome.vue （侧栏已覆盖项目要求，下同）

  ![](https://pic.guoshaocong.cn/uploads/small/68bfc903d8dd4e45375f7e124aad4528.jpg)

- AdminHome.vue

  ![](https://pic.guoshaocong.cn/uploads/small/49cc6c76615dfb769e4d69273abdccae.jpg)

- LibrarianHome.vue

  ![](https://pic.guoshaocong.cn/uploads/small/6c9d696c6870515f62a97d1a5b1b14f7.jpg)

郭少聪
2020.02.29

------


### AdminLogin页面更新

- 新增AdminLogin.vue，基于Element[^1]。
- 新增了菜单栏。
- 剔除了背景
- 页面图片移至assets文件夹内

[^1]: https://element.eleme.cn/#/zh-CN

#### 如何使用

- 安装：`npm install`
- 运行开发服务器：`npm run serve`

郭少聪
2020.02.28

<img src="https://pic.guoshaocong.cn/uploads/small/01c984ecd3ddd480dd1ceba3c50cf8fa.jpg">

------


## 环境配置

### 安装Node.js，换源

- 打开[Node.js官网](https://nodejs.org/en/)，选择LTS版本下载（目前为12.16.1），并进行安装。
- 使用淘宝源：`npm config set registry https://registry.npm.taobao.org`
- 验证换源是否成功：`npm config get registry`

### 安装vue-cli

- 安装：`npm install -g @vue/cli`
- 验证：`vue --version`

### 安装项目所需依赖

- 确保终端位于frontend目录内
- `npm install`来按照package.json安装所有所需依赖

### 进行本地测试

- 运行开发服务器：`npm run serve`
- 访问终端中显示的地址，应该能看到前端页面。
