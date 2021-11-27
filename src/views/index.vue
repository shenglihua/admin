<template>
  <div class="index">
    <el-container>
      <el-header>
        <span>电商后台管理系统</span>
        <button>退出</button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-openeds="['125']" :unique-opened="true">
            <el-submenu
              :index="item.id.toString()"
              v-for="item in aside_list"
              :key="item.id"
              :unique-opened="true"
            >
              <template slot="title"
                ><i class="el-icon-message"></i
                ><span class="white">{{ item.authName }}</span></template
              >
              <el-menu-item-group v-for="ite in item.children" :key="ite.key">
                <el-menu-item index="1-1">{{ ite.authName }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import http from "../http/index";
export default {
  props: {},
  data() {
    return {
      value1: true,
      aside_list: [],
    };
  },
  created() {
    http({
      url: "/menus",
    }).then((res) => {
      this.aside_list = res.data;
      console.log(res);
    });
  },
  methods: {},
  components: {},
};
</script>
<style scoped lang="scss">
.index {
  height: 100%;
  width: 100%;
}
.el-header {
  background-color: #373d41;
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 18px;
  }
  button {
    width: 70px;
    height: 40px;
    font-size: 12px;
    background-color: #909399;
    border-radius: 3px;
  }
}
.el-container {
  height: 100%;

  .el-aside {
    height: 100%;
    background-color: #333744;
    text-align: center;
    line-height: 200px;
    ul {
      color: #fff;
      li {
        color: #fff;
        background-color: #333744;

        .white {
          color: #fff !important;
        }
      }
    }
  }
}
.el-submenu__title:hover > {
  background-color: black;
  color: #fff;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
