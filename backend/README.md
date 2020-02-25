# mandarin-library-automation 后端

基于Python, Flask, SQLAlchemy

## 环境配置

### 安装Python 3

- Python 3.7，其他版本先测试，如果不能使用再更换
- `pip --version` 确保能够使用pip

### 安装依赖

- 确保终端位于`backend`文件夹内
- 安装依赖：`pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple`

#### 如果出现包没有找到之类的问题：

- 升级Python至Python 3.7以上，或：
- `pip install Flask Flask-RESTful Flask-SQLAlchemy pytest requests urllib3 -i https://pypi.tuna.tsinghua.edu.cn/simple`

### 开始开发

- 启动开发服务器：`python app.py`
- 运行单元测试：`pytest resources/`
- 运行端到端测试：`pytest test/` - 请确保测试时服务器正在运行
