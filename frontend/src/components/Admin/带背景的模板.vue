<template>
  <div class="outer">
    <div class="block">
      <el-card class="box-card">
        <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fit: "cover",
      src: require("../../assets/susan.jpg")
    };
  }
};
</script>

<style lang="less" scoped>
.outer {
  height: 100%;
  width: 100%;
}
.block {
  background-color: #2b4b6b;
  background: url("../../assets/susan.jpg") no-repeat center center fixed;
  /* background-size: 100% 100%; */
  background-size: cover;
  /* background-repeat: no-repeat; */
  height: 100%;
  width: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}

.text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    position: relative;
    // position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    width: 480px;
  }
</style>