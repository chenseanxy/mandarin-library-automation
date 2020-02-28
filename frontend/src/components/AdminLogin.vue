<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <div class="sign_box">
                    <img height=70px width=70px border-radius=50% background-color=#eee src="https://pic.guoshaocong.cn/uploads/big/bee847a55a428853f7224b295b64bb0c.png" alt="">
                </div>
            </div>
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入管理员账号（默认admin）" clearable></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="请输入管理员密码（默认admin）" show-password clearable></el-input>
                </el-form-item >
                <el-form-item class = "btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            loginForm:{
                username: '',       //！！！ username 和 password 分别是输入的账号和密码 ！！！
                password: ''
            },
            loginFormRules:{
                username:[{required: true, message: '请输入管理员账号', trigger: 'blur'}], 
                password:[{required: true, message: '请输入密码', trigger: 'blur'},{min: 5, max: 20, message: '长度应在 5 至 20 字符之间', trigger: 'blur' }]
            }
        };
    },
    methods:{
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields();
        },
        //！！！修改 login() 调用后端 API 以对账户密码进行验证 ！！！
        login(){            
            this.$refs.loginFormRef.validate(async valid => {
                if(!valid) return;
            if(this.loginForm.username=='admin'&&this.loginForm.password=='admin')
                return this.$message.success('登录成功');
            return this.$message.error('账号或密码错误');
            //登录成功后应返回一个 token 标志该用户以正确的权限访问其它页面
            //token应保存在 sessionStorage 中
            //window.sessionStorage.setItem("token", 后端返回的token);
            //使用下面的语句跳转到下一页面，譬如 AdminHome 页面
            //this.$router.push("/AdminHome");
            });
        }
    }
};
</script>

<style scoped>
.login_container{
    background: url('https://pic.guoshaocong.cn/uploads/big/8b42090f901eb389579f149896f5b0ce.jpg') center center no-repeat;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.avatar_box{
    height: 100px;
    width: 100px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position:absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #eee;
}
.sign_box{
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.login_form{
    position:absolute;
    bottom: 0;
    width: 100%;
    padding: 0 35px;
    box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content: flex-end;
}

</style>

