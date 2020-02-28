# mandarin-library-automation 前端

基于Vue.js

##AdminLogin页面更新

- 新增AdminLogin.vue，基于Element[^1]。

[^1]: https://element.eleme.cn/#/zh-CN

###如何使用

- 安装：`npm install`
- 运行开发服务器：`npm run serve`

郭少聪
2020.2.28

<img src="https://pic.guoshaocong.cn/uploads/big/bbd1b858930a17ddcb0a1ff69e78b482.jpg" alt="Screenshot" style="zoom:80%;" />

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
