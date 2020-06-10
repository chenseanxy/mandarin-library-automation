<template>
  <div>
    <el-container>
    <el-main>


<el-form ref="form" :model="form" label-width="80px" class="hhform">
  <el-form-item label="username" >
    <el-input v-model="form.username" :disabled="form.kw0"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click=" form.kw0 = !form.kw0">修改</el-button>
  </el-form-item>

  <el-form-item label="email">
    <el-input v-model="form.email" :disabled="form.kw1"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click=" form.kw1 = !form.kw1">修改</el-button>
  </el-form-item>

    <el-form-item label="position">
    <el-input v-model="form.position" :disabled="form.kw2"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click=" form.kw2 = !form.kw2">修改</el-button>
  </el-form-item>




</el-form>

    </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form:{
        username: "user1",
        email: "123456@126.com",
        position: "teacher",
        kw0: true,
        kw1: true,
        kw2: true
      }
    };
  },

  methods: {

  }
};
</script>

<style scoped>
.hhform {
  width: 300px;
}


</style>
