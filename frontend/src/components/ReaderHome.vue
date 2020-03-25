<template>
  <div class="home-container">
    <el-container style="height: 100%">
      <el-header>
        <div class="header-box">
          <img height="35px" width="35px" src="../assets/reader.png" alt>
          <span class="title-box">图书馆阅览系统</span>
        </div>
        <el-button type="primary" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '65px' : '200px' ">
          <div class="toggle-button" @click="toggleCollapse">&gt;&gt;&gt;&emsp;&lt;&lt;&lt;</div>
          <!-- 侧边栏菜单区域 -->
          <el-menu
            background-color="whitesmoke"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-reading"></i>
                <span>借阅信息</span>
              </template>
              <el-menu-item index="1-1">当前借阅书籍</el-menu-item>
              <el-menu-item index="1-2">已归还书籍</el-menu-item>
              <el-menu-item index="1-3">待支付罚金</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>账户管理</span>
              </template>
              <el-menu-item index="2-1">修改个人信息</el-menu-item>
              <el-menu-item index="2-2">找回密码</el-menu-item>
              <el-menu-item index="2-3">设置保证金</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">
              <i class="el-icon-search"></i>
              <span slot="title">搜索 · 预约图书</span>
            </el-menu-item>
            <el-menu-item index="4" disabled>
              <i class="el-icon-setting"></i>
              <span slot="title">其他功能</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return { isCollapse: false };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$message.success("登出成功");
      this.$router.push("/Login");
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  align-items: center;
  color: black;
  font-size: 20px;
}
.header-box {
  display: flex;
  align-items: center;
}

.el-aside {
  background-color: whitesmoke;
}
.el-main {
  background-color: #eee;
}
.title-box {
  margin-left: 12px;
}
.toggle-button {
  background-color: #ccc;
  font-size: 10px;
  line-height: 24px;
  color: white;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>

