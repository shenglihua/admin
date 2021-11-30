<template>
  <div class="index">
    <el-container>
      <el-header>
        <span>电商后台管理系统</span>
        <button>退出</button>
      </el-header>
      <el-container>
        <el-aside>
          <div class="aside_h">|||</div>
          <el-menu
            :unique-opened="true"
            :default-openeds="['0']"
            :default-active="'users'"
            text-color="#fff !important"
            active-text-color="#409eff !important"
            :router="true"
          >
            <el-submenu
              v-for="(item, index) in aside_list"
              :key="item.id"
              :index="index.toString()"
            >
              <template slot="title"
                ><i class="el-icon-message"></i>{{ item.authName }}</template
              >
              <el-menu-item-group v-for="ite in item.children" :key="ite.key">
                <el-menu-item :index="ite.path">
                  {{ ite.authName }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
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
      isCollapse: false,
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
<style  lang="scss">
.aside_h {
  background-color: #4a5064;
  height: 25px;
  color: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
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
    width: 200px !important;
    overflow: hidden;
    background-color: #333744;
    line-height: 200px;
    ul {
      li {
        color: #fff;
        background-color: #333744;
      }
    }
  }
}
.el-submenu__title:hover {
  background-color: grey;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
}
</style>
