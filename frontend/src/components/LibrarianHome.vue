<template>
  <div class="home-container">
    <el-container style="height: 100%">
      <el-header>
        <div class="header-box">
          <img height="35px" width="35px" src="../assets/librarian.png" alt>
          <span class="title-box">Librarian Background Management System</span>
        </div>
        <div class="avatar-box">
          <el-popover placement="bottom-end" width="150" close-delay="500" trigger="hover">
            <el-avatar slot="reference" size="large" :src="avatarpic"></el-avatar>
            <p style="text-align:center; margin: 10px">
              Have a nice day!
              <br>Mr.Librarian
            </p>
            <div style="text-align: center; margin: 0">
              <el-button type="danger" @click="logout">Logout</el-button>
            </div>
          </el-popover>
        </div>
      </el-header>
      <el-container>
        <el-aside
          @mouseenter.native="enterAside()"
          @mouseleave.native="leaveAside()"
          :width="isCollapse ? '65px' : '300px' "
        >
          <div
            :style="isCollapse ? 'visibility:' : 'visibility:hidden' "
            class="toggle-button"
          >{{collapsetext}}</div>
          <!-- 侧边栏菜单区域 -->
          <el-menu
            background-color="whitesmoke"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="activePath"
          >
            <el-menu-item index="Welcome" @click="saveNavState('Welcome')">
              <i class="el-icon-house"></i>
              <span slot="title">Librarian Homepage</span>
            </el-menu-item>
            <el-submenu index="BookManagement">
              <template slot="title">
                <i class="el-icon-notebook-1"></i>
                <span>Book management</span>
              </template>
              <el-menu-item index="AddBook" @click="saveNavState('AddBook')">Add books</el-menu-item>
              <el-menu-item index="SearchBook" @click="saveNavState('SearchBook')">Search for Books</el-menu-item>
              <el-menu-item index="ViewLog" @click="saveNavState('ViewLog')">View operation log</el-menu-item>
            </el-submenu>
            <el-submenu index="AccountManagement">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>Reader account management</span>
              </template>
              <el-menu-item
                index="RegisterAccount"
                @click="saveNavState('RegisterAccount')"
              >Register accounts</el-menu-item>
              <el-menu-item
                index="EditAccount"
                @click="saveNavState('EditAccount')"
              >Edit - Delete accounts</el-menu-item>
              <el-menu-item
                index="BookRecording"
                @click="saveNavState('BookRecording')"
              >Borrowing - Penalty records</el-menu-item>
            </el-submenu>
            <el-menu-item index="Fromalities" @click="saveNavState('Fromalities')">
              <i class="el-icon-finished"></i>
              <span slot="title">Application for loan</span>
            </el-menu-item>
            <el-menu-item index="IncomeRecord" @click="saveNavState('IncomeRecord')">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">Library income records</span>
            </el-menu-item>
            <el-menu-item index="Announcement" @click="saveNavState('Announcement')">
              <i class="el-icon-data-board"></i>
              <span slot="title">Announcement management</span>
            </el-menu-item>
            <el-menu-item index="Others" disabled>
              <i class="el-icon-setting"></i>
              <span slot="title">Other functions</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main v-loading.lock="componentLoading">
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
      isCollapse: true,
      activePath: "Welcome",
      collapsetext: ">>>",
      avatarpic: require("../assets/defaultavatar.png"),
      componentLoading: false
    };
  },
  created() {
    if (window.sessionStorage.getItem("authority") != "librarian") {
      this.$message.error("Permission error, please login again");
      return this.$router.push("/Login");
    }
    this.activePath = window.sessionStorage.getItem("activePath");
    const loading = this.$loading({
      lock: true
    });
    setTimeout(() => {
      loading.close();
    }, 500);
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$message.success("Logout successfully");
      this.$router.push("/LibrarianLogin");
    },
    enterAside() {
      this.isCollapse = false;
    },
    leaveAside() {
      this.isCollapse = true;
    },
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
  background-color: #eee;
  color: #333;
  text-align: center;
  line-height: 40px;
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
.avatar-box {
  padding-top: 5px;
  padding-right: 10px;
}
</style>

