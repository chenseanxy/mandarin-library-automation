-------------2020.5.11更新 by 周冰-----------------
1.  本次修改进行了大换血 原来的后端服务器因为数据格式问题难以处理 丢弃不用

    从网上找到了一个可以适合咱们这个系统的后端（即b站电商项目实战的一模一样的后端） 并做了一点点修改

    注意：需要把admin_backend/config/default中
    "db_config" : {
		"protocol" : "mysql",
		"host" : "127.0.0.1",
		"database" : "mydb",
		"user" : "root",
		"password" : "XXXX",（XXXX处修改为你们本机mysql密码）
		"port" : 3306
	}

    本项目前端的api配置在frontend/src/main.js 18行左右

    后端安装：

    先配置本地数据库：

    （1）创建数据库mydb
        create database mybd;
        use mybd;

    （2）执行数据库命令文件 在：db -> mysdb.sql（或者直接复制到命令行）


    本地的后端项目路径为依旧在backend/admin_backend 初次使用需要在该路径下安装依赖（依赖已经写在package.json里了）:
    npm install

    启动后端服务器：
    node app.js

    如需有其他前端修改 请参阅该路径下“api接口文档”  相比我原来写的简陋的后端可以说是写的十分企业级 大家可以学习一下

2.  另外，前端添加了新的依赖，同样已经写在package.json里了（如果有新依赖建议大家也写在package里，方便安装），需要在frontend路径下直接执行：
    npm install

3.  罚金等相关页面 和 修改超管密码的页面 暂时还没有连接后端
