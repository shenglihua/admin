<template>
  <div class="sify">
    <p class="title"><span>首页</span> > 商品管理 > 商品列表</p>
    <div class="content">
      <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @expand-change="second"
        >
          <el-table-column
            fixed
            prop="date"
            type="index"
            label="#"
            width="70px"
          >
          </el-table-column>
          <el-table-column
            prop="cat_name"
            type="expand"
            label="分类名称!"
            width="258px"
          >
            asd
          </el-table-column>
          <el-table-column prop="cat_id" label="是否有效" width="258px">
          </el-table-column>
          <el-table-column prop="cat_level" label="排序" width="258px">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="258px">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div></div>
  </div>
</template>

<script>
import http from "../../http/index";
export default {
  props: {},
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    //删除 编辑事件

    // 商品分类请求数据
    comlist() {
      http({
        url: "/categories",
        params: {
          type: 1,
          pagenum: "2",
          pagesize: "10",
        },
      }).then((res) => {
        this.tableData = res.data.result;
        console.log(this.tableData);
      });
    },
    // 展开行？
    second() {
      console.log("asdasd");
    },
  },
  components: {},
  mounted() {
    this.comlist();
  },
};
</script>

<style scoped lang="scss">
.sify {
  height: 100%;
  width: 100%;
  background-color: #eaedf1;
  padding: 0px 20px;
  .title {
    height: 50px;
    line-height: 50px;
    font-size: 12px;
    span {
      color: #303133;
      font-size: 12px;
      font-weight: 600;
    }
  }
  .content {
    width: 100%;
    background-color: white;
  }
}
</style>
