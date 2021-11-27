<template>
  <div class="demo">
    <el-container>
      <el-header>
        <span>电商后台管理系统</span>
        <button>退出</button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title"
                ><i class="el-icon-message"></i>导航一</template
              >
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 出口 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  methods: {},
  components: {},
};
</script>
<style scoped lang="scss">
.demo {
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
  color: #fff;
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

.el-aside {
  height: 100%;
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /* background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px; */
  height: 100%;
  width: 100%;
}
</style>
