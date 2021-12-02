<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="cat_id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column type="index" label="#" width="180"> </el-table-column>
      <el-table-column prop="cat_name" label="分类名称" width="180"> </el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效" width="180"> </el-table-column>
      <el-table-column prop="cat_level" label="排序" width="180"> </el-table-column>
      <el-table-column prop="address" label="操作"> 
         <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import http from "../../http/index";

export default {
  created() {
    http({
      url: "/categories",
    }).then((res) => {
      this.tableData = res.data;
      console.log(res.data);
    });
  },
  props: {},
  data() {
    return {
      tableData: [],
    }
  },
  methods: {
   handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }

  },
  components: {},
};
</script>

<style scoped lang="scss">
</style>

