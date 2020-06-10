<template>
  <div class="home-container">
    <el-container style="height: 100%">
      <el-header>
        <div class="header-box">
          <img height="35px" width="35px" src="../assets/reader.png" alt>
          <span class="title-box">Library Reading System</span>
        </div>
        <el-button type="primary" @click="logout">Exit</el-button>
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
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-reading"></i>
                <span>Borrowing information</span>
              </template>
              <el-menu-item index="ReaderCurrentBorrow" @click="saveNavState('ReaderCurrentBorrow')">Current borrowing books</el-menu-item>
              <el-menu-item index="ReaderReturnedBooks" @click="saveNavState('ReaderReturnedBooks')">Books returned</el-menu-item>
              <el-menu-item index="MarginPendingPayment" @click="saveNavState('MarginPendingPayment')">Margin Pending Payment</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>Account management</span>
              </template>
              <el-menu-item index="ModifyPersonalInformation" @click="saveNavState('ModifyPersonalInformation')">Modify personal information</el-menu-item>
              <el-menu-item index="RetrievePassword" @click="saveNavState('RetrievePassword')">Retrieve password</el-menu-item>
              <el-menu-item index="EstablishmentofFine" @click="saveNavState('EstablishmentofFine')">Establishment of Fine</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>Search-Reserve Books</span>
              </template>
              <el-menu-item index="ReaderSearchBook" @click="saveNavState('ReaderSearchBook')">Search-Reserve for Books</el-menu-item>
            </el-submenu>
            <el-menu-item index="4" disabled>
              <i class="el-icon-setting"></i>
              <span slot="title">Other functions</span>
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
    return { isCollapse: true };
  },
 
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$message.success("Logout successfully!");
      this.$router.push("/Login");
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    saveNavState(activePath) {
      this.componentLoading = true;
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
      setTimeout(() => {
        this.componentLoading = false;
      }, 500);
    },
    enterAside() {
      this.isCollapse = false;
    },
    leaveAside() {
      this.isCollapse = true;
    },
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
  background: url(../assets/background1.jpg) center center no-repeat;
  background-color: #eee;
}
.title-box {
  margin-left: 12px;
}
.toggle-button {
  background-color: #ccc;
  font-size: 10px;
  line-height: 30px;
  color: white;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>

