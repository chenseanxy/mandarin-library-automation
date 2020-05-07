<template>
  <div>
    
    <div class="block">
      <!-- <span class="demonstration">自定义</span> -->
      <el-image :src="src" :fit="fit">
      <!-- <img height="35px" width="35px" src="../assets/logo.png" alt> -->
        <div slot="placeholder" class="image-slot">
          加载中
          <span class="dot">...</span>
        </div>
      </el-image>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        fit: 'cover',
        src: require('../../assets/susan.jpg')
      }
    }
};
</script>

<style lang="less" scoped>

</style>