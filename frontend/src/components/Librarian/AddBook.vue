<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>图书管理员首页</el-breadcrumb-item>
        <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加书籍</el-breadcrumb-item>
        </el-breadcrumb>   
    
        <el-card class="addbook-card" shadow="hover">
            <el-row :gutter="20">
                <el-col :span="17" :offset="1">                   
                        <el-input placeholder="请输入内容">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                </el-col>
                <el-col :span="2" :offset="1">
                    <el-button type="primary">添加书籍</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>   
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .el-breadcrumb{
        margin-bottom: 15px;
    }
    .addbook-card{
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
        width: 700px;
        margin: 0 auto;
    }
</style>

