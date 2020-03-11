<template>
  <div class="home-container">
    <el-container style="height: 100%">
      <el-header>
        <div class="header-box">
          <img height="35px" width="35px" src="../assets/librarian.png" alt>
          <span class="title-box">图书管理员后台管理系统</span>
        </div>
        <div>
          <el-button type="primary" @click="home">图书管理员首页</el-button>
          <el-button type="danger" @click="logout">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '65px' : '200px' ">
          <div class="toggle-button" @click="toggleCollapse">{{collapsetext}}</div>
          <!-- 侧边栏菜单区域 -->
          <el-menu
            background-color="whitesmoke"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="activePath"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-notebook-1"></i>
                <span>书籍管理</span>
              </template>
              <el-menu-item index="AddBook" @click="saveNavState('AddBook')">添加书籍</el-menu-item>
              <el-menu-item index="SearchBook" @click="saveNavState('SearchBook')">搜索书籍</el-menu-item>
              <el-menu-item index="ViewLog" @click="saveNavState('ViewLog')">查看操作日志</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>读者账户管理</span>
              </template>
              <el-menu-item index="RegisterAccount" @click="saveNavState('RegisterAccount')">注册账户</el-menu-item>
              <el-menu-item index="EditAccount" @click="saveNavState('EditAccount')">编辑 · 删除账户</el-menu-item>
              <el-menu-item index="BookRecording" @click="saveNavState('BookRecording')">借还缴罚记录</el-menu-item>
            </el-submenu>
            <el-menu-item index="Fromalities" @click="saveNavState('Fromalities')">
              <i class="el-icon-finished"></i>
              <span slot="title">办理借还手续</span>
            </el-menu-item>
            <el-menu-item index="IncomeRecord" @click="saveNavState('IncomeRecord')">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">图书馆收入记录</span>
            </el-menu-item>
            <el-menu-item index="Announcement" @click="saveNavState('Announcement')">
              <i class="el-icon-data-board"></i>
              <span slot="title">公告管理</span>
            </el-menu-item>
            <el-menu-item index="Others" disabled>
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
    return {
      isCollapse: false,
      activePath: "",
      collapsetext: "<<<<<<"
    };
  },
  created() {
    if (window.sessionStorage.getItem("authority") != "librarian") {
      this.$message.error("权限错误，请重新登录");
      return this.$router.push("/Login");
    }
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$message.success("登出成功");
      this.$router.push("/AdminLogin");
    },
    home() {
      window.sessionStorage.setItem("activePath", "");
      this.activePath = "";
      this.$router.push("/LibrarianHome/Welcome");
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.collapsetext = this.isCollapse ? ">>>" : "<<<<<<";
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
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

