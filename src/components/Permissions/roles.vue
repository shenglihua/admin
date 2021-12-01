<template>
  <div>
    <el-button type="primary" class="btn" @click="dialogFormVisible = true"
      >添加角色</el-button
    >

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
            <el-col :span="5" class="border">
              <el-tag
                closable
                @close="handleClose(scope.row, item1.id, item1)"
                >{{ item1.authName }}</el-tag
              >
              <i class="el-icon-caret-right"></i>
            </el-col>
            <!-- 还剩余 19 列，分配给二三级权限 -->
            <el-col :span="19">
              <!-- 这里显示二三级权限 -->
              <el-row
                v-for="item2 in item1.children"
                :key="item2.id"
            class="centerRow1"
          
              >
                <!-- 放二级权限 -->
                <el-col :span="6">
                  <el-tag
                    closable
                    type="success"
                    @close="handleClose(scope.row, item2.id, item1)"
                    >{{ item2.authName }}</el-tag
                  >
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <!-- 放三级权限 -->
                <el-col :span="18">
                  <el-tag
                    closable
                    type="warning"
                    v-for="item3 in item2.children"
                    :key="item3.id"
                    @close="handleClose(scope.row, item3.id, item1)"
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
            @click="setCheckedNodes(scope.$index, scope.row)"
            >分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加角色输入框 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="ruleForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改角色输入框 -->
    <el-dialog title="添加角色" :visible.sync="revise">
      <el-form :model="ruleForm" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="ruleForm.name_"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="ruleForm.desc_"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="revise = false">取 消</el-button>
        <el-button type="primary" @click="sub()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span
        >确认删除 <span style="color: red">{{ info.roleName }}</span> 吗？</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="del()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="permissions" width="30%">
      <el-tree
        :default-checked-keys="keys"
        :data="perm_list"
        show-checkbox
        default-expand-all
        node-key="id"
        highlight-current
        :props="defaultProps"
        ref="tree"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="permissions = false">取 消</el-button>
        <el-button type="primary" @click="subb()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 移除权限 -->
    <el-dialog title="提示" :visible.sync="remove" width="30%">
      <span>确认移除权限吗 吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="remove = false">取 消</el-button>
        <el-button type="primary" @click="rem()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import http from "../../http/index";
export default {
  props: {},
  data() {
    return {
      keys: [],
      tableData: [],
      perm_list: [],
      permissions: false,
      dialogVisible: false,
      dialogFormVisible: false,
      revise: false,
      remove: false,
      info: {},
      rowID: "",
      id: "",
      item: [],
      ruleForm: {
        desc: "",
        name: "",
        desc_: "",
        name_: "",
      },
      defaultProps: {
        children: "children",
        label: "authName",
      },
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 1, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    
    // 请求权限列表
    http({
      url: "rights/tree",
    }).then((res) => {
      this.perm_list = res.data;
    });
    // 请求人
    this.request();
  },
  methods: {
    // 请求数据
    request() {
      return http({
        url: "/roles",
      }).then((res) => {
        this.tableData = res.data;
        console.log(res.data);
      });
    },

    //编辑
    handleEdit(index, row) {
      this.revise = true;
      (this.ruleForm.name_ = row.roleName),
        (this.ruleForm.desc_ = row.roleDesc),
        (this.info = row);
    },
    // 编辑提交
    sub() {
      http({
        url: `roles/${this.info.id}`,
        method: "put",
        data: {
          roleName: this.ruleForm.name_,
          roleDesc: this.ruleForm.desc_,
        },
      }).then((res) => {
        this.request();
        console.log(res);
      });
      this.revise = false;
    },
    //删除行列
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.info = row;
    },
    //确认删除
    del() {
      http({
        url: `roles/${this.info.id}`,
        method: "delete",
      }).then((res) => {
        this.request();
        console.log(res);
      });
      this.dialogVisible = false;
    },
    //分配权限
    setCheckedNodes(index, row) {
      this.permissions = true;

      this.info = row;
      this.getLeafIds(row, this.keys);

      this.defaultCheckedKeys = this.keys;
      console.log(this.tableData, this.keys);
    },
    getLeafIds(node, keys) {
      if (!node.children) {
        keys.push(node.id);
      } else {
        node.children.forEach((item) => this.getLeafIds(item, keys));
      }
    },
    //分配权限提交
    subb() {
      this.permissions = false;
      const arr1 = this.$refs.tree.getCheckedKeys();
      const arr2 = this.$refs.tree.getHalfCheckedKeys();
      const rids = [...arr1, ...arr2].join(",");
      console.log(rids);
      http({
        method: "post",
        url: `roles/${this.info.id}/rights`,
        data: {
          rids,
        },
      }).then((res) => {
        if (res) {
          console.log(res);
          this.request();
          this.$message.success("分配权限成功！");
        } else {
          this.$message.error("分配权限失败！");
        }
      });
    },
    //添加角色
    submit() {
      http({
        url: "roles",
        method: "post",
        data: {
          roleName: this.ruleForm.name,
          roleDesc: this.ruleForm.desc,
        },
      }).then((res) => {
        this.request();
        console.log(res);
      });
      this.dialogFormVisible = false;
    },
    // x号删除
    handleClose(rowID, id, item) {
      this.remove = true;
      console.log(rowID, id, item);
      (this.rowID = rowID), (this.id = id);
      this.item = item;
      
    },
    // X删除确认
    rem() {
      this.remove = false;

      http({
        url: `roles/${this.rowID.id}/rights/${this.id}`,
        method: "delete",
      }).then((res) => {
        if (res) {
          // this.request();
          this.rowID.children = res.data;
          console.log(res.data);
          this.$message.success("删除权限成功！");
        } else {
          this.$message.error("删除权限失败！");
        }
      });
    },
  },
  components: {},

};
</script>

<style scoped lang="scss">
.btn {
  display: flex;
  margin-bottom: 15px;
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
.centerRow,.centerRow1{
  display: flex;
  align-items: center;
}
.centerRow:nth-last-child(n+1){
   border-top: 1px solid #eeeeee;
}
.centerRow:last-child{
  border-bottom: 1px solid #eeeeee;

}

.centerRow1:nth-last-child(n+2){
   border-bottom: 1px solid #eeeeee;
}
.el-col>span{
  margin-right: 14px;
  margin-top: 8px;
  margin-bottom: 8px;

}
</style>
