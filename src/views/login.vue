<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="80px">
      <el-input v-model="form.name" clearable></el-input>
      <el-input v-model="form.name" clearable show-password></el-input>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <div>这是一个测试文件</div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      form: {
        name: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  width: 100%;
  background-color: #2b4b6b;
  .el-form {
    width: 450px;
    height: 300px;
  }
}
</style>
