<template>
  <div class="home-container">
    <el-container style="height: 100%">
      <el-header>
        <div class="header-box">
          <img height="35px" width="35px" src="../assets/logo.png" alt>
          <span class="title-box">Super administrator background management system</span>
        </div>
        <el-button type="primary" @click="logout">Login out</el-button>
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
                <span>LibAccount management</span>
              </template>
              <el-menu-item index="1-1">Register an account</el-menu-item>
              <el-menu-item index="ManageAccount" @click="saveNavState('ManageLib')">Manage account</el-menu-item>
               
               
               <!-- <el-menu-item index="SearchBook" @click="saveNavState('SearchBook')">Search for Books</el-menu-item> -->
              <el-menu-item index="1-3">Retrieve password</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-school"></i>
                <span>Library management</span>
              </template>
              <el-menu-item index="BorrowManage">Setting overdue fines</el-menu-item>
              <el-menu-item index="2-2">Set a return period</el-menu-item>
              <el-menu-item index="2-3">Set margin</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">
              <i class="el-icon-key"></i>
              <span slot="title">Modify super password</span>
            </el-menu-item>
            <el-menu-item index="4" disabled>
              <i class="el-icon-setting"></i>
              <span slot="title">Other functions</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <!--路由占位符-->
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
      this.$message.success("LogOut Succeed！");
      this.$router.push("/AdminLogin");
    },

    //点击按钮使菜单折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },

    //这是为了点击能出来，新加的
    enterAside() {
      this.isCollapse = false;
    },
    leaveAside() {
      this.isCollapse = true;
    },

    //保存链接的激活状态
    saveNavState(activePath) {
      this.componentLoading = true;
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
      setTimeout(() => {
        this.componentLoading = false;
      }, 500);
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
  /*加载背景图*/
     /* background-image: url(../assets/taylor.jpg); */
     /* 背景图垂直、水平均居中 */

    /* background-position: center center; */

    /* 背景图不平铺 */

    /* background-repeat: no-repeat; */

    /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
    /* background-attachment: fixed;   */

    /* 让背景图基于容器大小伸缩 */
   /* background-size: cover; */


  /* background: url(../assets/taylor.jpg) center center no-repeat; */
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

