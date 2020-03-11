<template>
  <div class="home-container">
    <el-container style="height: 100%">
      <el-header>
        <div class="header-box">
          <img height="35px" width="35px" src="../assets/logo.png" alt>
          <span class="title-box">超级管理员后台管理系统</span>
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
                <i class="el-icon-user"></i>
                <span>图管账号管理</span>
              </template>
              <el-menu-item index="1-1">注册账号</el-menu-item>
              <el-menu-item index="1-2">管理账号</el-menu-item>
              <el-menu-item index="1-3">找回密码</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-school"></i>
                <span>图书馆管理</span>
              </template>
              <el-menu-item index="2-1">设置逾期罚金</el-menu-item>
              <el-menu-item index="2-2">设置归还期限</el-menu-item>
              <el-menu-item index="2-3">设置保证金</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">
              <i class="el-icon-key"></i>
              <span slot="title">修改超管密码</span>
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
      this.$router.push("/AdminLogin");
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

