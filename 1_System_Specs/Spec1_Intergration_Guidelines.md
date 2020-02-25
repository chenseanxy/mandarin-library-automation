# Intergration Guidelines

Spec 1: 整合规范

本规范中主要描述代码的依赖管理与整合、部署相关内容。测试相关的内容见Spec #TODO。

## 前端整合规范

### 外部依赖管理

前端的依赖管理通过npm来进行，以`package.json`以及`package-lock.json`来记录依赖内容。

在添加新的依赖之前，需先决定该依赖为：

- 开发依赖`dev-dependency`：在开发期间需要，实际部署时不需要
- 依赖`dependency`：在部署时仍需要

在安装时使用`npm install --save <package>`来安装并保存依赖，使用`npm install --save-dev <package>`来安装并保存开发依赖。

### 内部依赖

`src`目录内有以下几个目录：

- assets: 存储前端所需的静态资源，如logo图片等等。
- components: 存储项目开发的组件，其中一类的相关组件应放在子文件夹中。
- router: 存储vue-router相关配置，路径等配置在此处进行。
- views: 存储router到达的各个端点，这可以理解成多个页面。
- tests: 存储测试代码，其中e2e为端到端测试（自动化浏览器），unit为单元测试。

#### 组件的引用

推荐使用绝对路径`@/components/HelloWorld.vue`的方式引用其他组件。

#### vue-router整合

单个router路径建议以`component: () => import('path-to-component')`形式进行，以方便懒加载。

## 后端整合规范

### 外部依赖管理

后端依赖管理使用pip `requirements.txt`文件完成；须在干净的Python环境下进行`pip freeze > requirements.txt`。

在这里建议如果需要加包的话，直接告诉PM即可。

### 内部依赖

`backend`目录结构如下：

- app.py: 后端项目主文件，url映射的配置在此。
- database.py: 定义数据库对象`db`，以及数据库配置相关。
- resources: 资源目录，主要的API相应代码都在此。
  - version.py: 示例API资源，里面Version类为API类，VersionModel为该API所需的数据类（既数据库表）
  - generators: 数据生成器相关，里面的文件用于在建表时向表内插入数据。
    - create_db.py: 定义建表函数，在这里插入写好的生成器
  - tests: API单元测试，若API有辅助函数之类都可以在这里插入以`test_`开头的测试文件，详见测试Spec
    - utils.py: Test Fixtures
- scripts: 测试和部署的时候需要的一些脚本和配置，可以在本地运行自动化的构建、测试流程。
- tests: API端到端测试
- 各个文件夹里的__init__.py: 用于将文件夹变为python模块，内容可空

#### API路径

所有API均使用/api作为根路径，在app.py中的路径设置均为相对路径。

如：`api.add_resource(Version, '/version')`，会将Version API指向`/api/version`。

#### 数据生成器

在resources/generators内编写测试生成器，该生成器可为Python中的生成器generator，也可以为一个简单的列表。

在编写之后须在create_db.py中import，再将import的生成器写在generators列表内。
