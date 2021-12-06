<template>
  <div class="box">
    <el-alert
      type="warning"
      description="注意：只允许为第三级分类设置相关参数"
      show-icon
    >
    </el-alert>
    <!--  -->
    <el-form>
      <el-form-item label="选择商品分类" prop="name">
        <el-cascader
          :props="{
            value: 'cat_id',
            label: 'cat_name',
            children: 'children',
            id: 'cat_level',
          }"
          clearable
          v-model="value"
          :options="options"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <!--  -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="label" name="many">
        <el-button type="primary" @click="add()">添加参数</el-button>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="expand">
            <template>
              <el-tag
                v-for="tag in dynamicTags"
                :key="tag"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag }}
              </el-tag>

              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
                >+ New Tag</el-button
              >
            </template>
          </el-table-column>
          <el-table-column type="index" label="#"> </el-table-column>
          <el-table-column prop="attr_name" label="参数名称"> </el-table-column>
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
      </el-tab-pane>
      <el-tab-pane :label="label1" name="only">
        <el-button type="primary" @click="add()">添加属性</el-button>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <template v-if="props.row.attr_vals">
                <el-tag
                  v-for="tag in dynamicTags"
                  :key="tag"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >
                  {{ tag }}
                </el-tag>
              </template>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
                >+ New Tag</el-button
              >
            </template>
          </el-table-column>
          <el-table-column type="index" label="#"> </el-table-column>
          <el-table-column prop="attr_name" label="参数名称"> </el-table-column>
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
      </el-tab-pane>
    </el-tabs>

    <!-- 添加角色输入框 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑分类 -->
    <el-dialog
      :title="activeName == 'many' ? `${label}` : `${label1}`"
      :visible.sync="revise"
    >
      <el-form>
        <el-form-item
          :label="activeName == 'many' ? `${label}` : `${label1}`"
          class="flex"
        >
          <el-input v-model="name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="revise = false">取 消</el-button>
        <el-button type="primary" @click="sub()">确 定</el-button>
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
      label: "动态参数",
      label1: "静态属性",
      revise: false,
      dialogFormVisible: false,
      index: "",
      name: "",
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      activeName: "many",
      tableData: [],
      options: [],
      value: "",
      attr_id: "",
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 1, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      ruleForm: {
        name: "",
      },
    };
  },
  created() {
    http({
      url: "/categories",
    }).then((res) => {
      this.options = res.data;
      console.log(res.data);
    });
  },
  methods: {
    // 添加
    add() {
      this.ruleForm.name="",
      (this.dialogFormVisible = true);
    },
    // 确认添加
    submit() {
      this.dialogFormVisible = false;
      // 在这价格对象  
    //   this.tableData.push(this.tableData.attr_name = this.ruleForm.name);
    //  console.log(this.tableData)
      http({
        url:`categories/${this.index}/attributes`,
        method:'post',
        data:{
         attr_name:this.ruleForm.name,
         attr_sel:this.activeName,

        }
      }).then((res)=>{
        this.request()
        console.log(res);
      })
    },
    //
    handleChange(value) {
      console.log(this.activeName);
      this.value = "";
      this.index = value[value.length - 1];
      this.request();
    },
    request() {
      http({
        url: `categories/${this.index}/attributes`,
        params: {
          sel: this.activeName,
        },
      }).then((res) => {
        this.tableData = res.data;
        if (res.data) {
          res.data.forEach((item) => {
            this.dynamicTags = item.attr_vals.split(",");
          });
        }
      });
    },
    //
    handleClick() {
      this.request();
    },
    // 编辑
    handleEdit(index, row) {
      (this.name = row.attr_name), (this.attr_id = row.attr_id);
      (this.revise = true), console.log(index, row);
    },
    // 编辑确认
    sub() {
      http({
        url: `categories/${this.index}/attributes/${this.attr_id}`,
        method: "put",
        data: {
          attr_name: this.name,
          attr_sel: this.activeName,
        },
      }).then((res) => {
        console.log(res);
        this.request();
      });
      this.revise = false;
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row);
      this.attr_id = row.attr_id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          http({
            url: `categories/${this.index}/attributes/${this.attr_id}`,
            method: "delete",
          }).then((res) => {
            console.log(res, this.index, this.attr_id);
            this.request();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 关闭
    handleClose(tag) {
      console.log(tag);
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    // + New Tag
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    //
  },
  components: {},
};
</script>

<style scoped lang="scss">
.el-tag + .el-tag {
  margin: 5px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-form-item ::v-deep {
  margin-top: 25px;
  .el-form-item__content {
    display: flex;
  }
}
.box ::v-deep{
  overflow: hidden;
  padding-left: 15px;
  background-color: #fff;
  .el-alert{
    margin-top: 20px;
    margin-bottom: 15px;
  }
  .el-button--primary{
    margin-bottom: 15px;
  }
}
</style>
