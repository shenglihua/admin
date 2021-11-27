<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="80px">
      <p><img src="../assets/img/logo.png" alt="" /></p>
      <el-input v-model="form.name" clearable @mouseleave="username"></el-input>
      <el-input v-model="form.pass" clearable show-password></el-input>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <router-view></router-view>
  </div>
</template>
<script>
import http from "../http/index";
export default {
  props: {},
  data() {
    return {
      form: {
        name: "admin",
        pass: "123456",
      },
    };
  },
  methods: {
    onSubmit() {
      http({
        url: "/login",
        method: "post",
        data: {
          username: this.form.name,
          password: this.form.pass,
        },
      })
        .then((res) => {
          sessionStorage.setItem("token", res.data.token);
          this.$message({
            message: "登录成功",
            type: "success",
            duration: "1000",
            onClose: () => {
              this.$router.push("/index");
            },
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("账号或密码输入错误！");
        });
    },
    username() {},
  },
  components: {},
};
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  width: 100%;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;

  .el-input {
    margin-bottom: 15px;
  }
  .el-message {
    height: 50px;
  }
  .el-form {
    width: 450px;
    height: 300px;
    background-color: white;
    padding: 0px 40px;
    margin: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    p {
      width: 150px;
      border-radius: 50%;
      overflow: hidden;
      border: 10px solid white;
      background-color: #eeeeee;
      position: absolute;
      top: -87px;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: #f3f3f3;
    }
  }
}
</style>
