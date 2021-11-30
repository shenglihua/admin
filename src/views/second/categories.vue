<template>
  <div class="sify">
    <p class="title"><span>首页</span> > 商品管理 > 商品列表</p>
    <div class="content">
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="#" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>

          <el-table-column label="是否有效" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>

          <el-table-column label="排序" width="180">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: " 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: " 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: " 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王asdsa",
          address: "1516 弄",
        },
      ],
    };
  },
  methods: {
    //删除 编辑事件
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  components: {},
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
