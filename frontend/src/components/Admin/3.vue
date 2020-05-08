<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Admin Homepage</el-breadcrumb-item>
      <el-breadcrumb-item>Modify Super Password</el-breadcrumb-item>
    </el-breadcrumb>
    <h1></h1>
    <el-col :span="8" >
    <el-input placeholder="Please input origin password" v-model="input1" show-password ></el-input>
    <h1></h1>
    <el-input placeholder="Please input new password" v-model="input2" show-password ></el-input>
    <h1></h1>
    <el-input placeholder="Please input new password again" v-model="input3" show-password ></el-input>
    <h1></h1>
    <el-button type="submit" @click="startHacking">SUBMIT</el-button>
    </el-col>
</div>
</template>

<script>
  export default {
    data() {
      return {
        input1: '',
        input2: '',
        input3: ''
      };
    },
    methods: {
    startHacking () {
    this.$http.post('/api/user/select_admin_pw',{//调用接口
      pw: this.input1,//将input1的值（即账户）传给接口，后端服务器将会进行查找操作
    },{}).then(function(data){
            console.log("search请求成功！ ",data.body);//记录日志（可以不用管）
            var content=data.body;//创建一个变量content储存该接口返回的数据
            if (content.length == 0) {//判断原密码是否正确
              this.$notify({//网页提示
              title: 'Error',
              type: 'error',
              message: 'Invalid origin password!',
              duration: 5000
              })
            }
            else{
              if(this.input2==this.input3)
              {
                this.$http.post('/api/user/change_admin_pw', {//调用接口
                pw: this.input2,//将input2（即新密码）的值传给接口，后端服务器将会进行数据库的操作
                },{}).then((response) => {
                console.log(response);
                });
                this.$notify({
                title: 'It works!',
                type: 'success',
                message: 'Succeed!',
                duration: 5000
                })
              }
              else
              {
                this.$notify({//网页提示
                title: 'Error',
                type: 'error',
                message: 'The two passwords are inconsistent!',
                duration: 5000
                })
              }
            }
          },function(response){
                console.log(response);
            })
      
    },
  }
  }
</script>

<style>
.el-col
{
text-align :center

  
}



</style>