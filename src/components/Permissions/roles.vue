<template>
  <div>
      <el-button type="primary" class="btn"   @click="dialogFormVisible = true">添加角色</el-button>
   
    <el-table :data="tableData" style="width: 100%" :border="true" stripe>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row
            v-for="item1 in scope.row.children"
            :key="item1.id"
            class="centerRow"
            border
          >
            <!-- 这一列，专门渲染 一级权限 -->
            <el-col :span="5">
              <el-tag closable>{{ item1.authName }}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
            <!-- 还剩余 19 列，分配给二三级权限 -->
            <el-col :span="19">
              <!-- 这里显示二三级权限 -->
              <el-row
                v-for="item2 in item1.children"
                :key="item2.id"
                class="centerRow"
              >
                <!-- 放二级权限 -->
                <el-col :span="6">
                  <el-tag closable type="success">{{ item2.authName }}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <!-- 放三级权限 -->
                <el-col :span="18">
                  <el-tag
                    closable
                    type="warning"
                    v-for="item3 in item2.children"
                    :key="item3.id"
                  >
                    {{ item3.authName }}</el-tag
                  >
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="#" type="index"> </el-table-column>
      <el-table-column label="角色名称" prop="roleName"> </el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
      <el-table-column label="操作">
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
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-setting"
            @click="handlePermissions(scope.$index, scope.row)"
            >分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>


    <!-- 添加角色输入框 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
  <el-form :model="form">
 
   <el-form-item label="角色名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
   <el-form-item label="角色描述" prop="desc">
    <el-input v-model="ruleForm.desc"></el-input>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import http from "../../http/index";
export default {
  props: {},
  data() {
    return {
      tableData: [],
         dialogFormVisible: false,
          
          ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
        
        }
      
    };
  },
  created() {
    http({
      url: "/roles",
    }).then((res) => {
      this.tableData = res.data;
      console.log(res.data);
    });
  },
  methods: {
    //编辑
    handleEdit(index, row) {
      console.log(index, row);
    },
    //删除行列
    handleDelete(index, row) {
      console.log(index, row);
    },
    //分配权限
    handlePermissions(index, row) {
      console.log(index, row);
    },

    //行列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row, column, rowIndex, columnIndex);
      // if (columnIndex === 0) {
      //   if (rowIndex % 2 === 0) {
      //     return {
      //       rowspan: 2,
      //       colspan: 1
      //     };
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     };
      //   }
      // }
    },
    //添加角色
 
  },
  components: {},
};
</script>

<style scoped lang="scss">
.btn{
  display: flex;
  margin-bottom: 15px;
}
.el-main{
  //  line-height: auto !important;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
// 下拉权限设置
</style>
