<template>
  <div class="login_container"> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>welcome page</el-breadcrumb-item>
    </el-breadcrumb>

  <div class="inner_box">
    <div class="stars">
      <div class="star" ref="star" v-for="(item,index) in starsCount" :key="index"></div>
    </div>

    <div class="main_container">
      <el-container>
        <el-main>
          <h2>Now the time is {{currentTime}}</h2>
          <h2>Welcome to Mandarin Library</h2>
        </el-main>
      </el-container>
    </div>
  </div>
    
  </div>
</template>
<style scoped>
/* .el-main {
  background-color: #eee;
  color: #333;
  text-align: center;
  line-height: 40px;
}

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  } */

.el-breadcrumb {
  /*面包屑下拉间隙*/
  margin-bottom: 15px;
  /*颜色改不了啊*/
  /* color: rgb(255, 255, 255);  */
}

.login_container {
  /* background-color: gainsboro; */
  height: 100%;
  width: 100%;
}
.inner_box {
  height: 100%;
  width: 100%;

  background: radial-gradient(
    200% 100% at bottom center,
    #f7f7b6,
    #e96f92,
    #75517d,
    #1b2947
  );
  background: radial-gradient(
    220% 105% at top center,
    #1b2947 10%,
    #75517d 40%,
    #e96f92 65%,
    #f7f7b6
  );
  background-attachment: fixed;
  overflow: hidden;
}
.el-main {
  /* background-color: #eee; */
  color: rgb(255, 255, 255);
  text-align: center;
  line-height: 40px;
  filter: alpha(Opacity=95);
  -moz-opacity: 0.95;
  opacity: 0.95;
}
/* .main_container {
  padding-bottom: 65%;
  height: 0;
  background: url("../assets/taylor.jpg") no-repeat center center fixed;
  background-size: cover;
  background-color: #0c1424;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
} */

@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
      rotateY(-360deg);
  }
}

.stars {
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: absolute;
  bottom: 0;
  perspective-origin: 50% 100%;
  left: 50%;
  animation: rotate 90s infinite linear;
}

.star {
  width: 2px;
  height: 2px;
  background: #f7f7b6;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
}
</style>

<script>
export default {
  //   data() {
  //     return {
  //       date: new Date(),

  //       }
  //     },

  //   mounted() {
  //   let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
  //   this.timer = setInterval(() => {
  //     _this.date = new Date(); // 修改数据date
  //   }, 1000)
  // },

  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      starsCount: 800,
      distance: 800,

      timer: "", //定义一个定时器的变量
      currentTime: "" // 获取当前时间
    };
  },

  mounted() {
    let _this = this;
    // 原生js
    // let _starList = document.getElementsByClassName("star")
    // let starArr = Array.prototype.slice.call(_starList)
    // vue
    let starArr = this.$refs.star;
    // 遍历添加样式
    starArr.forEach(item => {
      var s = 0.2 + Math.random() * 1;
      var thisDistance = _this.distance + Math.random() * 300;
      item.style.transformOrigin = `0 0 ${thisDistance}px`;
      item.style.transform = `translate3d(0,0,-${thisDistance}px) rotateY(${Math.random() *
        360}deg) rotateX(${Math.random() * -50}deg) scale(${s},${s})`;
    });
  },

  created() {
    this.trylogin()
    var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(function() {
      _this.currentTime = //修改数据date
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate() +
        "  " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds();
    }, 1000);
  },
  methods:{
    //添加了一个模拟登录成功的方法 他会向后端发送模拟登陆成功的验证信息 以获得后端返回的token令牌 从而可以正常读取数据库
    async trylogin() {
      const { data: res } = await this.$http.post('login', this.loginForm)
      if (res.meta.status !== 200) return console.log('模拟登录失败')
        console.log('模拟登录成功')
        // 1、将登陆成功之后的token, 保存到客户端的sessionStorage中; localStorage中是持久化的保存
        //   1.1 项目中出现了登录之外的其他API接口，必须在登陆之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
};
</script>