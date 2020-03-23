<template>
  <div class="login_container">
   <!-- 注释 <div class="head_box">
      <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">菜单文本1</el-menu-item>
        <el-submenu index="2">
          <template slot="title">菜单文本2</template>
          <el-menu-item index="2-1">选项文本1</el-menu-item>
          <el-menu-item index="2-2">选项文本2</el-menu-item>
          <el-menu-item index="2-3">选项文本3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项文本4</template>
            <el-menu-item index="2-4-1">次级选项文本1</el-menu-item>
            <el-menu-item index="2-4-2">次级选项文本2</el-menu-item>
            <el-menu-item index="2-4-3">次级选项文本3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>菜单文本3</el-menu-item>
      </el-menu>
    </div>   注释 -->  
    <div>
      <div class="login_box">
        <div class="avatar_box">
          <div class="sign_box">
            <img
              height="70px"
              width="70px"
              border-radius="50%"
              background-color="#eee"
              src="../assets/librarian.png"
              alt
            >
          </div>
        </div>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
          label-width="0px"
          class="login_form"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              prefix-icon="el-icon-user"
              placeholder="请输入图书管理员账号（默认librarian）"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              prefix-icon="el-icon-lock"
              placeholder="请输入图书管理员密码（默认librarian）"
              show-password
              clearable
            ></el-input>
          </el-form-item>

          <div class="box clearfix">
            <span class="lf" @click="clearCookie" style="cursor: pointer;color: #f19149;font-size: 0.75rem;margin-left: 5px;">忘记密码？</span>
            <div class="rt">
              <el-checkbox v-model="checked" style="color:#a0a0a0;">一周内自动登录</el-checkbox>
            </div>
          </div>

          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "", // ！！！ username 和 password 分别是输入的账号和密码 ！！！
        password: ""
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入管理员账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "长度应在 5 至 20 字符之间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  //页面加载调用获取cookie值
  mounted() {
      this.getCookie();
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    //！！！修改 login() 调用后端 API 以对账户密码进行验证 ！！！
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        
        //判断复选框是否被勾选 勾选则调用配置cookie方法
        if (this.checked == true) {
            //传入账号名，密码，和保存天数3个参数
            this.setCookie(this.loginForm.username, this.loginForm.password, 7);
        }else {
          console.log("清空Cookie");
          //清空Cookie
          this.clearCookie();
        }
        if (
          this.loginForm.username == "librarian" &&
          this.loginForm.password == "librarian"
        ) {
          this.$message.success("图书管理员登录成功");
          window.sessionStorage.setItem("authority", "librarian");
          return this.$router.push("/LibrarianHome");
        }
        return this.$message.error("账号或密码错误");
        //登录成功后应返回一个 token 标志该用户以正确的权限访问其它页面
        //token应保存在 sessionStorage 中
        //window.sessionStorage.setItem("token", 后端返回的token);
        //使用下面的语句跳转到下一页面，譬如 AdminHome 页面
        //this.$router.push("/AdminHome");
      });
    },

    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
        if (document.cookie.length > 0) {
            var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('='); //再次切割
                //判断查找相对应的值
                if (arr2[0] == 'userName') {
                  //  console.log(arr2[1])
                    this.loginForm.username = arr2[1]; //保存到保存数据的地方
                } else if (arr2[0] == 'password') {
                  // console.log(arr2[1])
                    this.loginForm.password = arr2[1];
                }
            }
              this.checked = true;
        }
    },
    //清除cookie
    clearCookie: function() {
        this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
  }
};
</script>

<style scoped>
.login_container {
  background-color: gainsboro;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 100px;
  width: 100px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #eee;
}
.sign_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 35px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.lf{
  float: left;
}
.box{
  min-width: 350px;
  margin-left:50px; 
	width: 30%;
}
.clearfix:after {
  content:"."; 
  display:block; 
  height:0; 
  visibility:hidden; 
  clear:both; 
}
.clearfix { 
  *zoom:1; 
}
</style>

