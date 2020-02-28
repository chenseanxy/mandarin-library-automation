<template>
<div class="home-container">
    <el-container style="height: 100%">
        <el-header>
            <div class="header-box">
                <img height="35px" width="35px" src="../assets/librarian.png" alt="">
                <span class="title-box">图书管理员后台管理系统</span>
            </div>
            <el-button type="primary" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse ? '65px' : '200px' ">
                <div class = "toggle-button" @click="toggleCollapse">&gt;&gt;&gt;&emsp;&lt;&lt;&lt;</div>
                <!-- 侧边栏菜单区域 -->                
                <el-menu background-color="whitesmoke" unique-opened :collapse="isCollapse" :collapse-transition="false">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-notebook-1"></i>
                        <span>书籍管理</span>
                    </template>                    
                        <el-menu-item index="1-1">添加书籍</el-menu-item>
                        <el-menu-item index="1-2">搜索书籍</el-menu-item>
                        <el-menu-item index="1-3">查看操作日志</el-menu-item>                                       
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-user"></i>
                        <span>读者账户管理</span>
                    </template>                    
                        <el-menu-item index="2-1">注册账户</el-menu-item>
                        <el-menu-item index="2-2">编辑 · 删除账户</el-menu-item>
                        <el-menu-item index="2-3">借还缴罚记录</el-menu-item>                                       
                </el-submenu>
                <el-menu-item index="3">
                    <i class="el-icon-finished"></i>
                    <span slot="title">办理借还手续</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-pie-chart"></i>
                    <span slot="title">图书馆收入记录</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <i class="el-icon-data-board"></i>
                    <span slot="title">公告管理</span>
                </el-menu-item>
                <el-menu-item index="6" disabled>
                    <i class="el-icon-setting"></i>
                    <span slot="title">其他功能</span>
                </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
export default{
    data(){
        return {isCollapse: false}
    },
    methods: {
        logout(){
            window.sessionStorage.clear();
            this.$router.push("/AdminLogin");
        },
        toggleCollapse(){
            this.isCollapse = !this.isCollapse;
        }
    }
}
</script>

<style scoped>
.home-container{
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
    display:flex;
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
.toggle-button{
    background-color: #ccc;
    font-size: 10px;
    line-height: 24px;
    color: white;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>

