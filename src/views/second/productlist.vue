<template>
  <div class="prolist">
    <p class="title"><span>首页</span> > 商品管理 > 商品列表</p>
    <div class="content">
      <ul>
        <li>
          <input
            type="text"
            v-model="searchs"
            name=""
            id=""
            placeholder="请输入内容"
          />
          <el-button
            type="primary"
            icon="el-icon-search"
            class="search"
          ></el-button>
          <button @click="shows">添加商品</button>
        </li>
      </ul>
    </div>
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
.prolist {
  height: 100%;
  width: 100%;
  background-color: #eaedf1;
  padding: 0px 23px;
  .title {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    font-size: 12px;
    span {
      color: #303133;
      font-size: 12px;
      font-weight: 600;
    }
  }
  .content {
    width: 100%;
    height: 100%;
    ul:nth-child(1) {
      li {
        overflow: hidden;
        input {
          height: 38px;
          width: 288px;
          border: 1px solid #c0c4cc;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
          float: left;
          padding-left: 15px;
        }
        .search {
          width: 55px;
          height: 38px;
          border-radius: 0;
          background-color: #f5f7fa;
          border: none;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          color: #9a98a6;
          border: 1px solid #dcdfe6;
          float: left;
          border-left: none;
        }
        button {
          width: 100px;
          height: 38px;
          background-color: #409eff;
          float: left;
          margin-right: 21px;
          color: white;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
